import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/config";

// Default share picture (WhatsApp, Facebook, LinkedIn, X). Site pages that have a cover photo use that photo instead.
export const alt = `${site.company}: plots in Kanpur and Unnao`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const NAVY = "#14214f", GOLD = "#b8923f", LEAF = "#5b8a2e";
const ROWS = [
  ["#f4f8ea", "#f4f8ea", "#e8c26a", "#f4f8ea"],
  ["#c6c9d6", "#f4f8ea", "#f4f8ea", "#e8c26a"],
  ["#f4f8ea", "#f4f8ea", "#c6c9d6", "#f4f8ea"],
];
const Row = ({ colors }) => (
  <div style={{ display: "flex" }}>
    {colors.map((c, i) => <div key={i} style={{ width: 70, height: 62, margin: 5, borderRadius: 6, background: c }} />)}
  </div>
);
const load = (file) => readFile(join(process.cwd(), "assets", file));

export default async function OgImage() {
  // Same fonts as the website (files are in /assets).
  const [fraunces, frauncesItalic, figtreeBold, figtree] = await Promise.all([
    load("Fraunces-800.woff"),
    load("Fraunces-600-italic.woff"),
    load("Figtree-700.woff"),
    load("Figtree-400.woff"),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", fontFamily: "Figtree", color: "#fff", background: "linear-gradient(135deg,#0d1738 0%,#14214f 100%)" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "54px 30px 52px 70px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", width: 110, height: 6, background: GOLD, borderRadius: 3 }} />
            <div style={{ display: "flex", marginTop: 20, fontSize: 24, fontWeight: 700, letterSpacing: 6, color: GOLD }}>KANPUR · UNNAO</div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 18, fontFamily: "Fraunces" }}>
              <div style={{ display: "flex", fontSize: 92, fontWeight: 800, lineHeight: 1.08 }}>Your Land.</div>
              <div style={{ display: "flex", fontSize: 92, fontStyle: "italic", fontWeight: 600, lineHeight: 1.08, color: "#b9d98a" }}>Your Future.</div>
            </div>
            <div style={{ display: "flex", marginTop: 18, fontSize: 30, color: "#cdd3ea" }}>Verified plots. Clear paperwork.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "baseline" }}>
              <div style={{ display: "flex", fontFamily: "Fraunces", fontSize: 44, fontWeight: 800, letterSpacing: 2 }}>KSHIRAJ</div>
              <div style={{ display: "flex", marginLeft: 14, fontSize: 24, fontWeight: 700, color: "#b9d98a" }}>({site.person}, Sales Associate)</div>
            </div>
            <div style={{ display: "flex", marginTop: 4, fontSize: 18, letterSpacing: 3, color: "#aab2d3" }}>DEVELOPERS INDIA PVT. LTD.</div>
            <div style={{ display: "flex", marginTop: 18 }}>
              <div style={{ display: "flex", padding: "11px 26px", borderRadius: 14, background: LEAF, fontSize: 28, fontWeight: 700 }}>WhatsApp / Call: {site.phone}</div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", width: 450, alignItems: "center", justifyContent: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", width: 390, padding: 18, borderRadius: 30, background: "#fff", border: `5px solid ${GOLD}`, transform: "rotate(-3deg)", boxShadow: "0 30px 60px rgba(0,0,0,0.5)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ display: "flex", fontFamily: "Fraunces", fontSize: 32, fontWeight: 800, color: NAVY }}>Our sites</div>
              <div style={{ display: "flex", padding: "5px 14px", borderRadius: 20, background: LEAF, color: "#fff", fontSize: 18, fontWeight: 700 }}>8 locations</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", background: "#9bbd6a", borderRadius: 16, padding: 10 }}>
              <Row colors={ROWS[0]} />
              <div style={{ display: "flex", alignItems: "center", height: 28, margin: "4px 0", background: "#6d6f7c", borderRadius: 4 }}>
                <div style={{ display: "flex", width: "100%", height: 3, background: "#fff", opacity: 0.8 }} />
              </div>
              <Row colors={ROWS[1]} />
              <Row colors={ROWS[2]} />
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 14, fontSize: 22, fontWeight: 700, color: NAVY }}>Photos · Rates · EMI plans</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: fraunces, weight: 800, style: "normal" },
        { name: "Fraunces", data: frauncesItalic, weight: 600, style: "italic" },
        { name: "Figtree", data: figtreeBold, weight: 700, style: "normal" },
        { name: "Figtree", data: figtree, weight: 400, style: "normal" },
      ],
    }
  );
}