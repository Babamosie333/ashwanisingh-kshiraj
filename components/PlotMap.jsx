"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site, waLink } from "@/lib/config";

// SAMPLE DATA: replace with Ashwani's real plots.
const seed = (n) => (((n * 9301 + 49297) % 233280) / 233280);
const SIZES = [1000, 1200, 1500, 1800];
function makePlots(city) {
  const k = city === "Kanpur" ? 3 : 7;
  return Array.from({ length: 24 }, (_, i) => {
    const v = seed(i + k);
    return {
      id: `${city[0]}${i + 1}`, row: Math.floor(i / 8), col: i % 8,
      status: v < 0.18 ? "sold" : v < 0.3 ? "booked" : "available",
      size: SIZES[Math.floor(seed(i + k + 40) * 4)],
    };
  });
}
const FILL = { available: "#f4f8ea", booked: "#e8c26a", sold: "#c6c9d6" };

export default function PlotMap({ onPick }) {
  const [city, setCity] = useState(site.cities[0]);
  const [sel, setSel] = useState(null);
  const [msg, setMsg] = useState(null);
  const plots = useMemo(() => makePlots(city), [city]);

  function choose(p) {
    if (p.status === "sold") { setSel(null); setMsg(`Plot ${p.id} is sold. Try another, or ask about similar plots.`); return; }
    setSel(p); setMsg(null); onPick?.(p, city);
  }
  const rowY = [10, 60, 134];

  return (
    <div id="plots" className="rounded-3xl bg-white p-4 text-ink shadow-2xl shadow-navy-deep/40">
      <div role="tablist" aria-label="Choose location" className="mb-3 flex gap-2">
        {site.cities.map((c) => (
          <button key={c} role="tab" aria-selected={c === city}
            onClick={() => { setCity(c); setSel(null); setMsg(null); }}
            className={`min-h-[44px] flex-1 rounded-xl border font-bold transition ${c === city ? "border-navy bg-navy text-white" : "border-line hover:bg-leaf-soft"}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-2xl bg-[#9bbd6a] p-2">
        <svg viewBox="0 0 360 230" className="block h-auto w-full" role="group" aria-label="Plot layout map">
          <rect width="360" height="230" fill="#9bbd6a" />
          <rect y="104" width="360" height="22" fill="#6d6f7c" />
          <path d="M0 115H360" stroke="#fff" strokeDasharray="8 6" strokeWidth="2" />
          {plots.map((p) => {
            const x = 8 + p.col * 43.5, y = rowY[p.row], on = sel?.id === p.id;
            return (
              <g key={city + p.id}>
                <motion.rect x={x} y={y} width="39" height="42" rx="4"
                  initial={{ opacity: 0 }} animate={{ opacity: 1, fill: on ? "#14214f" : FILL[p.status] }}
                  transition={{ delay: p.col * 0.03 + p.row * 0.05 }}
                  whileHover={p.status === "available" ? { fill: "#fff3c9" } : undefined}
                  tabIndex={p.status === "sold" ? -1 : 0} role="button" style={{ cursor: p.status === "sold" ? "not-allowed" : "pointer" }}
                  aria-label={`Plot ${p.id}, ${p.size} square feet, ${p.status}`}
                  onClick={() => choose(p)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(p); } }} />
                <text x={x + 19.5} y={y + 25} textAnchor="middle" fontSize="11" fontWeight="700"
                  fill={on ? "#fff" : "#1b2340"} pointerEvents="none">{p.id}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <ul className="my-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-mute">
        {[["Available", "#f4f8ea"], ["Booked", "#e8c26a"], ["Sold", "#c6c9d6"], ["Your pick", "#14214f"]].map(([t, c]) => (
          <li key={t}><i className="mr-1.5 inline-block h-3 w-3 rounded-[3px] border border-line align-[-1px]" style={{ background: c }} />{t}</li>
        ))}
      </ul>
      <div className="min-h-[96px] rounded-xl bg-leaf-soft p-4" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={sel?.id || msg || "idle"} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {sel ? (
              <>
                <b className="font-serif text-lg font-extrabold">Plot {sel.id} · {sel.size} sq ft</b>
                <p className="mb-3 mt-1 text-[15px] text-mute">{city} · {sel.status === "booked" ? "Booked. It may free up, so ask." : "Available"}</p>
                <a className="btn btn-wa" target="_blank" rel="noopener" href={waLink(`Hello Ashwani, I am interested in plot ${sel.id} (${sel.size} sq ft) in ${city}.`)}>Ask about plot {sel.id}</a>
              </>
            ) : (
              <>
                <b className="font-serif text-lg font-extrabold">{msg ? "Pick another plot" : "Tap a plot"}</b>
                <p className="mt-1 text-[15px] text-mute">{msg || "See its size and ask about it in one tap."}</p>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-2 text-xs text-mute">Sample layout for demonstration. Ask Ashwani for current plots and prices.</p>
    </div>
  );
}
