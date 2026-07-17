// routes/spot.routes.js
import { Router } from "express";
import { getAllSpots, getSpotById, createSpot, updateSpot, deleteSpot } from "../models/spot.model.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";

const router = Router();

// Público: cualquiera puede consultar los puntos de reciclaje.
router.get("/", async (req, res, next) => {
  try {
    const spots = await getAllSpots();
    res.json({ spots });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const spot = await getSpotById(req.params.id);
    if (!spot) return res.status(404).json({ mensaje: "Punto de acopio no encontrado." });
    res.json({ spot });
  } catch (error) {
    next(error);
  }
});

// Solo administradores gestionan el listado de puntos.
router.post("/", requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const { locality, name, address, lat, lng, materials, description } = req.body;
    if (!locality || !name || lat == null || lng == null) {
      return res.status(400).json({ mensaje: "locality, name, lat y lng son obligatorios." });
    }
    const spot = await createSpot({ locality, name, address, lat, lng, materials, description });
    res.status(201).json({ mensaje: "Punto de acopio creado.", spot });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const spot = await updateSpot(req.params.id, req.body);
    if (!spot) return res.status(404).json({ mensaje: "Punto de acopio no encontrado." });
    res.json({ mensaje: "Punto de acopio actualizado.", spot });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", requireAuth, requireAdmin, async (req, res, next) => {
  try {
    const deleted = await deleteSpot(req.params.id);
    if (!deleted) return res.status(404).json({ mensaje: "Punto de acopio no encontrado." });
    res.json({ mensaje: "Punto de acopio eliminado." });
  } catch (error) {
    next(error);
  }
});

export default router;
