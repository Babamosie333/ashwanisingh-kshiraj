import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/config";

// Default share picture (WhatsApp, Facebook, LinkedIn, X). Site pages that have a cover photo use that photo instead.
export const alt = `${site.company}: plots in Kanpur and Unnao`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Edit this when your lowest rate changes. It is printed on the image when the site is built.
const FROM_RATE = "3,000";
const DOMAIN = (process.env.NEXT_PUBLIC_SITE_URL || "https://ashwanisingh-kshiraj.vercel.app").replace(/^https?:\/\//, "");

const NAVY = "#14214f", GOLD = "#b8923f", LEAF = "#5b8a2e", MUTE = "#5a6280", LINE = "#e2e1d8";
// 12 sample plots: a = available, b = booked, s = sold, p = picked
const GRID = [["a", "p", "b", "a"], ["s", "a", "a", "b"], ["a", "a", "s", "a"]];
const COLOR = { a: "#f4f8ea", b: "#e8c26a", s: "#c6c9d6", p: NAVY };
const Row = ({ r }) => (
  <div style={{ display: "flex" }}>
    {GRID[r].map((k, i) => (
      <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 77, height: 56, margin: 5, borderRadius: 7, background: COLOR[k], color: k === "p" ? "#fff" : NAVY, fontSize: 19, fontWeight: 700 }}>
        {String(r * 4 + i + 1).padStart(2, "0")}
      </div>
    ))}
  </div>
);
const Tick = ({ children }) => (
  <div style={{ display: "flex", alignItems: "center", marginRight: 18, fontSize: 19, fontWeight: 700, color: NAVY }}>
    <svg width="24" height="24" viewBox="0 0 26 26" style={{ marginRight: 7 }}>
      <circle cx="13" cy="13" r="13" fill={LEAF} />
      <path d="M7 13.5 L11.5 18 L19 9" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    {children}
  </div>
);
const load = (file) => readFile(join(process.cwd(), "assets", file));

export default async function OgImage() {
  // Same fonts as the website (files are in /assets). "FigtreeExt" only supplies the rupee sign.
  const [fraunces, frauncesItalic, figtreeBold, figtreeExt, figtree] = await Promise.all([
    load("Fraunces-800.woff"), load("Fraunces-600-italic.woff"), load("Figtree-700.woff"), load("Figtree-700-ext.woff"), load("Figtree-400.woff"),
  ]);

  return new ImageResponse(
    (
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", fontFamily: "Figtree", color: NAVY, background: "linear-gradient(135deg,#fdfcf8 0%,#f3f1e8 100%)" }}>
        <div style={{ position: "absolute", right: -140, top: -170, width: 520, height: 520, borderRadius: 260, background: "#e8f0dc", display: "flex" }} />
        <div style={{ position: "absolute", left: 0, bottom: 0, width: 1200, height: 10, background: GOLD, display: "flex" }} />

        {/* LEFT: message and the big button */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "46px 10px 44px 70px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", width: 110, height: 6, background: GOLD, borderRadius: 3 }} />
            <div style={{ display: "flex", marginTop: 16, fontSize: 24, fontWeight: 700, letterSpacing: 6, color: GOLD }}>KANPUR · UNNAO</div>
            <div style={{ display: "flex", flexDirection: "column", marginTop: 10, fontFamily: "Fraunces" }}>
              <div style={{ display: "flex", fontSize: 86, fontWeight: 800, lineHeight: 1.08 }}>Your Land.</div>
              <div style={{ display: "flex", fontSize: 86, fontStyle: "italic", fontWeight: 600, lineHeight: 1.08, color: LEAF }}>Your Future.</div>
            </div>
            <div style={{ display: "flex", marginTop: 14, fontSize: 32, fontWeight: 700 }}>Find your plot in Kanpur and Unnao</div>
            <div style={{ display: "flex", marginTop: 14 }}>
              <Tick>Easy EMI plans</Tick><Tick>Clear paperwork</Tick><Tick>Transparent deals</Tick>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", padding: "16px 34px", borderRadius: 18, background: LEAF, color: "#fff", fontSize: 36, fontWeight: 700, boxShadow: "0 10px 24px rgba(91,138,46,0.45)" }}>
                See plots and rates
                <svg width="34" height="28" viewBox="0 0 30 24" style={{ marginLeft: 14 }}>
                  <path d="M2 12 H25 M16 3 L26 12 L16 21" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
            <div style={{ display: "flex", marginTop: 12, fontSize: 22, fontWeight: 700, color: MUTE }}>{DOMAIN}</div>
            <div style={{ display: "flex", alignItems: "baseline", marginTop: 14 }}>
              <div style={{ display: "flex", fontFamily: "Fraunces", fontSize: 34, fontWeight: 800, letterSpacing: 2 }}>KSHIRAJ</div>
              <div style={{ display: "flex", marginLeft: 12, fontSize: 21, fontWeight: 700, color: LEAF }}>({site.person}, Sales Associate)</div>
            </div>
          </div>
        </div>

        {/* RIGHT: interactive-looking plot picker */}
        <div style={{ position: "relative", display: "flex", width: 470, alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", width: 420, padding: 20, borderRadius: 30, background: "#fff", border: `1px solid ${LINE}`, transform: "rotate(-2deg)", boxShadow: "0 28px 60px rgba(20,33,79,0.22)" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: 14, height: 40 }}>
              <div style={{ display: "flex", fontFamily: "Fraunces", fontSize: 32, fontWeight: 800 }}>Pick a plot</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", background: "#9bbd6a", borderRadius: 16, padding: 8 }}>
              <Row r={0} />
              <div style={{ display: "flex", alignItems: "center", height: 24, margin: "3px 0", background: "#6d6f7c", borderRadius: 4 }}>
                <div style={{ display: "flex", width: "100%", height: 3, background: "#fff", opacity: 0.8 }} />
              </div>
              <Row r={1} />
              <Row r={2} />
            </div>
            <div style={{ display: "flex", marginTop: 18, fontSize: 20, fontWeight: 700, color: MUTE }}>Photos · Rates · EMI plans</div>

            {/* tap ripple, cursor and popup on the picked plot */}
            <div style={{ position: "absolute", left: 108, top: 56, width: 110, height: 110, borderRadius: 55, background: "rgba(184,146,63,0.18)", border: `3px solid ${GOLD}`, display: "flex" }} />
            <div style={{ position: "absolute", left: 138, top: 86, width: 50, height: 50, borderRadius: 25, border: `3px solid ${GOLD}`, display: "flex" }} />
            <div style={{ position: "absolute", left: 96, top: 172, display: "flex", flexDirection: "column", padding: "12px 16px", borderRadius: 16, background: "#fff", border: `2px solid ${LEAF}`, boxShadow: "0 14px 30px rgba(20,33,79,0.3)" }}>
              <div style={{ display: "flex", fontSize: 22, fontWeight: 700 }}>Plot 02 · Available</div>
              <div style={{ display: "flex", alignSelf: "flex-start", marginTop: 8, padding: "6px 14px", borderRadius: 10, background: LEAF, color: "#fff", fontSize: 18, fontWeight: 700 }}>Ask on WhatsApp</div>
            </div>
            <svg width="34" height="40" viewBox="0 0 15 22" style={{ position: "absolute", left: 150, top: 122 }}>
              <path d="M1 1 L1 18 L5.2 14 L8.4 21 L11 19.8 L7.9 13 L13.5 13 Z" fill={NAVY} stroke="#ffffff" strokeWidth="1.2" strokeLinejoin="round" />
            </svg>
          </div>

          {/* price hook */}
          <div style={{ position: "absolute", right: 6, top: 26, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 156, height: 156, borderRadius: 78, background: GOLD, border: "5px solid #fff", transform: "rotate(10deg)", boxShadow: "0 14px 30px rgba(20,33,79,0.3)", color: "#1b1405" }}>
            <div style={{ display: "flex", fontSize: 17, fontWeight: 700, letterSpacing: 3 }}>FROM</div>
            <div style={{ display: "flex", alignItems: "baseline", lineHeight: 1.1 }}>
              <div style={{ display: "flex", fontFamily: "FigtreeExt", fontSize: 38, fontWeight: 700 }}>₹</div>
              <div style={{ display: "flex", fontSize: 40, fontWeight: 700 }}>{FROM_RATE}</div>
            </div>
            <div style={{ display: "flex", fontSize: 17, fontWeight: 700 }}>per sq yd</div>
          </div>

          {/* chat bubble */}
          <div style={{ position: "absolute", right: 18, bottom: 34, display: "flex", flexDirection: "column", width: 264, padding: "12px 16px", borderRadius: 18, borderBottomRightRadius: 4, background: "#d9fdd3", boxShadow: "0 12px 26px rgba(20,33,79,0.25)", color: "#1b2b1b" }}>
            <div style={{ display: "flex", fontSize: 20, fontWeight: 700 }}>Hello Ashwani, I am interested in Plot 02.</div>
            <div style={{ display: "flex", alignSelf: "flex-end", marginTop: 4, fontSize: 15, color: "#5c7a5c" }}>now</div>
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
        { name: "FigtreeExt", data: figtreeExt, weight: 700, style: "normal" },
        { name: "Figtree", data: figtree, weight: 400, style: "normal" },
      ],
    }
  );
}