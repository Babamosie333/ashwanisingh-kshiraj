// Temporary test page: shows what the website (server) gets from Supabase. Safe to delete afterwards.
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return Response.json({ ok: false, problem: "Supabase variables are missing on the server", hasUrl: !!url, hasKey: !!key });
  }
  const { data, error, status } = await createClient(url, key).from("sites").select("name_en").eq("published", true);
  return Response.json({ ok: !error, status, count: data ? data.length : null, error: error ? error.message : null, projectHost: new URL(url).host });
}