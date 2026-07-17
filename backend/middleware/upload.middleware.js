// middleware/upload.middleware.js
//
// Maneja la subida de evidencia fotográfica de las entregas.
// Hoy: guarda los archivos en disco, en backend/uploads/evidencias, y se
// sirven de forma estática desde /uploads.
//
// A futuro (Supabase Storage): basta con reemplazar este middleware por una
// subida a un bucket de Supabase Storage (supabase.storage.from('evidencias')
// .upload(...)) y guardar la URL pública resultante en evidence_url. El resto
// del código (modelos, rutas) no necesita cambiar, porque solo esperan una URL.

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, "../uploads/evidencias");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${randomUUID()}${ext}`);
  }
});

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

function fileFilter(req, file, cb) {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Formato de imagen no permitido. Usa JPG, PNG o WEBP."));
  }
}

export const uploadEvidence = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});
