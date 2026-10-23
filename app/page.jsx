"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import PlotMap from "@/components/PlotMap";
import EnquiryForm from "@/components/EnquiryForm";
import { site, waLink } from "@/lib/config";

const hello = waLink("Hello Ashwani, I want to know about plots.");
const trust = [
  ["✔", "Trusted and transparent deals", "Clear pricing and no hidden charges. You know what you pay before you decide."],
  ["☺", "Customer-first approach", "We answer your questions patiently and never rush you into a plot."],
  ["⌖", "Prime locations in Kanpur and Unnao", "Plots near roads, markets and growing neighbourhoods."],
  ["▤", "Hassle-free documentation", "We guide you through every paper, from checking the title to registry."],
];
const steps = [
  ["Talk to us", "Call or WhatsApp Ashwani and share your budget and area."],
  ["Visit the site", "See the land and the roads in person."],
  ["Check the papers", "We walk you through every document, so nothing is unclear."],
  ["Register and own", "Complete the registry and get your plot."],
];
const values = [["Integrity", "in every deal", "bg-navy"], ["Commitment", "to excellence", "bg-leaf"], ["Sustainable", "developments", "bg-[#2c3a6e]"], ["Building trust", "creating value", "bg-[#3f6420]"]];
const up = { hidden: { opacity: 0, y: 24 }, show: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.5 } }) };

export default function Home() {
  const [pick, setPick] = useState(null);
  return (
    <>
      <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur" style={{ paddingTop: "env(safe-area-inset-top,0px)" }}>
        <div className="wrap flex h-16 items-center justify-between">
          <a href="#top" className="font-serif text-[22px] font-extrabold tracking-wide text-navy">KSHIRAJ
            <small className="block font-sans text-[10px] font-semibold tracking-[.14em] text-leaf">DEVELOPMENT PVT. LTD.</small></a>
          <nav className="hidden gap-7 text-[15px] font-semibold text-mute md:flex">
            {[["#plots", "Plots"], ["#why", "Why us"], ["#process", "How it works"], ["#enquire", "Enquire"]].map(([h, t]) => <a key={h} href={h} className="hover:text-ink">{t}</a>)}
          </nav>
          <a className="btn btn-wa !min-h-[44px] !py-2" href={hello} target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </header>

      <main id="top">
        <div className="relative overflow-hidden bg-gradient-to-br from-navy-deep to-navy pb-20 pt-14 text-white">
          <div className="wrap grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <motion.h1 variants={up} initial="hidden" animate="show" custom={0} className="font-serif text-[clamp(40px,7vw,68px)] font-extrabold leading-[1.08]">
                Your Land.<span className="block font-semibold italic text-[#b9d98a]">Your Future.</span>
              </motion.h1>
              <motion.p variants={up} initial="hidden" animate="show" custom={1} className="my-5 max-w-[44ch] text-[#cdd3ea]">
                Verified residential plots in Kanpur and Unnao, with clear paperwork and a person you can call. Pick a plot on the map and ask us about it.
              </motion.p>
              <motion.div variants={up} initial="hidden" animate="show" custom={2} className="flex flex-wrap gap-3">
                <a className="btn btn-wa" href={hello} target="_blank" rel="noopener">Chat on WhatsApp</a>
                <a className="btn btn-call text-white" href={`tel:+91${site.phone}`}>Call {site.phone}</a>
              </motion.div>
            </div>
            <motion.div variants={up} initial="hidden" animate="show" custom={3}><PlotMap onPick={(p, city) => setPick({ p, city })} /></motion.div>
          </div>
          <div className="absolute inset-x-0 -bottom-px h-12 bg-paper [clip-path:ellipse(75%_100%_at_50%_100%)]" />
        </div>

        <section id="why" className="py-[72px]"><div className="wrap">
          <h2 className="h2">Why families choose Kshiraj</h2>
          <p className="mt-3 max-w-[56ch] text-mute">Buying land is a big decision. We keep it simple and honest.</p>
          <div className="mt-8 grid border-t border-line md:grid-cols-2 md:gap-x-14">
            {trust.map(([i, t, d], n) => (
              <motion.div key={t} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex gap-4 border-b border-line py-6">
                <span className={`grid h-12 w-12 flex-none place-items-center rounded-full text-xl text-white ${n % 2 ? "bg-leaf" : "bg-navy"}`}>{i}</span>
                <div><h3 className="font-serif text-xl font-semibold">{t}</h3><p className="mt-1 text-mute">{d}</p></div>
              </motion.div>
            ))}
          </div>
        </div></section>

        <section id="process" className="border-y border-line bg-white py-[72px]"><div className="wrap">
          <h2 className="h2">From first call to your own plot</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-4">
            {steps.map(([t, d], n) => (
              <li key={t} className="rounded-r-2xl border-l-4 border-leaf bg-paper p-5">
                <span className="block font-serif text-3xl font-extrabold text-gold">{n + 1}</span>
                <h3 className="font-serif text-xl font-semibold">{t}</h3><p className="mt-1.5 text-[15px] text-mute">{d}</p>
              </li>
            ))}
          </ol>
        </div></section>

        <section className="py-[72px]"><div className="wrap">
          <h2 className="h2">What we stand for</h2>
          <div className="mt-8 grid grid-cols-2 gap-3.5 md:grid-cols-4">
            {values.map(([a, b, c]) => <div key={a} className={`${c} rounded-2xl p-5 text-white`}><b className="block font-serif text-xl font-semibold">{a}</b><span className="text-sm opacity-85">{b}</span></div>)}
          </div>
        </div></section>

        <section id="enquire" className="pb-[72px]"><div className="wrap grid gap-9 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="h2">Ask about a plot</h2>
            <p className="mt-3 max-w-[56ch] text-mute">Fill in the form and it opens WhatsApp with your message ready to send to Ashwani.</p>
            <div className="mt-7 grid gap-5">
              {[["✆", `${site.person}, Sales Associate`, <a key="p" className="font-semibold text-leaf" href={`tel:+91${site.phone}`}>{site.phone}</a>, " (Call / WhatsApp)"],
                ["◍", "Website", <a key="w" className="break-all font-semibold text-leaf" href={site.website}>{site.website.replace("https://", "")}</a>, ""],
                ["⌂", "Office address", site.address, ""]].map(([i, h, a, b]) => (
                <div key={h} className="flex gap-3.5"><span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-navy text-white">{i}</span><p><b className="block">{h}</b>{a}{b}</p></div>
              ))}
            </div>
          </div>
          <EnquiryForm pick={pick} />
        </div></section>
      </main>

      <footer className="bg-navy-deep py-9 text-center text-sm text-[#aab2d3]"><div className="wrap">
        <b className="font-serif text-lg text-white">{site.company}</b>
        <p>{site.tagline} · Building better spaces for a better tomorrow.</p>
      </div></footer>

      <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2.5 border-t border-line bg-white px-3.5 pt-2.5 md:hidden" style={{ paddingBottom: "calc(10px + env(safe-area-inset-bottom,0px))" }}>
        <a className="btn btn-call flex-1 text-navy" href={`tel:+91${site.phone}`}>Call</a>
        <a className="btn btn-wa flex-1" href={hello} target="_blank" rel="noopener">WhatsApp</a>
      </div>
    </>
  );
}
