// middleware/errorHandler.js

export function notFoundHandler(req, res) {
  res.status(404).json({ mensaje: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  console.error("❌", err.message);

  if (err.name === "MulterError" || err.message?.includes("Formato de imagen")) {
    return res.status(400).json({ mensaje: err.message });
  }

  res.status(err.status || 500).json({
    mensaje: err.publicMessage || "Ocurrió un error inesperado en el servidor."
  });
}
