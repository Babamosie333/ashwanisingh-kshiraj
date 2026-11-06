"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { slugify } from "@/lib/format";

const BLANK = { name_hi: "", name_en: "", slug: "", city: "Kanpur", location: "", rates: "", plot_sizes: "", status: "available", description: "", facilities: "", documents: "", maps_url: "", images: [], published: true, sort: 100 };
const lines = (t) => t.split("\n").map((x) => x.trim()).filter(Boolean);
const toForm = (r) => ({ ...BLANK, ...Object.fromEntries(Object.entries(r).map(([k, v]) => [k, v ?? BLANK[k] ?? ""])),
  rates: (r.rates || []).join(", "), facilities: (r.facilities || []).join("\n"), documents: (r.documents || []).join("\n"), images: r.images || [] });

const L = ({ t, children, hint }) => <label className="grid gap-1.5 font-semibold">{t}{children}{hint && <span className="text-sm font-normal text-mute">{hint}</span>}</label>;

async function shrink(file) {
  const bmp = await createImageBitmap(file);
  const k = Math.min(1, 1280 / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas");
  c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
  c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
  return new Promise((res) => c.toBlob(res, "image/jpeg", 0.78));
}

export default function SiteEditor({ id }) {
  const router = useRouter();
  const isNew = id === "new";
  const [f, setF] = useState(BLANK);
  const [orig, setOrig] = useState(null);
  const [loading, setLoading] = useState(!isNew);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isNew) return;
    supabase.from("sites").select("*").eq("id", id).maybeSingle().then(({ data, error }) => {
      if (error || !data) setMsg(error?.message || "Site not found."); else { setOrig(data); setF(toForm(data)); }
      setLoading(false);
    });
  }, [id, isNew]);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });
  const slug = slugify(f.slug || f.name_en);

  async function upload(e) {
    const files = [...e.target.files]; e.target.value = ""; if (!files.length) return;
    if (!slug) { setMsg("Type the English name first, so photos can be filed under it."); return; }
    setBusy(true); setMsg("");
    const urls = [];
    for (const [i, file] of files.entries()) {
      if (!file.type.startsWith("image/") || file.size > 25e6) { setMsg(`Skipped ${file.name}: only images under 25 MB.`); continue; }
      try {
        const blob = await shrink(file);
        const path = `${slug}/${Date.now()}-${i}.jpg`;
        const { error } = await supabase.storage.from("site-images").upload(path, blob, { contentType: "image/jpeg" });
        if (error) throw error;
        urls.push(supabase.storage.from("site-images").getPublicUrl(path).data.publicUrl);
      } catch (err) { setMsg(`Could not upload ${file.name}: ${err.message || "unsupported image"}`); }
    }
    setF((s) => ({ ...s, images: [...s.images, ...urls] })); setBusy(false);
  }
  const move = (i, d) => setF((s) => { const a = [...s.images]; const j = i + d; if (j < 0 || j >= a.length) return s; [a[i], a[j]] = [a[j], a[i]]; return { ...s, images: a }; });
  const cover = (i) => setF((s) => ({ ...s, images: [s.images[i], ...s.images.filter((_, k) => k !== i)] }));
  const drop = (i) => setF((s) => ({ ...s, images: s.images.filter((_, k) => k !== i) }));

  async function save(e) {
    e.preventDefault(); setMsg("");
    if (!f.name_en.trim()) { setMsg("English name is required."); return; }
    if (!slug) { setMsg("Web address (slug) is required."); return; }
    setBusy(true);
    const row = { name_hi: f.name_hi.trim(), name_en: f.name_en.trim(), slug, city: f.city, location: f.location.trim(), plot_sizes: f.plot_sizes.trim(),
      rates: f.rates.split(/[,\s]+/).map(Number).filter((n) => n > 0), status: f.status, description: f.description.trim(), facilities: lines(f.facilities),
      documents: lines(f.documents), maps_url: f.maps_url.trim(), images: f.images, published: f.published, sort: Number(f.sort) || 0, updated_at: new Date().toISOString() };
    const { data, error } = isNew ? await supabase.from("sites").insert(row).select("id")
      : await supabase.from("sites").update(row).eq("id", id).eq("updated_at", orig.updated_at).select("id");
    setBusy(false);
    if (error) { setMsg(error.code === "23505" ? "That web address (slug) is already used by another site. Change it." : error.message); return; }
    if (!data?.length) { setMsg("Someone else changed this site while you were editing. Reload the page and try again."); return; }
    router.push("/admin");
  }
  async function remove() {
    if (!confirm(`Delete "${f.name_en}" for good?`)) return;
    const { error } = await supabase.from("sites").delete().eq("id", id);
    if (error) setMsg(error.message); else router.push("/admin");
  }

  if (loading) return <p className="p-10 text-center text-mute">Loading…</p>;
  return (
    <main className="wrap max-w-3xl py-8">
      <Link href="/admin" className="text-sm font-semibold text-leaf">← All sites</Link>
      <h1 className="mt-2 font-serif text-3xl font-extrabold text-navy">{isNew ? "Add new site" : "Edit site"}</h1>
      <form onSubmit={save} className="mt-6 grid gap-5 rounded-3xl border border-line bg-white p-6 shadow-sm">
        <div className="grid gap-5 sm:grid-cols-2">
          <L t="Name (English)"><input className="input" value={f.name_en} onChange={set("name_en")} required /></L>
          <L t="Name (Hindi)"><input className="input" value={f.name_hi} onChange={set("name_hi")} /></L>
        </div>
        <L t="Web address" hint={`Page will be at /sites/${slug || "…"}. Leave blank to make it from the English name.`}><input className="input" value={f.slug} onChange={set("slug")} placeholder={slugify(f.name_en)} /></L>
        <div className="grid gap-5 sm:grid-cols-2">
          <L t="City"><select className="input" value={f.city} onChange={set("city")}><option>Kanpur</option><option>Unnao</option></select></L>
          <L t="Status"><select className="input" value={f.status} onChange={set("status")}><option value="available">Available</option><option value="selling_fast">Selling fast</option><option value="sold_out">Sold out</option></select></L>
        </div>
        <L t="Location"><input className="input" value={f.location} onChange={set("location")} placeholder="Village / area, district" /></L>
        <L t="Rate per sq yard (₹)" hint="Numbers separated by commas, e.g. 4000, 5000, 8000"><input className="input" inputMode="numeric" value={f.rates} onChange={set("rates")} /></L>
        <L t="Plot sizes"><input className="input" value={f.plot_sizes} onChange={set("plot_sizes")} placeholder="e.g. 100, 150, 200 sq yard" /></L>
        <L t="Description"><textarea className="input" rows={5} value={f.description} onChange={set("description")} /></L>
        <div className="grid gap-5 sm:grid-cols-2">
          <L t="Facilities" hint="One per line"><textarea className="input" rows={5} value={f.facilities} onChange={set("facilities")} /></L>
          <L t="Documents" hint="One per line"><textarea className="input" rows={5} value={f.documents} onChange={set("documents")} /></L>
        </div>
        <L t="Google Maps link"><input className="input" type="url" value={f.maps_url} onChange={set("maps_url")} placeholder="https://maps.app.goo.gl/…" /></L>

        <div>
          <b>Photos</b> <span className="text-sm text-mute">First photo is the cover. Photos are resized automatically.</span>
          <input type="file" accept="image/*" multiple onChange={upload} disabled={busy} className="input mt-2 !p-2" aria-label="Upload photos" />
          <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {f.images.map((u, i) => (
              <li key={u} className="overflow-hidden rounded-xl border border-line">
                <div className="relative"><img src={u} alt="" className="aspect-[4/3] w-full object-cover" />{i === 0 && <span className="absolute left-2 top-2 rounded-full bg-gold px-2 py-0.5 text-xs font-bold">Cover</span>}</div>
                <div className="flex flex-wrap gap-1 p-2 text-xs font-bold">
                  {i > 0 && <button type="button" onClick={() => cover(i)} className="rounded bg-leaf-soft px-2 py-1.5">Make cover</button>}
                  <button type="button" onClick={() => move(i, -1)} aria-label="Move earlier" className="rounded bg-leaf-soft px-2.5 py-1.5">←</button>
                  <button type="button" onClick={() => move(i, 1)} aria-label="Move later" className="rounded bg-leaf-soft px-2.5 py-1.5">→</button>
                  <button type="button" onClick={() => drop(i)} className="ml-auto rounded bg-red-50 px-2 py-1.5 text-red-700">Remove</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <label className="flex items-center gap-3 font-semibold"><input type="checkbox" className="h-5 w-5" checked={f.published} onChange={set("published")} /> Show on website (untick to hide)</label>
        {msg && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{msg}</p>}
        <div className="flex flex-wrap gap-3">
          <button className="btn btn-wa" disabled={busy}>{busy ? "Please wait…" : "Save site"}</button>
          {!isNew && <button type="button" onClick={remove} className="btn btn-call ml-auto text-red-700">Delete site</button>}
        </div>
      </form>
    </main>
  );
}