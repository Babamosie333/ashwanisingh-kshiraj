import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import EmiPlan from "@/components/EmiPlan";
import EnquiryForm from "@/components/EnquiryForm";
import { getSite, getSites } from "@/lib/sites";
import { site } from "@/lib/config";
import { WaButton, SetWaSite } from "@/components/Whatsapp";
import { rateText, STATUS } from "@/lib/format";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const s = await getSite(params.slug);
  if (!s) return { title: "Site not found" };
  const img = s.images?.[0];
  const description = `${s.name_en}, ${s.location}. Rate per sq yard: ${rateText(s.rates)}.`;
  // Open Graph tags: WhatsApp uses these to show the site photo and name when the page link is shared.
  return { title: `${s.name_en} | ${site.company}`, description,
    openGraph: { title: s.name_en, description, type: "website", ...(img ? { images: [{ url: img }] } : {}) },
    twitter: { card: img ? "summary_large_image" : "summary" } };
}

const List = ({ title, items }) => items?.length ? (
  <section className="mt-10"><h2 className="font-serif text-2xl font-extrabold text-navy">{title}</h2><div className="rule" />
    <ul className="mt-4 grid gap-2 sm:grid-cols-2">{items.map((x) => <li key={x} className="flex gap-2"><span className="text-leaf">✔</span>{x}</li>)}</ul></section>
) : null;

export default async function SitePage({ params }) {
  const s = await getSite(params.slug);
  if (!s) notFound();
  const all = await getSites();
  const [label, cls] = STATUS[s.status] || STATUS.available;
  const ws = { slug: s.slug, name_en: s.name_en, name_hi: s.name_hi || "", location: s.location || "", rates: s.rates || [] };
  return (
    <main>
      <SetWaSite s={ws} />
      <div className="bg-gradient-to-br from-navy-deep to-navy py-10 text-white"><div className="wrap">
        <p className="text-sm text-[#aab2d3]"><Link href="/" className="hover:text-white">Home</Link> / <Link href="/sites" className="hover:text-white">Sites</Link> / {s.name_en}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${cls}`}>{label}</span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{s.city}</span>
        </div>
        <h1 className="mt-3 font-serif text-4xl font-extrabold md:text-5xl">{s.name_en}</h1>
        {s.name_hi && <p className="mt-1 text-xl text-[#b9d98a]">{s.name_hi}</p>}
        {s.location && <p className="mt-3 text-[#cdd3ea]">📍 {s.location}</p>}
      </div></div>

      <div className="wrap grid gap-10 py-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <Gallery images={s.images} name={s.name_en} />
          <section className="mt-10"><h2 className="font-serif text-2xl font-extrabold text-navy">About this site</h2><div className="rule" />
            <p className="mt-4 whitespace-pre-line text-mute">{s.description || "Call Ashwani for the plot sizes, layout map, documents and a site visit."}</p></section>
          <EmiPlan s={ws} />
          <List title="Facilities" items={s.facilities} />
          <List title="Documents" items={s.documents} />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-line bg-white p-6 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wide text-mute">Rate per sq yard</span>
            <p className="font-serif text-3xl font-extrabold text-leaf">{rateText(s.rates) || "Call for rate"}</p>
            {s.plot_sizes && <p className="mt-4 border-t border-line pt-4"><b className="block text-sm text-mute">Plot sizes</b>{s.plot_sizes}</p>}
            <div className="mt-5 grid gap-3">
              <WaButton s={ws} className="btn btn-wa">WhatsApp about this site</WaButton>
              <a className="btn btn-call text-navy" href={`tel:+91${site.phone}`}>Call {site.phone}</a>
              {s.maps_url && <a className="btn btn-call text-navy" href={s.maps_url} target="_blank" rel="noopener">View on Google Maps</a>}
            </div>
            <p className="mt-4 text-center text-sm text-mute">{site.person}, Sales Associate</p>
          </div>
        </aside>
      </div>

      <section className="border-t border-line bg-white py-14"><div className="wrap grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div><h2 className="h2">Interested in {s.name_en}?</h2><div className="rule" /><p className="mt-4 text-mute">Leave your number and we will call you back through WhatsApp.</p></div>
        <EnquiryForm sites={all.map(({ name_en, slug }) => ({ name_en, slug }))} defaultSite={s.name_en} />
      </div></section>
    </main>
  );
}