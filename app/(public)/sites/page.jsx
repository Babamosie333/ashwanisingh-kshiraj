import SitesBrowser from "@/components/SitesBrowser";
import { getSites } from "@/lib/sites";

export const dynamic = "force-dynamic";
export const metadata = { title: "Our sites | Kshiraj Developers", description: "All Kshiraj plot sites in Kanpur and Unnao with current rates." };

export default async function SitesPage() {
  const sites = await getSites();
  return (
    <main>
      <div className="bg-navy py-12 text-white"><div className="wrap">
        <h1 className="font-serif text-4xl font-extrabold">Our sites</h1><div className="rule" />
        <p className="mt-4 max-w-[56ch] text-[#cdd3ea]">Plots in Kanpur and Unnao. Rates are per sq yard.</p>
      </div></div>
      <div className="wrap py-10 md:py-14"><SitesBrowser sites={sites} /></div>
    </main>
  );
}
