"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/config";
import { inr } from "@/lib/format";
import { WaButton } from "@/components/Whatsapp";

const up = { hidden: { opacity: 0, y: 24 }, show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }) };
const M = (p) => <motion.div variants={up} initial="hidden" animate="show" {...p} />;

export default function Hero({ sites }) {
  return (
    <div className="relative overflow-hidden pb-24 pt-14 text-white">
      {/* Background photo (replace public/hero.jpg to change it) with a navy tint so text stays readable */}
      <img src="/hero.jpg" alt="" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep/95 via-navy/80 to-navy/45" />

      <div className="wrap relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <M custom={0}><p className="mb-3 text-sm font-bold uppercase tracking-[.2em] text-gold">Kanpur · Unnao</p></M>
          <motion.h1 variants={up} initial="hidden" animate="show" custom={1} className="font-serif text-[clamp(40px,7vw,68px)] font-extrabold leading-[1.08]">
            Your Land.<span className="block font-semibold italic text-[#b9d98a]">Your Future.</span>
          </motion.h1>
          <M custom={2}><p className="my-5 max-w-[46ch] text-[#e1e5f4]">Verified residential plots with clear paperwork and a person you can call. Choose a site, see its photos and rate, and ask us anything.</p></M>
          <M custom={3}><div className="flex flex-wrap gap-3">
            <Link className="btn btn-gold" href="/sites">Browse all sites</Link>
            <a className="btn btn-call text-white" href={`tel:+91${site.phone}`}>Call {site.phone}</a>
          </div></M>
        </div>

        <M custom={3}>
          <div className="overflow-hidden rounded-3xl bg-white text-ink shadow-2xl shadow-black/50 ring-4 ring-gold/60">
            <div className="flex items-center justify-between bg-navy px-5 py-4">
              <h2 className="flex items-center gap-2.5 font-serif text-2xl font-extrabold text-white">
                <span className="relative flex h-3 w-3" aria-hidden><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#9be15d] opacity-75" /><span className="relative inline-flex h-3 w-3 rounded-full bg-[#9be15d]" /></span>
                Current rates
              </h2>
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-[#1b1405]">per sq yard</span>
            </div>
            <ul className="px-3 py-2">
              {sites.slice(0, 8).map((s, i) => (
                <motion.li key={s.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 + i * 0.07 }} className="border-b border-line last:border-0">
                  <Link href={`/sites/${s.slug}`} className="group flex items-center gap-3 rounded-xl px-2 py-3 transition hover:bg-leaf-soft">
                    <span className="min-w-0 flex-1">
                      <b className="block font-serif text-[17px] font-semibold leading-tight text-navy">{s.name_en}</b>
                      <span className="text-xs font-semibold text-mute">📍 {s.city}</span>
                    </span>
                    <span className="flex flex-wrap justify-end gap-1.5">
                      {[...(s.rates || [])].sort((a, b) => a - b).map((r) => <span key={r} className="rounded-lg bg-leaf px-2.5 py-1 text-[15px] font-extrabold text-white">{inr(r)}</span>)}
                      {!s.rates?.length && <span className="text-sm font-bold text-leaf">Call</span>}
                    </span>
                    <span className="text-xl font-bold text-gold transition group-hover:translate-x-1" aria-hidden>›</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="bg-leaf-soft p-3">
              <WaButton className="btn btn-wa w-full" text={"Hello Ashwani 🙏\nPlease share the latest rate list of all Kshiraj sites in Kanpur and Unnao."}>Get latest rate list on WhatsApp</WaButton>
            </div>
          </div>
        </M>
      </div>
      <div className="absolute inset-x-0 -bottom-px h-12 bg-paper [clip-path:ellipse(75%_100%_at_50%_100%)]" />
    </div>
  );
}