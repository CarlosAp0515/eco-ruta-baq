// middleware/auth.middleware.js
import { verifyToken } from "../utils/jwt.js";

/**
 * Exige un token JWT válido en el header Authorization: Bearer <token>.
 * Adjunta { id, email, role } a req.user.
 */
export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ mensaje: "No autorizado. Inicia sesión para continuar." });
  }

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: "Sesión inválida o expirada. Vuelve a iniciar sesión." });
  }
}
