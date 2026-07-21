// server.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import spotRoutes from "./routes/spot.routes.js";
import guideRoutes from "./routes/guide.routes.js";
import reportRoutes from "./routes/report.routes.js";
import pointsRoutes from "./routes/points.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { notFoundHandler, errorHandler } from "./middleware/errorHandler.js";
import { checkConnection } from "./config/db.js";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Middlewares globales ----
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sirve las fotos de evidencia subidas (http://localhost:3000/uploads/evidencias/archivo.jpg)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---- Healthcheck ----
app.get("/api/health", async (req, res) => {
  res.json({ ok: true, servicio: "EcoRuta BAQ API", timestamp: new Date().toISOString() });
});

// ---- Rutas de la API ----
app.use("/api/auth", authRoutes);
app.use("/api/spots", spotRoutes);
app.use("/api/guide", guideRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/points", pointsRoutes);
app.use("/api/admin", adminRoutes);

// ---- 404 y manejo de errores ----
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`🌱 EcoRuta BAQ API corriendo en http://localhost:${PORT}`);
  try {
    const now = await checkConnection();
    console.log(`✅ Conectado a PostgreSQL (hora del servidor DB: ${now})`);
  } catch (error) {
    console.error("No se pudo conectar a PostgreSQL:", error.message);
    console.error("Revisa DATABASE_URL en tu archivo .env y que la base de datos esté corriendo.");
  }
});
