"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { waLink } from "@/lib/config";
import { rateText } from "@/lib/format";

// The site page sets the "current site" here, so the header, bottom bar and page button all send the same site-specific message.
const Ctx = createContext({ s: null, setS: () => {} });

export function WaProvider({ children }) {
  const [s, setS] = useState(null);
  return <Ctx.Provider value={{ s, setS }}>{children}</Ctx.Provider>;
}
export function SetWaSite({ s }) {
  const { setS } = useContext(Ctx);
  useEffect(() => { setS(s); return () => setS(null); }, [s.slug]); // eslint-disable-line
  return null;
}
function useOrigin() {
  const [o, setO] = useState(process.env.NEXT_PUBLIC_SITE_URL || "");
  useEffect(() => setO(window.location.origin), []);
  return o;
}
// WhatsApp cannot attach a picture through a link. The site link at the end makes WhatsApp show a preview card
// with the site photo and name (taken from the page's Open Graph tags).
export function siteMessage(s, origin) {
  if (!s) return "Hello Ashwani 🙏\nI want to know about your plots in Kanpur and Unnao. Please share the available sites and current rates.";
  const rate = rateText(s.rates);
  return [
    "Hello Ashwani 🙏",
    `I am interested in *${s.name_en}*${s.name_hi ? ` (${s.name_hi})` : ""}${s.location ? `, ${s.location}` : ""}.`,
    rate ? `Rate: ${rate} per sq yard.` : "",
    "Please share plot availability, documents and site visit details.",
    origin ? `${origin}/sites/${s.slug}` : "",
  ].filter(Boolean).join("\n");
}
export function WaButton({ s, text, className, children }) {
  const { s: current } = useContext(Ctx);
  const origin = useOrigin();
  const msg = text ?? siteMessage(s ?? current, origin);
  return <a className={className} href={waLink(msg)} target="_blank" rel="noopener">{children}</a>;
}