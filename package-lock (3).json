// config/db.js
//
// Conexión a Supabase usando el SDK oficial (@supabase/supabase-js).
// Usa la SECRET KEY (no la publishable/anon) porque el backend necesita
// permisos completos para leer/escribir sin restricciones de RLS.
//
// Variables necesarias en .env:
//   SUPABASE_URL=https://TU_PROYECTO.supabase.co
//   SUPABASE_SECRET_KEY=sb_secret_xxxxxxxx

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SECRET_KEY = process.env.SUPABASE_SECRET_KEY;

if (!SUPABASE_URL || !SUPABASE_SECRET_KEY) {
  console.warn(
    "⚠️  Faltan SUPABASE_URL o SUPABASE_SECRET_KEY en tu .env. Configúralos antes de iniciar el servidor."
  );
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET_KEY, {
  auth: { persistSession: false }
});

/**
 * Verifica la conexión a Supabase. Se llama una vez al arrancar el servidor.
 */
export async function checkConnection() {
  const { error } = await supabase.from("users").select("id_user").limit(1);
  if (error) throw new Error(error.message);
  return new Date().toISOString();
}
