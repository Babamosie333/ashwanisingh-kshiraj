"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site, waLink } from "@/lib/config";

export default function EnquiryForm({ pick }) {
  const [v, setV] = useState({ name: "", phone: "", city: site.cities[0], plot: "", msg: "" });
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(false);
  useEffect(() => {
    if (pick) setV((s) => ({ ...s, plot: `${pick.p.id} (${pick.p.size} sq ft)`, city: pick.city }));
  }, [pick]);
  const set = (k) => (e) => setV({ ...v, [k]: k === "phone" ? e.target.value.replace(/\D/g, "") : e.target.value });

  function submit(e) {
    e.preventDefault();
    const er = {};
    if (!v.name.trim()) er.name = "Enter your name so Ashwani knows who to call.";
    if (!/^[6-9]\d{9}$/.test(v.phone)) er.phone = "Enter a 10-digit mobile number starting with 6, 7, 8 or 9.";
    setErr(er);
    if (Object.keys(er).length) return;
    const t = `Hello Ashwani, my name is ${v.name.trim()} (phone ${v.phone}). I am looking at ${v.city}${v.plot.trim() ? `, plot: ${v.plot.trim()}` : ""}.${v.msg.trim() ? " " + v.msg.trim() : ""}`;
    window.open(waLink(t), "_blank", "noopener");
    setSent(true); setTimeout(() => setSent(false), 3500);
  }
  const field = "min-h-[48px] w-full rounded-xl border-[1.5px] bg-paper p-3 text-ink";
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 rounded-3xl border border-line bg-white p-6">
      <label className="grid gap-1.5 font-semibold">Your name
        <input className={`${field} ${err.name ? "border-red-600" : "border-line"}`} value={v.name} onChange={set("name")} autoComplete="name" aria-invalid={!!err.name} />
        {err.name && <span className="text-sm font-medium text-red-700">{err.name}</span>}
      </label>
      <label className="grid gap-1.5 font-semibold">Phone number
        <input className={`${field} ${err.phone ? "border-red-600" : "border-line"}`} value={v.phone} onChange={set("phone")} inputMode="numeric" maxLength={10} autoComplete="tel" placeholder="10-digit mobile number" aria-invalid={!!err.phone} />
        {err.phone && <span className="text-sm font-medium text-red-700">{err.phone}</span>}
      </label>
      <label className="grid gap-1.5 font-semibold">Location
        <select className={`${field} border-line`} value={v.city} onChange={set("city")}>{site.cities.map((c) => <option key={c}>{c}</option>)}</select>
      </label>
      <label className="grid gap-1.5 font-semibold">Plot you like
        <input className={`${field} border-line`} value={v.plot} onChange={set("plot")} placeholder="Pick on the map or leave blank" />
      </label>
      <label className="grid gap-1.5 font-semibold">Message (optional)
        <textarea className={`${field} border-line`} rows={3} value={v.msg} onChange={set("msg")} />
      </label>
      <button className="btn btn-wa" type="submit">Send on WhatsApp</button>
      <AnimatePresence>{sent && (
        <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status" className="text-center font-semibold text-leaf">Opening WhatsApp with your message</motion.p>
      )}</AnimatePresence>
    </form>
  );
}
