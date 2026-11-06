import { site } from "@/lib/config";
import { WaButton } from "@/components/Whatsapp";
export default function ContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2.5 border-t border-line bg-white px-3.5 pt-2.5 md:hidden" style={{ paddingBottom: "calc(10px + env(safe-area-inset-bottom,0px))" }}>
      <a className="btn btn-call flex-1 text-navy" href={`tel:+91${site.phone}`}>Call</a>
      <WaButton className="btn btn-wa flex-1">WhatsApp</WaButton>
    </div>
  );
}