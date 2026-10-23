import "./globals.css";
import { Fraunces, Figtree } from "next/font/google";
import { site } from "@/lib/config";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", weight: ["600", "800"], style: ["normal", "italic"] });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree" });

export const metadata = {
  title: `${site.company} | Plots in Kanpur & Unnao`,
  description: "Verified residential plots in Kanpur and Unnao with clear paperwork. Talk to Ashwani Singh at Kshiraj Development.",
};
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable}`}>
      <body>{children}</body>
    </html>
  );
}
