import { createClient } from "@supabase/supabase-js";
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const hasSupabase = Boolean(url && key);

// Always ask Supabase for fresh data. Without this, Next.js can keep an old query result
// in its data cache (even across redeploys), so new sites and photos would not appear.
const noStoreFetch = (input, init) => fetch(input, { ...init, cache: "no-store" });
export const supabase = hasSupabase ? createClient(url, key, { global: { fetch: noStoreFetch } }) : null;