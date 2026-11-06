import "./globals.css";
import { Fraunces, Figtree, Hind } from "next/font/google";
import { site } from "@/lib/config";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", weight: ["600", "800"], style: ["normal", "italic"] });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });
const hind = Hind({ subsets: ["devanagari", "latin"], variable: "--font-hind", weight: ["400", "600", "700"] });

const title = `${site.company} | Plots in Kanpur & Unnao`;
const description = "Verified residential plots in Kanpur and Unnao with clear paperwork. Talk to Ashwani Singh.";

export const metadata = {
  // Needed so the share image link is a full web address. Set NEXT_PUBLIC_SITE_URL in Vercel if you add a custom domain.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://ashwanisingh-kshiraj.vercel.app"),
  title,
  description,
  openGraph: { title, description, siteName: site.company, locale: "en_IN", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable} ${hind.variable}`}>
      <body>{children}</body>
    </html>
  );
}