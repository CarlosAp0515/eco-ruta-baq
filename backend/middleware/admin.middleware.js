// middleware/admin.middleware.js

/** Debe usarse siempre después de requireAuth. */
export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ mensaje: "Acceso restringido a administradores." });
  }
  next();
}
