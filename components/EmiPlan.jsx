"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/config";
import { inr } from "@/lib/format";
import { WaButton } from "@/components/Whatsapp";

// Longest EMI plan (in years) offered per site. Every other site gets 5 years.
const MAX_YEARS = { "kshiraj-ganga-pride": 4 };
const SIZES = [50, 100, 150, 200];
const chip = (on) => `min-h-[44px] rounded-full border px-4 text-sm font-bold transition ${on ? "border-navy bg-navy text-white" : "border-line bg-white hover:bg-leaf-soft"}`;
const cell = "text-[15px] md:table-cell md:px-4 md:py-3.5 before:mb-0.5 before:block before:text-xs before:font-bold before:uppercase before:tracking-wide before:text-mute before:content-[attr(data-label)] md:before:hidden";

export default function EmiPlan({ s }) {
  const rates = [...(s.rates || [])].sort((a, b) => a - b);
  const maxY = MAX_YEARS[s.slug] || 5;
  const [rate, setRate] = useState(rates[0]);
  const [size, setSize] = useState("100");
  const [years, setYears] = useState(Math.min(3, maxY));
  const [origin, setOrigin] = useState("");
  useEffect(() => setOrigin(window.location.origin), []);
  if (!rates.length) return null;

  // Example maths: down payment 25%, balance 75% split equally, no interest.
  // Plot size always snaps to the nearest 50 sq yard (50, 100, 150, 200, 250 ...).
  const raw = Number(size);
  const n = raw > 0 ? Math.min(10000, Math.max(50, Math.round(raw / 50) * 50)) : 0;
  const total = rate * n, down = Math.round(total * 0.25), balance = total - down;
  const plans = Array.from({ length: maxY }, (_, i) => {
    const y = i + 1, m = y * 12;
    return { y, m, emi: Math.round(balance / m), poss: m / 3 }; // 50% is reached after one third of the EMIs
  });
  const sel = plans.find((p) => p.y === years) || plans[0];
  const text = [
    "Hello Ashwani 🙏",
    `I am interested in *${s.name_en}*${s.location ? `, ${s.location}` : ""}.`,
    n ? `Plot size: ${n} sq yard at ${inr(rate)} per sq yard.` : "",
    n ? `I like the ${sel.y}-year EMI plan (example: down payment ${inr(down)}, EMI ${inr(sel.emi)} x ${sel.m} months).` : "",
    "Please share the actual down payment and current offer.",
    origin ? `${origin}/sites/${s.slug}` : "",
  ].filter(Boolean).join("\n");

  const stages = [
    ["At 25% paid", "Plot number allotted", "Pay the down payment and your plot number is allotted.", "bg-leaf text-white"],
    ["At 50% paid", "Possession of the land", `Reached after EMI no. ${sel.poss} of the ${sel.y}-year plan.`, "bg-gold text-[#1b1405]"],
    ["At 100% paid", "Balance fully paid", "All instalments are complete.", "bg-navy text-white"],
  ];

  return (
    <section className="mt-10" aria-labelledby="emi-h">
      <h2 id="emi-h" className="font-serif text-2xl font-extrabold text-navy">Down payment and EMI plans</h2><div className="rule" />
      <p className="mt-4 text-mute">Pick a rate and plot size to see an example, then tap a plan to ask about it.</p>

      <div className="mt-5 grid gap-4 rounded-2xl border border-line bg-white p-4 sm:p-5">
        {rates.length > 1 && (
          <div><b className="text-sm text-mute">Rate per sq yard</b>
            <div className="mt-2 flex flex-wrap gap-2">{rates.map((r) => <button key={r} type="button" className={chip(r === rate)} aria-pressed={r === rate} onClick={() => setRate(r)}>{inr(r)}</button>)}</div></div>
        )}
        <div><b className="text-sm text-mute">Plot size (sq yard)</b>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {SIZES.map((z) => <button key={z} type="button" className={chip(n === z)} aria-pressed={n === z} onClick={() => setSize(String(z))}>{z}</button>)}
            <input type="number" inputMode="numeric" min="50" max="10000" step="50" value={size} onChange={(e) => setSize(e.target.value)} onBlur={() => n > 0 && setSize(String(n))} aria-label="Custom plot size in square yards" className="input !min-h-[44px] !w-28" />
          </div>
          <p className="mt-2 text-xs text-mute">Plot sizes go in steps of 50 sq yard. Any other number is rounded to the nearest 50.</p></div>
      </div>

      {n > 0 ? (
        <>
          <div className="mt-4 grid grid-cols-3 gap-2.5 text-center sm:gap-3">
            {[["Total (example)", total, "bg-white text-navy"], ["Down payment · 25%", down, "bg-navy text-gold"], ["Balance · 75%", balance, "bg-white text-navy"]].map(([l, v, c]) => (
              <div key={l} className={`rounded-2xl border border-line p-3 sm:p-4 ${c}`}>
                <span className={`block text-[11px] font-bold uppercase tracking-wide sm:text-xs ${c.includes("navy text-gold") ? "text-white/80" : "text-mute"}`}>{l}</span>
                <motion.b key={`${l}-${v}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-1 block font-serif text-base font-extrabold sm:text-2xl">{inr(v)}</motion.b>
              </div>
            ))}
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-white">
            <table className="block w-full text-left md:table">
              <caption className="sr-only">Example EMI plans for {s.name_en}</caption>
              <thead className="hidden bg-navy text-white md:table-header-group"><tr>
                {["EMI plan", "Down payment (25%)", "Monthly EMI", "Months", "Plot number", "Possession"].map((h) => <th key={h} scope="col" className="px-4 py-3 text-sm font-bold">{h}</th>)}
              </tr></thead>
              <tbody className="block md:table-row-group">
                {plans.map((p) => {
                  const on = p.y === sel.y;
                  return (
                    <tr key={p.y} onClick={() => setYears(p.y)} className={`grid cursor-pointer grid-cols-2 gap-x-4 gap-y-3 border-b border-line p-4 transition last:border-0 md:table-row md:border-b md:p-0 ${on ? "bg-leaf-soft" : "hover:bg-paper"}`}>
                      <td className={`${cell} col-span-2 md:col-span-1`}>
                        <label className="flex cursor-pointer items-center gap-2.5 font-bold text-navy">
                          <input type="radio" name="emi-plan" checked={on} onChange={() => setYears(p.y)} className="h-5 w-5 accent-[#5b8a2e]" />
                          {p.y} {p.y === 1 ? "year" : "years"}
                        </label>
                      </td>
                      <td data-label="Down payment (25%)" className={cell}>{inr(down)}</td>
                      <td data-label="Monthly EMI" className={`${cell} font-extrabold text-leaf`}>{inr(p.emi)}</td>
                      <td data-label="Months" className={cell}>{p.m} months</td>
                      <td data-label="Plot number" className={cell}>Allotted at 25%</td>
                      <td data-label="Possession" className={cell}>At 50%, after EMI {p.poss}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-800">Enter a plot size of 50 sq yard or more.</p>}

      <ol className="mt-6 grid gap-3 sm:grid-cols-3">
        {stages.map(([a, b, c, cls], i) => (
          <motion.li key={a} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} className="rounded-2xl border border-line bg-white p-4">
            <span className={`inline-block rounded-full px-3 py-1 text-xs font-extrabold ${cls}`}>{a}</span>
            <b className="mt-2 block font-serif text-lg text-navy">{b}</b>
            <p className="mt-1 text-sm text-mute">{c}</p>
          </motion.li>
        ))}
      </ol>

      <div role="note" className="mt-6 rounded-2xl border-2 border-gold bg-[#fff8e6] p-5">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-gold text-xl font-extrabold text-[#1b1405]" aria-hidden>!</span>
          <div>
            <b className="font-serif text-lg text-navy">Important: this is only an example</b>
            <p className="mt-1 text-[15px]">The 25% down payment shown here is for illustration only. <b>The actual down payment is lower than this.</b> Please contact us for the exact amount, EMI and current offer for {s.name_en}.</p>
            <p className="mt-2 text-xs text-mute">Example uses {n || "—"} sq yard at {inr(rate)} per sq yard, with no interest. EMI amounts are rounded.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <WaButton className="btn btn-wa" text={text}>Ask about the {sel.y}-year plan</WaButton>
              <a className="btn btn-call text-navy" href={`tel:+91${site.phone}`}>Call {site.phone}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}