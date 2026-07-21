// models/spot.model.js
import { supabase } from "../config/db.js";

export async function getAllSpots() {
  const { data, error } = await supabase.from("spots").select("*").order("locality", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
}

export async function getSpotById(id) {
  const { data, error } = await supabase.from("spots").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function createSpot({ locality, name, address, lat, lng, materials, description }) {
  const { data, error } = await supabase
    .from("spots")
    .insert({
      locality,
      name,
      address: address || null,
      lat,
      lng,
      materials: materials || [],
      description: description || null
    })
    .select("*")
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateSpot(id, patch) {
  if (Object.keys(patch).length === 0) return getSpotById(id);
  const { data, error } = await supabase
    .from("spots")
    .update(patch)
    .eq("id", id)
    .select("*")
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteSpot(id) {
  const { data, error } = await supabase.from("spots").delete().eq("id", id).select("id");
  if (error) throw new Error(error.message);
  return data.length > 0;
}
