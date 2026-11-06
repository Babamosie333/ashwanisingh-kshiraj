// Temporary test page: shows what the website pages really receive. Safe to delete afterwards.
import { getSites } from "@/lib/sites";
import { hasSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!hasSupabase) return Response.json({ ok: false, problem: "Supabase variables are missing on the server" });
  const sites = await getSites();
  return Response.json({ ok: true, count: sites.length, firstSite: sites[0]?.name_en ?? null, sitesWithPhotos: sites.filter((s) => s.images?.length).length });
}