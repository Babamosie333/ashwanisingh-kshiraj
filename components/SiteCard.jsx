"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { rateText, STATUS } from "@/lib/format";

export default function SiteCard({ s, i = 0 }) {
  const [label, cls] = STATUS[s.status] || STATUS.available;
  const img = s.images?.[0];
  return (
    <motion.article initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: (i % 3) * 0.08 }}
      className="group overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/sites/${s.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-leaf-soft">
          {img ? <img src={img} alt={s.name_en} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            : <div className="grid h-full place-items-center bg-gradient-to-br from-leaf-soft to-[#cfe0b4] text-6xl text-leaf/50" aria-hidden>⌂</div>}
          <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${cls}`}>{label}</span>
          <span className="absolute right-3 top-3 rounded-full bg-navy/90 px-3 py-1 text-xs font-semibold text-white">{s.city}</span>
        </div>
        <div className="p-5">
          <h3 className="font-serif text-xl font-semibold leading-snug text-navy">{s.name_en}</h3>
          {s.name_hi && <p className="text-[15px] text-mute">{s.name_hi}</p>}
          {s.location && <p className="mt-2 text-sm text-mute">📍 {s.location}</p>}
          <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-4">
            <div><span className="block text-xs uppercase tracking-wide text-mute">Rate per sq yard</span><b className="font-serif text-lg text-leaf">{rateText(s.rates) || "Call for rate"}</b></div>
            <span className="text-sm font-bold text-gold">View →</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
