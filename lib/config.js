// Business details in one place. Company name follows the rate-list poster.
export const site = {
  company: "Kshiraj Developers India Pvt. Ltd.",
  tagline: "Your Land. Your Future.",
  person: "Ashwani Singh",
  phone: "7985055080",
  whatsapp: "917985055080", // assumes +91
  address: "Shyam Nagar, UP",
  offerEn: "Booking just ₹11,000",
  offerHi: "शेष आसान किस्तों में प्लॉट उपलब्ध",
};
export const waLink = (text) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
