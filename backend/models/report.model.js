// models/report.model.js
import { supabase } from "../config/db.js";

export async function createReport({ userId, spotId, category, quantity, unit, points, evidenceUrl }) {
  const { data, error } = await supabase
    .from("reports")
    .insert({
      user_id: userId,
      spot_id: spotId || null,
      category,
      quantity,
      unit,
      points,
      evidence_url: evidenceUrl || null
    })
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function getReportsByUser(userId) {
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function getReportById(id) {
  const { data, error } = await supabase.from("reports").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateReport(id, patch) {
  if (Object.keys(patch).length === 0) return getReportById(id);
  const { data, error } = await supabase
    .from("reports")
    .update(patch)
    .eq("id", id)
    .select("*")
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteReport(id) {
  const { data, error } = await supabase.from("reports").delete().eq("id", id).select("id");
  if (error) throw new Error(error.message);
  return data.length > 0;
}

/** Lista todos los reportes con nombre/email del usuario (join). */
export async function getAllReports({ status } = {}) {
  let q = supabase
    .from("reports")
    .select("*, users(name, email)")
    .order("created_at", { ascending: false });
  if (status) q = q.eq("status", status);

  const { data, error } = await q;
  if (error) throw new Error(error.message);

  return data.map((r) => ({
    ...r,
    user_name: r.users?.name ?? null,
    user_email: r.users?.email ?? null,
    users: undefined
  }));
}

/** Total de puntos validados y pendientes de un usuario (calculado en JS). */
export async function getUserPointsSummary(userId) {
  const { data, error } = await supabase
    .from("reports")
    .select("points, quantity, unit, status")
    .eq("user_id", userId);
  if (error) throw new Error(error.message);

  let confirmed_points = 0, pending_points = 0, total_kg = 0;
  for (const r of data) {
    if (r.status === "validado") {
      confirmed_points += r.points || 0;
      if (r.unit === "Kg") total_kg += Number(r.quantity) || 0;
    } else if (r.status === "pendiente") {
      pending_points += r.points || 0;
    }
  }
  return { confirmed_points, pending_points, total_kg };
}

/** Ranking ecológico: usuarios ordenados por puntos validados (calculado en JS). */
export async function getRanking(limit = 20) {
  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("id, name, location")
    .eq("role", "user");
  if (usersError) throw new Error(usersError.message);

  const { data: reports, error: reportsError } = await supabase
    .from("reports")
    .select("user_id, points, status")
    .eq("status", "validado");
  if (reportsError) throw new Error(reportsError.message);

  const pointsByUser = {};
  for (const r of reports) {
    pointsByUser[r.user_id] = (pointsByUser[r.user_id] || 0) + (r.points || 0);
  }

  return users
    .map((u) => ({
      user_id: u.id,
      name: u.name,
      location: u.location,
      points: pointsByUser[u.id] || 0
    }))
    .sort((a, b) => b.points - a.points || a.name.localeCompare(b.name))
    .slice(0, limit);
}
