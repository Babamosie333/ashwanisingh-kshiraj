"use client";
import { useState } from "react";
import SiteCard from "./SiteCard";

const chip = (on) => `min-h-[44px] rounded-full border px-5 text-sm font-bold transition ${on ? "border-navy bg-navy text-white" : "border-line bg-white text-ink hover:bg-leaf-soft"}`;
export default function SitesBrowser({ sites }) {
  const [city, setCity] = useState("All");
  const [st, setSt] = useState("all");
  const list = sites.filter((s) => (city === "All" || s.city === city) && (st === "all" || s.status === st));
  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filters">
        {["All", "Kanpur", "Unnao"].map((c) => <button key={c} className={chip(city === c)} onClick={() => setCity(c)} aria-pressed={city === c}>{c}</button>)}
        <span className="mx-1 hidden w-px bg-line sm:block" />
        {[["all", "Any status"], ["available", "Available"], ["selling_fast", "Selling fast"]].map(([k, l]) => <button key={k} className={chip(st === k)} onClick={() => setSt(k)} aria-pressed={st === k}>{l}</button>)}
      </div>
      {list.length ? (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((s, i) => <SiteCard key={s.id} s={s} i={i} />)}</div>
      ) : <p className="mt-10 rounded-2xl bg-white p-8 text-center text-mute">No sites match these filters. Try another city or status.</p>}
    </>
  );
}
