// models/user.model.js
//
// Adaptado a las columnas reales de la tabla `users` en Supabase:
// id_user, id_role, first_names, last_names, email, password, points, created_at.
//
// Asunción: id_role usa 1 = user, 2 = admin. Ajusta ROLE_MAP si tu tabla
// de roles usa otros valores.
import { supabase } from "../config/db.js";

const ROLE_MAP = { 1: "user", 2: "admin" };
const ROLE_MAP_INVERSE = { user: 1, admin: 2 };

const PUBLIC_FIELDS = "id_user, first_names, last_names, email, id_role, points, created_at";

function toPublicUser(row) {
  if (!row) return row;
  const { password, id_role, ...rest } = row;
  return { ...rest, role: ROLE_MAP[id_role] || "user" };
}

export async function createUser({ name, email, passwordHash }) {
  const [firstNames, ...lastParts] = name.trim().split(" ");
  const lastNames = lastParts.join(" ") || firstNames;

  const { data, error } = await supabase
    .from("users")
    .insert({
      first_names: firstNames,
      last_names: lastNames,
      email,
      password: passwordHash,
      id_role: ROLE_MAP_INVERSE.user
    })
    .select(PUBLIC_FIELDS)
    .single();

  if (error) throw new Error(error.message);
  return toPublicUser(data);
}

export async function findUserByEmail(email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data; // incluye password para comparar en login
}

export async function findUserById(id) {
  const { data, error } = await supabase
    .from("users")
    .select(PUBLIC_FIELDS)
    .eq("id_user", id)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return toPublicUser(data);
}
