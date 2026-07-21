// routes/points.routes.js
import { Router } from "express";
import { getUserPointsSummary, getRanking } from "../models/report.model.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// Mis puntos (requiere sesión).
router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const summary = await getUserPointsSummary(req.user.id);
    res.json({
      confirmedPoints: Number(summary.confirmed_points),
      pendingPoints: Number(summary.pending_points),
      totalKg: Number(summary.total_kg),
    });
  } catch (error) {
    next(error);
  }
});

// Ranking ecológico público (fomenta la competencia sana entre usuarios).
router.get("/ranking", async (req, res, next) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const ranking = await getRanking(limit);
    res.json({
      ranking: ranking.map((row, index) => ({
        position: index + 1,
        name: row.name,
        points: Number(row.points),
      })),
    });
  } catch (error) {
    next(error);
  }
});

export default router;
