// routes/report.routes.js
import { Router } from "express";
import {
  createReport,
  getReportsByUser,
  getReportById,
  updateReport,
  deleteReport,
  getAllReports
} from "../models/report.model.js";
import { getGuideItemByCategory } from "../models/guide.model.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";
import { uploadEvidence } from "../middleware/upload.middleware.js";

const router = Router();

// Todas las rutas de reportes requieren sesión iniciada.
router.use(requireAuth);

// ---- Crear una entrega (con evidencia fotográfica opcional) ----
router.post("/", uploadEvidence.single("evidence"), async (req, res, next) => {
  try {
    const { category, quantity, unit, spotId } = req.body;

    if (!category || !quantity || !unit) {
      return res.status(400).json({ mensaje: "category, quantity y unit son obligatorios." });
    }

    const guideItem = await getGuideItemByCategory(category);
    if (!guideItem) {
      return res.status(400).json({ mensaje: "Categoría de material no reconocida." });
    }

    // Los puntos SIEMPRE se calculan en el servidor (nunca se confía en el cliente).
    const points = Math.round(parseFloat(quantity) * guideItem.points_per_unit);
    const evidenceUrl = req.file ? `/uploads/evidencias/${req.file.filename}` : null;

    const report = await createReport({
      userId: req.user.id,
      spotId: spotId || null,
      category,
      quantity: parseFloat(quantity),
      unit,
      points,
      evidenceUrl
    });

    res.status(201).json({
      mensaje: "Entrega registrada. Queda pendiente de validación por un administrador.",
      report
    });
  } catch (error) {
    next(error);
  }
});

// ---- Mis entregas ----
router.get("/me", async (req, res, next) => {
  try {
    const reports = await getReportsByUser(req.user.id);
    res.json({ reports });
  } catch (error) {
    next(error);
  }
});

// ---- Todas las entregas (solo administradores) ----
router.get("/", requireAdmin, async (req, res, next) => {
  try {
    const { status } = req.query;
    const reports = await getAllReports({ status });
    res.json({ reports });
  } catch (error) {
    next(error);
  }
});

// ---- Ver una entrega puntual (dueño o administrador) ----
router.get("/:id", async (req, res, next) => {
  try {
    const report = await getReportById(req.params.id);
    if (!report) return res.status(404).json({ mensaje: "Entrega no encontrada." });
    if (report.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ mensaje: "No tienes acceso a esta entrega." });
    }
    res.json({ report });
  } catch (error) {
    next(error);
  }
});

// ---- Editar una entrega propia (solo si sigue pendiente) ----
router.put("/:id", uploadEvidence.single("evidence"), async (req, res, next) => {
  try {
    const report = await getReportById(req.params.id);
    if (!report) return res.status(404).json({ mensaje: "Entrega no encontrada." });
    if (report.user_id !== req.user.id) {
      return res.status(403).json({ mensaje: "No puedes editar entregas de otro usuario." });
    }
    if (report.status !== "pendiente") {
      return res.status(409).json({ mensaje: "Solo puedes editar entregas que aún están pendientes de validación." });
    }

    const { category, quantity, unit } = req.body;
    const patch = {};

    if (category) patch.category = category;
    if (unit) patch.unit = unit;

    if (category || quantity) {
      const finalCategory = category || report.category;
      const finalQuantity = quantity ? parseFloat(quantity) : parseFloat(report.quantity);
      const guideItem = await getGuideItemByCategory(finalCategory);
      if (!guideItem) return res.status(400).json({ mensaje: "Categoría de material no reconocida." });

      patch.category = finalCategory;
      patch.quantity = finalQuantity;
      patch.points = Math.round(finalQuantity * guideItem.points_per_unit);
    }

    if (req.file) {
      patch.evidence_url = `/uploads/evidencias/${req.file.filename}`;
    }

    const updated = await updateReport(req.params.id, patch);
    res.json({ mensaje: "Entrega actualizada.", report: updated });
  } catch (error) {
    next(error);
  }
});

// ---- Borrar una entrega propia (solo si sigue pendiente) ----
router.delete("/:id", async (req, res, next) => {
  try {
    const report = await getReportById(req.params.id);
    if (!report) return res.status(404).json({ mensaje: "Entrega no encontrada." });
    if (report.user_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ mensaje: "No puedes borrar entregas de otro usuario." });
    }
    if (report.status !== "pendiente" && req.user.role !== "admin") {
      return res.status(409).json({ mensaje: "Solo puedes borrar entregas que aún están pendientes." });
    }

    await deleteReport(req.params.id);
    res.json({ mensaje: "Entrega eliminada." });
  } catch (error) {
    next(error);
  }
});

// ---- Validar / rechazar una entrega (solo administradores) ----
router.put("/:id/validate", requireAdmin, async (req, res, next) => {
  try {
    const { status, rejectionReason } = req.body; // status: 'validado' | 'rechazado'

    if (!["validado", "rechazado"].includes(status)) {
      return res.status(400).json({ mensaje: "status debe ser 'validado' o 'rechazado'." });
    }

    const report = await getReportById(req.params.id);
    if (!report) return res.status(404).json({ mensaje: "Entrega no encontrada." });

    const updated = await updateReport(req.params.id, {
      status,
      rejection_reason: status === "rechazado" ? rejectionReason || "No especificado" : null,
      validated_by: req.user.id,
      validated_at: new Date().toISOString()
    });

    res.json({ mensaje: `Entrega marcada como ${status}.`, report: updated });
  } catch (error) {
    next(error);
  }
});

export default router;
