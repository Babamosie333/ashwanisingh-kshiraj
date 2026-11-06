import Link from "next/link";
import { WaButton } from "@/components/Whatsapp";
import { site } from "@/lib/config";
export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur" style={{ paddingTop: "env(safe-area-inset-top,0px)" }}>
      <div className="wrap flex h-16 items-center justify-between gap-3">
        <Link href="/" className="min-w-0 leading-tight">
          <span className="block font-serif text-xl font-extrabold tracking-wide text-navy">KSHIRAJ{" "}
            <span className="block font-sans text-[11px] font-semibold tracking-normal text-leaf-dark sm:inline sm:text-[13px]">({site.person}, Sales Associate)</span></span>
          <small className="hidden font-sans text-[10px] font-semibold tracking-[.14em] text-leaf sm:block">DEVELOPERS INDIA PVT. LTD.</small>
        </Link>
        <nav className="hidden gap-8 text-[15px] font-semibold text-mute md:flex">
          <Link href="/sites" className="hover:text-ink">Our sites</Link><Link href="/#why" className="hover:text-ink">Why us</Link><Link href="/#contact" className="hover:text-ink">Contact</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/sites" className="btn btn-call !min-h-[44px] !px-4 !py-2 text-navy md:hidden">Sites</Link>
          <WaButton className="btn btn-wa hidden !min-h-[44px] !px-4 !py-2 md:inline-flex">WhatsApp</WaButton>
        </div>
      </div>
    </header>
  );
}