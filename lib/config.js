// All business details in one place (taken from the visiting card).
export const site = {
  company: "Kshiraj Development Private Limited",
  tagline: "Your Land. Your Future.",
  person: "Ashwani Singh",
  role: "Sales Associate (Estate Business)",
  phone: "7985055080",
  whatsapp: "917985055080", // assumes +91
  website: "https://ashwanisingh-kshiraj.vercel.app",
  address: "Shyam Nagar, UP",
  cities: ["Kanpur", "Unnao"],
};
export const waLink = (text) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
