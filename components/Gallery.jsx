"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Set to false once a site shows real photographs instead of AI-generated images.
const SHOW_AI_NOTE = true;

export default function Gallery({ images = [], name }) {
  const [i, setI] = useState(null);
  const n = images.length;
  useEffect(() => {
    if (i === null) return;
    const k = (e) => {
      if (e.key === "Escape") setI(null);
      if (e.key === "ArrowRight") setI((x) => (x + 1) % n);
      if (e.key === "ArrowLeft") setI((x) => (x - 1 + n) % n);
    };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [i, n]);

  if (!n) return (
    <div className="grid aspect-[16/10] place-items-center rounded-2xl bg-gradient-to-br from-leaf-soft to-[#cfe0b4] p-6 text-center">
      <div><p className="text-6xl text-leaf/50" aria-hidden>⌂</p><p className="mt-2 font-semibold text-navy">Photos coming soon</p><p className="text-sm text-mute">Call us for a site visit.</p></div>
    </div>
  );
  return (
    <>
      <button onClick={() => setI(0)} className="relative block w-full overflow-hidden rounded-2xl" aria-label={`Open photos of ${name}`}>
        <img src={images[0]} alt={`${name} main view`} className="aspect-[16/10] w-full object-cover transition duration-500 hover:scale-[1.02]" />
        {SHOW_AI_NOTE && <span className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-white backdrop-blur">AI-generated image</span>}
      </button>
      {n > 1 && (
        <div className="mt-2 grid grid-cols-4 gap-2">
          {images.slice(1, 9).map((u, k) => (
            <button key={u} onClick={() => setI(k + 1)} className="overflow-hidden rounded-xl" aria-label={`Open photo ${k + 2}`}>
              <img src={u} alt="" loading="lazy" className="aspect-square w-full object-cover transition hover:scale-105" />
            </button>
          ))}
        </div>
      )}
      {SHOW_AI_NOTE && (
        <p role="note" className="mt-3 flex gap-2 rounded-xl border border-line bg-white p-3 text-xs leading-relaxed text-mute">
          <span aria-hidden className="font-bold text-gold">ⓘ</span>
          <span>These images are AI-generated for illustration and are not original photographs of the site. Details such as plot labels and status may not be current. Please contact us for actual photos or to arrange a site visit.</span>
        </p>
      )}
      <AnimatePresence>
        {i !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setI(null)}>
            <img src={images[i]} alt={`${name} photo ${i + 1}`} className="max-h-[85vh] max-w-full rounded-lg object-contain" onClick={(e) => e.stopPropagation()} />
            <button className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-2xl text-white" onClick={() => setI(null)} aria-label="Close">✕</button>
            {n > 1 && <>
              <button className="absolute left-3 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-2xl text-white" onClick={(e) => { e.stopPropagation(); setI((i - 1 + n) % n); }} aria-label="Previous photo">‹</button>
              <button className="absolute right-3 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-2xl text-white" onClick={(e) => { e.stopPropagation(); setI((i + 1) % n); }} aria-label="Next photo">›</button>
            </>}
            <span className="absolute bottom-4 text-sm text-white/80">{i + 1} / {n}{SHOW_AI_NOTE ? " · AI-generated image" : ""}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}