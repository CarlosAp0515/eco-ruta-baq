// routes/auth.routes.js
import { Router } from "express";
import bcrypt from "bcryptjs";
import { createUser, findUserByEmail, findUserById } from "../models/user.model.js";
import { signToken } from "../utils/jwt.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const ROLE_MAP = { 1: "user", 2: "admin" };

const router = Router();

router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ mensaje: "Nombre, correo y contraseña son obligatorios." });
    }

    if (password.length < 8) {
      return res.status(400).json({ mensaje: "La contraseña debe tener mínimo 8 caracteres." });
    }

    const existing = await findUserByEmail(email.toLowerCase().trim());
    if (existing) {
      return res.status(409).json({ mensaje: "Este correo ya está registrado." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash
    });

    const token = signToken({ id: user.id_user, email: user.email, role: user.role });

    res.status(201).json({
      mensaje: "Usuario registrado correctamente.",
      token,
      user
    });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ mensaje: "Correo y contraseña son obligatorios." });
    }

    const user = await findUserByEmail(email.toLowerCase().trim());
    if (!user) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ mensaje: "Credenciales incorrectas." });
    }

    const role = ROLE_MAP[user.id_role] || "user";
    const token = signToken({ id: user.id_user, email: user.email, role });

    res.json({
      mensaje: "Inicio de sesión exitoso.",
      token,
      user: {
        id_user: user.id_user,
        first_names: user.first_names,
        last_names: user.last_names,
        email: user.email,
        points: user.points,
        role
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get("/me", requireAuth, async (req, res, next) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) return res.status(404).json({ mensaje: "Usuario no encontrado." });
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

export default router;
