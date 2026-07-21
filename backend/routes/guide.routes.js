// routes/guide.routes.js
import { Router } from "express";
import { getAllGuideItems, getGuideItemByCategory } from "../models/guide.model.js";

const router = Router();

// La guía es pública y educativa: no requiere sesión.
router.get("/", async (req, res, next) => {
  try {
    const guide = await getAllGuideItems();
    res.json({ guide });
  } catch (error) {
    next(error);
  }
});

router.get("/:category", async (req, res, next) => {
  try {
    const item = await getGuideItemByCategory(req.params.category);
    if (!item) return res.status(404).json({ mensaje: "Categoría no encontrada en la guía." });
    res.json({ item });
  } catch (error) {
    next(error);
  }
});

export default router;
