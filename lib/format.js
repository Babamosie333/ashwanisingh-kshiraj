export const inr = (n) => "₹" + Number(n).toLocaleString("en-IN");
export const rateText = (r) => (r || []).slice().sort((a, b) => a - b).map(inr).join(", ");
export const STATUS = {
  available: ["Available", "bg-leaf text-white"],
  selling_fast: ["Selling fast", "bg-gold text-[#1b1405]"],
  sold_out: ["Sold out", "bg-mute text-white"],
};
export const slugify = (s) => (s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
