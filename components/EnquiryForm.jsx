"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { waLink } from "@/lib/config";

export default function EnquiryForm({ sites = [], defaultSite = "" }) {
  const [v, setV] = useState({ name: "", phone: "", site: defaultSite, msg: "" });
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setV({ ...v, [k]: k === "phone" ? e.target.value.replace(/\D/g, "") : e.target.value });

  function submit(e) {
    e.preventDefault();
    const er = {};
    if (!v.name.trim()) er.name = "Enter your name so Ashwani knows who to call.";
    if (!/^[6-9]\d{9}$/.test(v.phone)) er.phone = "Enter a 10-digit mobile number starting with 6, 7, 8 or 9.";
    setErr(er);
    if (Object.keys(er).length) return;
    const pick = sites.find((s) => s.name_en === v.site);
    const t = [`Hello Ashwani 🙏`, `My name is ${v.name.trim()} (phone ${v.phone}).`, v.site ? `I am interested in *${v.site}*.` : "I want to know about your plots.", v.msg.trim(), pick ? `${window.location.origin}/sites/${pick.slug}` : ""].filter(Boolean).join("\n");
    window.open(waLink(t), "_blank", "noopener");
    setSent(true); setTimeout(() => setSent(false), 3500);
  }
  const bad = (k) => (err[k] ? "!border-red-600" : "");
  return (
    <form onSubmit={submit} noValidate className="grid gap-4 rounded-3xl border border-line bg-white p-6 shadow-sm">
      <label className="grid gap-1.5 font-semibold">Your name
        <input className={`input ${bad("name")}`} value={v.name} onChange={set("name")} autoComplete="name" aria-invalid={!!err.name} />
        {err.name && <span className="text-sm font-medium text-red-700">{err.name}</span>}
      </label>
      <label className="grid gap-1.5 font-semibold">Phone number
        <input className={`input ${bad("phone")}`} value={v.phone} onChange={set("phone")} inputMode="numeric" maxLength={10} autoComplete="tel" placeholder="10-digit mobile number" aria-invalid={!!err.phone} />
        {err.phone && <span className="text-sm font-medium text-red-700">{err.phone}</span>}
      </label>
      <label className="grid gap-1.5 font-semibold">Site you like
        <select className="input" value={v.site} onChange={set("site")}>
          <option value="">Not sure yet</option>
          {sites.map((s) => <option key={s.slug}>{s.name_en}</option>)}
        </select>
      </label>
      <label className="grid gap-1.5 font-semibold">Message (optional)
        <textarea className="input" rows={3} value={v.msg} onChange={set("msg")} />
      </label>
      <button className="btn btn-wa" type="submit">Send on WhatsApp</button>
      <AnimatePresence>{sent && <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status" className="text-center font-semibold text-leaf">Opening WhatsApp with your message</motion.p>}</AnimatePresence>
    </form>
  );
}