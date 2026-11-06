import { unstable_noStore as noStore } from "next/cache";
import { supabase } from "./supabase";
import { SEED } from "./seed";

// Only when Supabase is not configured at all (local preview) the starter sites are shown.
const demo = SEED.map((s) => ({ ...s, id: s.slug }));

export async function getSites() {
  noStore();
  if (!supabase) return demo;
  const { data, error } = await supabase.from("sites").select("*").eq("published", true).order("sort").order("created_at");
  if (error) { console.error("getSites failed:", error.message); return []; } // never show stale starter prices to customers
  return data;
}
export async function getSite(slug) {
  noStore();
  if (!supabase) return demo.find((s) => s.slug === slug) || null;
  const { data, error } = await supabase.from("sites").select("*").eq("slug", slug).eq("published", true).maybeSingle();
  if (error) console.error("getSite failed:", error.message);
  return data || null;
}