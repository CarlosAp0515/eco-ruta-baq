// models/guide.model.js
import { supabase } from "../config/db.js";

export async function getAllGuideItems() {
  const { data, error } = await supabase.from("guide_items").select("*").order("category", { ascending: true });
  if (error) throw new Error(error.message);
  return data;
}

export async function getGuideItemByCategory(category) {
  const { data, error } = await supabase
    .from("guide_items")
    .select("*")
    .eq("category", category)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function getGuideItemById(id) {
  const { data, error } = await supabase.from("guide_items").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}
