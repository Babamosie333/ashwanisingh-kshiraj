"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import AdminGate from "@/components/AdminGate";
import { supabase } from "@/lib/supabase";
import { SEED } from "@/lib/seed";
import { STATUS, rateText } from "@/lib/format";

function List() {
  const [rows, setRows] = useState(null);
  const [msg, setMsg] = useState("");
  async function load() {
    const { data, error } = await supabase.from("sites").select("id,slug,name_en,name_hi,city,status,published,rates,images").order("sort").order("created_at");
    if (error) setMsg(error.message + " (Did you run supabase/schema.sql?)"); else setRows(data);
  }
  useEffect(() => { load(); }, []);
  async function loadStarter() {
    const { error } = await supabase.from("sites").insert(SEED);
    setMsg(error ? error.message : ""); load();
  }
  return (
    <main className="wrap py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl font-extrabold text-navy">Your sites</h1>
        <Link href="/admin/new" className="btn btn-wa">+ Add new site</Link>
      </div>
      {msg && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">{msg}</p>}
      {rows === null ? <p className="mt-8 text-mute">Loading…</p> : rows.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-line bg-white p-8 text-center">
          <p className="text-mute">No sites yet. Load the 8 sites from your rate-list poster, then add photos and details.</p>
          <button onClick={loadStarter} className="btn btn-gold mt-4">Load the 8 starter sites</button>
        </div>
      ) : (
        <ul className="mt-6 grid gap-3">
          {rows.map((r) => (
            <li key={r.id}>
              <Link href={`/admin/${r.id}`} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 transition hover:shadow-md">
                <div className="h-16 w-20 flex-none overflow-hidden rounded-lg bg-leaf-soft">{r.images?.[0] && <img src={r.images[0]} alt="" className="h-full w-full object-cover" />}</div>
                <div className="min-w-0 flex-1">
                  <b className="block truncate font-serif text-lg text-navy">{r.name_en}</b>
                  <span className="text-sm text-mute">{r.city} · {rateText(r.rates) || "no rate"} · {(r.images || []).length} photos</span>
                </div>
                <div className="flex flex-col items-end gap-1 text-xs font-bold">
                  <span className={`rounded-full px-2.5 py-1 ${STATUS[r.status]?.[1]}`}>{STATUS[r.status]?.[0]}</span>
                  {!r.published && <span className="rounded-full bg-line px-2.5 py-1 text-mute">Hidden</span>}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
export default function AdminHome() { return <AdminGate><List /></AdminGate>; }
