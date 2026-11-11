export type Product = {
  slug: string;
  name: string;
  price: number;
  wasPrice?: number;
  category: string;
  occasion: string;
  image: string;
  blurb: string;
  verified: boolean; // true = price seen live on balloonzonedubai.com, 11 Nov 2026
  badge?: string;
};

// Images are Unsplash balloon / celebration photos (remote, with a dark-green
// gradient fallback behind them). Prices marked verified:true were seen live
// in the audit; others are labelled “Demo price” on the site.
const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const PRODUCTS: Product[] = [
  { slug: "luxury-birthday-gala-package", name: "Luxury Birthday Gala Package", price: 1300, category: "Decoration Packages", occasion: "Birthday", image: img("photo-1530103862676-de8c9debad1d"), blurb: "Full gala balloon decoration, delivered and installed in Dubai.", verified: true, badge: "Bestseller" },
  { slug: "classic-cocoa-birthday-cake", name: "Classic Cocoa Birthday Cake", price: 190, category: "Cakes & Sweets", occasion: "Birthday", image: img("photo-1578985545062-69928b1d9587"), blurb: "Rich cocoa cake, made for birthdays and every sweet celebration.", verified: true },
  { slug: "blush-glow-ring-package", name: "Blush & Glow Ring Package", price: 1200, category: "Decoration Packages", occasion: "Proposal", image: img("photo-1519741497674-611481863552"), blurb: "Blush and glow ring setup for proposals and romantic moments.", verified: true },
  { slug: "glow-garland-package", name: "Glow & Garland Package", price: 1000, category: "Decoration Packages", occasion: "Birthday", image: img("photo-1513151233558-d860c5398176"), blurb: "Glowing garland arrangement for birthdays and evening parties.", verified: true },
  { slug: "baby-shower-setup", name: "Baby Shower Setup", price: 1045, category: "Decoration Packages", occasion: "Baby Shower", image: img("photo-1519689680058-324335c77eba"), blurb: "Soft, elegant baby-shower balloon decoration, installed at your venue.", verified: true, badge: "Popular" },
  { slug: "graduation-setup", name: "Graduation Setup", price: 1330, category: "Decoration Packages", occasion: "Graduation", image: img("photo-1523050854058-8df90110c9f1"), blurb: "Graduation balloon setup for schools, universities and home parties.", verified: true },
  { slug: "new-year-balloon-decoration", name: "New Year Balloon Decoration", price: 3200, category: "Decoration Packages", occasion: "New Year", image: img("photo-1498931299472-f7a63a5a1cfa"), blurb: "Large New Year balloon decoration with numbers and gold accents.", verified: true },
  { slug: "love-story-bride-to-be-setup", name: "Love Story Bride To Be Setup", price: 540, wasPrice: 600, category: "Decoration Packages", occasion: "Wedding", image: img("photo-1519225421980-715cb0215aed"), blurb: "Bride-to-be balloon setup in soft whites and blush.", verified: true, badge: "Sale" },
  { slug: "speed-racer-birthday-balloon-set", name: "Speed Racer Birthday Balloon Set", price: 240, wasPrice: 300, category: "Balloon Bouquets", occasion: "Birthday", image: img("photo-1558008258-3256797b43f3"), blurb: "Race-themed balloon set for a fast, fun birthday.", verified: true, badge: "Sale" },
  { slug: "little-star-baby-welcome-package", name: "Little Star Baby Welcome Balloon Package", price: 1104, wasPrice: 1200, category: "Balloon Bouquets", occasion: "Newborn", image: img("photo-1555009393-f20bdb245c4d"), blurb: "Welcome-home balloon package for a new baby.", verified: true, badge: "Sale" },
  { slug: "happy-new-year-decoration", name: "Happy New Year Decoration", price: 2772, wasPrice: 2800, category: "Decoration Packages", occasion: "New Year", image: img("photo-1514525253161-7a46d19cd819"), blurb: "Festive New Year decoration, delivered and installed.", verified: true },
  { slug: "uae-flag-day-arch", name: "UAE Flag Day Arch", price: 550, category: "Balloon Arches", occasion: "National Day", image: img("photo-1530103862676-de8c9debad1d"), blurb: "UAE Flag Day balloon arch in red, green, white and black.", verified: true },
  { slug: "rose-gold-birthday-bouquet", name: "Rose Gold Birthday Bouquet", price: 210, category: "Balloon Bouquets", occasion: "Birthday", image: img("photo-1527529482837-4698179dc6ce"), blurb: "Rose-gold helium bouquet — a demo listing within the verified bouquet range (AED 90–495).", verified: false },
  { slug: "butterfly-wings-party-set", name: "Butterfly Wings Set — Kid's Costume Party", price: 15, category: "Party Supplies", occasion: "Birthday", image: img("photo-1504196606672-aef5c9cefc92"), blurb: "Butterfly wings for a kid's costume party.", verified: true },
];

export const OCCASIONS = [
  { name: "Birthday", image: "photo-1530103862676-de8c9debad1d" },
  { name: "Baby Shower", image: "photo-1519689680058-324335c77eba" },
  { name: "Wedding", image: "photo-1519225421980-715cb0215aed" },
  { name: "Proposal", image: "photo-1519741497674-611481863552" },
  { name: "Newborn", image: "photo-1555009393-f20bdb245c4d" },
  { name: "Graduation", image: "photo-1523050854058-8df90110c9f1" },
  { name: "New Year", image: "photo-1498931299472-f7a63a5a1cfa" },
  { name: "National Day", image: "photo-1514525253161-7a46d19cd819" },
];

export const COLOURS = [
  { name: "Chrome Gold", hex: "#c9a227" }, { name: "Rose Gold", hex: "#b76e79" },
  { name: "Chrome Silver", hex: "#c0c0c0" }, { name: "Pearl White", hex: "#f5f0e6" },
  { name: "Blush Pink", hex: "#f4c2c2" }, { name: "Burgundy", hex: "#7a1e2b" },
  { name: "Pine Green", hex: "#123f31" }, { name: "Royal Blue", hex: "#1e3a8a" },
  { name: "Ice Blue", hex: "#a5d8ff" }, { name: "Lilac", hex: "#c8a2c8" },
  { name: "Black", hex: "#111111" }, { name: "Gold Confetti", hex: "#e6c200" },
];

export const AGES = ["1", "5", "10", "16", "18", "21", "25", "30", "40", "50", "60"];

export const EXTRAS = [
  { id: "extra-1", label: "1 Party Extra", price: 9 },
  { id: "extra-3", label: "3 Party Extras", price: 27 },
  { id: "extra-5", label: "5 Party Extras", price: 45 },
  { id: "extra-10", label: "10 Party Extras", price: 90 },
];

export function formatAED(n: number) {
  return `AED ${n.toLocaleString("en-AE")}`;
}
export function countByOccasion(name: string) {
  return PRODUCTS.filter((p) => p.occasion === name).length;
}
