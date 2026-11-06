import Link from "next/link";
import Hero from "@/components/Hero";
import SiteCard from "@/components/SiteCard";
import EnquiryForm from "@/components/EnquiryForm";
import { getSites } from "@/lib/sites";
import { site } from "@/lib/config";

export const dynamic = "force-dynamic";

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

export default async function Home() {
  const sites = await getSites();
  return (
    <main>
      <Hero sites={sites} />


      <section className="py-[72px]"><div className="wrap">
        <h2 className="h2">Our sites</h2><div className="rule" />
        <p className="mt-4 max-w-[56ch] text-mute">Tap a site to see photos, rates and details.</p>
        {sites.length ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{sites.map((s, i) => <SiteCard key={s.id} s={s} i={i} />)}</div>
        ) : <p className="mt-8 rounded-2xl bg-white p-8 text-center text-mute">Sites are being added. Please call us for the latest plots.</p>}
        <div className="mt-8 text-center"><Link href="/sites" className="btn btn-call text-navy">Filter by city and status</Link></div>
      </div></section>

      <section id="why" className="border-y border-line bg-white py-[72px]"><div className="wrap">
        <h2 className="h2">Why families choose Kshiraj</h2><div className="rule" />
        <div className="mt-8 grid border-t border-line md:grid-cols-2 md:gap-x-14">
          {trust.map(([i, t, d], n) => (
            <div key={t} className="flex gap-4 border-b border-line py-6">
              <span className={`grid h-12 w-12 flex-none place-items-center rounded-full text-xl text-white ${n % 2 ? "bg-leaf" : "bg-navy"}`}>{i}</span>
              <div><h3 className="font-serif text-xl font-semibold">{t}</h3><p className="mt-1 text-mute">{d}</p></div>
            </div>
          ))}
        </div>
      </div></section>

      <section className="py-[72px]"><div className="wrap">
        <h2 className="h2">From first call to your own plot</h2><div className="rule" />
        <ol className="mt-8 grid gap-5 md:grid-cols-4">
          {steps.map(([t, d], n) => (
            <li key={t} className="rounded-r-2xl border-l-4 border-leaf bg-white p-5 shadow-sm">
              <span className="block font-serif text-3xl font-extrabold text-gold">{n + 1}</span>
              <h3 className="font-serif text-xl font-semibold">{t}</h3><p className="mt-1.5 text-[15px] text-mute">{d}</p>
            </li>
          ))}
        </ol>
      </div></section>

      <section id="contact" className="border-t border-line bg-white py-[72px]"><div className="wrap grid gap-9 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <h2 className="h2">Ask about a plot</h2><div className="rule" />
          <p className="mt-4 max-w-[56ch] text-mute">Fill in the form and it opens WhatsApp with your message ready to send to Ashwani.</p>
          <div className="mt-7 grid gap-5">
            <div className="flex gap-3.5"><span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-navy text-white">✆</span><p><b className="block">{site.person}</b><a className="font-semibold text-leaf" href={`tel:+91${site.phone}`}>{site.phone}</a> (Call / WhatsApp)</p></div>
            <div className="flex gap-3.5"><span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-navy text-white">⌂</span><p><b className="block">Office address</b>{site.address}</p></div>
          </div>
        </div>
        <EnquiryForm sites={sites.map(({ name_en, slug }) => ({ name_en, slug }))} />
      </div></section>
    </main>
  );
}