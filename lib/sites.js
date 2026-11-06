import { supabase } from "./supabase";
import { SEED } from "./seed";
// Without Supabase configured the site shows the starter sites, so you can preview it right away.
const demo = SEED.map((s) => ({ ...s, id: s.slug }));

export async function getSites() {
  if (!supabase) return demo;
  const { data, error } = await supabase.from("sites").select("*").eq("published", true).order("sort").order("created_at");
  return error ? demo : data;
}
export async function getSite(slug) {
  if (!supabase) return demo.find((s) => s.slug === slug) || null;
  const { data } = await supabase.from("sites").select("*").eq("slug", slug).eq("published", true).maybeSingle();
  return data || null;
}
