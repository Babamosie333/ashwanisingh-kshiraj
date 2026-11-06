import Link from "next/link";
import { site } from "@/lib/config";
export default function Footer() {
  return (
    <footer className="bg-navy-deep py-10 text-sm text-[#aab2d3]">
      <div className="wrap grid gap-6 md:grid-cols-3">
        <div><b className="font-serif text-lg text-white">{site.company}</b><p className="mt-1">{site.tagline}</p></div>
        <div><b className="text-white">Contact</b><p>{site.person} · <a href={`tel:+91${site.phone}`}>{site.phone}</a><br />{site.address}</p></div>
        <div><b className="text-white">Explore</b><p><Link href="/sites">Our sites</Link> · <Link href="/#contact">Enquire</Link> · <Link href="/admin" className="opacity-60">Admin</Link></p></div>
      </div>
    </footer>
  );
}
