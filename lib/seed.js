// Starter sites from the rate-list poster. Rates are per sq yard (₹).
// Facilities, plot sizes and documents are intentionally empty: add the real ones in /admin.
const base = { plot_sizes: "", status: "available", description: "", facilities: [], documents: [], maps_url: "", images: [], published: true };
export const SEED = [
  { slug: "kshiraj-ganga-pride", name_hi: "क्षीराज गंगा प्राइड", name_en: "Kshiraj Ganga Pride", city: "Kanpur", location: "Ramnagar Sarsaul, Kanpur Nagar", rates: [6000] },
  { slug: "kshiraj-awas-yojana-2", name_hi: "क्षीराज आवास योजना -2", name_en: "Kshiraj Awas Yojana-2", city: "Unnao", location: "Era Bhadiyar, Karimabad, Unnao", rates: [4000, 5000, 8000] },
  { slug: "kshiraj-awas-yojana-3", name_hi: "क्षीराज आवास योजना -3", name_en: "Kshiraj Awas Yojana-3", city: "Unnao", location: "Era Bhadiyar, Karimabad, Unnao", rates: [3000] },
  { slug: "kshiraj-ganga-city-2", name_hi: "क्षीराज गंगा सिटी -2", name_en: "Kshiraj Ganga City-2", city: "Unnao", location: "Sikandarpur, Unnao", rates: [8000] },
  { slug: "kshiraj-maharaj-city-3-new", name_hi: "क्षीराज महाराज सिटी -3 न्यू", name_en: "Kshiraj Maharaj City-3 New", city: "Kanpur", location: "Maharajpur Rahnas, Kanpur Nagar", rates: [7000] },
  { slug: "kshiraj-chaubepur", name_hi: "क्षीराज चौबेपुर", name_en: "Kshiraj Chaubepur", city: "Kanpur", location: "Chaubepur Mariyani Shahpur Malha, Kanpur Nagar", rates: [15000, 9000] },
  { slug: "kshiraj-chaubepur-2", name_hi: "क्षीराज चौबेपुर -2", name_en: "Kshiraj Chaubepur-2", city: "Kanpur", location: "Chaubepur Mariyani Shahpur Malha, Kanpur Nagar", rates: [5500] },
  { slug: "kshiraj-navsrijan-nawabganj", name_hi: "क्षीराज नवसृजन नवाबगंज", name_en: "Kshiraj Navsrijan Nawabganj", city: "Unnao", location: "Nawabganj Toll Plaza, Unnao", rates: [16000] },
].map((s, i) => ({ ...base, ...s, sort: i }));
