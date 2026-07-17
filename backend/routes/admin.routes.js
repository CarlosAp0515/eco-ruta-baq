// routes/admin.routes.js
//
// Endpoints de apoyo para el dashboard administrativo.
import { Router } from "express";
import { supabase } from "../config/db.js";
import { getAllReports } from "../models/report.model.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";

const router = Router();

router.use(requireAuth, requireAdmin);

// Resumen general para las tarjetas del dashboard administrativo.
router.get("/stats", async (req, res, next) => {
  try {
    const [
      { count: totalUsers, error: usersError },
      { data: reports, error: reportsError }
    ] = await Promise.all([
      supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("id_role", 1), // 1 = user según ROLE_MAP en user.model.js
      supabase.from("reports").select("status, points")
    ]);

    if (usersError) throw new Error(usersError.message);
    if (reportsError) throw new Error(reportsError.message);

    const pendingReports = reports.filter(r => r.status === "pendiente").length;
    const validatedReports = reports.filter(r => r.status === "validado").length;
    const rejectedReports = reports.filter(r => r.status === "rechazado").length;
    const totalPointsAwarded = reports
      .filter(r => r.status === "validado")
      .reduce((sum, r) => sum + (r.points || 0), 0);

    res.json({
      totalUsers: totalUsers ?? 0,
      pendingReports,
      validatedReports,
      rejectedReports,
      totalPointsAwarded
    });
  } catch (error) {
    next(error);
  }
});

// Entregas pendientes de revisión (atajo sobre GET /api/reports?status=pendiente).
router.get("/pending-reports", async (req, res, next) => {
  try {
    const reports = await getAllReports({ status: "pendiente" });
    res.json({ reports });
  } catch (error) {
    next(error);
  }
});

export default router;
