// Mega-menu structure, rebuilt from Rank's screenshots of the real
// balloonzonedubai.com — same groups and items, our own theme.
// Every item links to a working shop filter. Items with no matching
// product fall back to /shop (never a dead/empty filter).

export type MenuItem = { label: string; emoji: string; href: string };
export type MenuGroup = {
  label: string;
  emoji: string;
  href: string;
  items: MenuItem[];
};

const shop = (params: string) => `/shop${params ? `?${params}` : ""}`;
const occ = (o: string) => shop(`occasion=${encodeURIComponent(o)}`);
const cat = (c: string) => shop(`category=${encodeURIComponent(c)}`);

export const MENU_GROUPS: MenuGroup[] = [
  {
    label: "Occasion",
    emoji: "🎉",
    href: "/shop",
    items: [
      { label: "Flag Day", emoji: "🇦🇪", href: occ("National Day") },
      { label: "Women's Day", emoji: "🌸", href: occ("Women's Day") },
      { label: "Happy New Year", emoji: "🎆", href: occ("New Year") },
      { label: "Valentine's Day", emoji: "❤️", href: occ("Valentine's Day") },
      { label: "Mother's Day", emoji: "💐", href: occ("Mother's Day") },
      { label: "Halloween", emoji: "🎃", href: "/shop" },
      { label: "Christmas", emoji: "🎄", href: "/shop" },
      { label: "World Cancer Day", emoji: "🎗️", href: "/shop" },
      { label: "National Day", emoji: "🇦🇪", href: occ("National Day") },
      { label: "Balloon Arrangements", emoji: "🎈", href: cat("Balloon Bouquets") },
      { label: "Decoration Packages", emoji: "✨", href: cat("Decoration Packages") },
    ],
  },
  {
    label: "Event Decoration",
    emoji: "🎊",
    href: cat("Decoration Packages"),
    items: [
      { label: "Happy Birthday", emoji: "🎂", href: occ("Birthday") },
      { label: "New Born", emoji: "👶", href: occ("Newborn") },
      { label: "Grand Opening", emoji: "🎉", href: "/shop" },
      { label: "Baby Shower", emoji: "🍼", href: occ("Baby Shower") },
      { label: "Surprise Room Decoration", emoji: "🎁", href: cat("Decoration Packages") },
      { label: "Wedding & Engagement", emoji: "💍", href: occ("Wedding") },
      { label: "Bride to Be", emoji: "👰", href: occ("Wedding") },
      { label: "Garland & Arches", emoji: "🌸", href: cat("Balloon Arches") },
      { label: "Graduation", emoji: "🎓", href: occ("Graduation") },
      { label: "Pool Decoration Setup", emoji: "🏊", href: "/shop" },
      { label: "Premium Flower Decoration", emoji: "🌹", href: cat("Flowers") },
    ],
  },
  {
    label: "All Balloon Types",
    emoji: "🎈",
    href: cat("Balloon Bouquets"),
    items: [
      { label: "Number Balloons", emoji: "🔢", href: "/shop" },
      { label: "Ceiling Balloons", emoji: "🎈", href: "/shop" },
      { label: "Custom Photo Balloons", emoji: "📸", href: "/shop" },
      { label: "Foil Balloon", emoji: "✨", href: cat("Balloon Bouquets") },
      { label: "Letter Balloons", emoji: "🔤", href: "/shop" },
      { label: "Orbz Balloons", emoji: "🫧", href: "/shop" },
      { label: "Latex Balloons", emoji: "🎈", href: cat("Balloon Bouquets") },
      { label: "Bubble Balloons", emoji: "🫧", href: "/shop" },
      { label: "Confetti Balloons", emoji: "🎊", href: "/shop" },
      { label: "Customized Balloons", emoji: "✏️", href: "/shop" },
      { label: "Helium Balloons", emoji: "🎈", href: cat("Balloon Bouquets") },
      { label: "Marble Balloons", emoji: "🎨", href: "/shop" },
    ],
  },
  {
    label: "Balloon Bouquets",
    emoji: "💐",
    href: cat("Balloon Bouquets"),
    items: [
      { label: "Thank You Bouquet", emoji: "🙏", href: occ("Thank You") },
      { label: "Love You Bouquet", emoji: "❤️", href: occ("Valentine's Day") },
      { label: "Good Luck Bouquet", emoji: "🍀", href: cat("Balloon Bouquets") },
      { label: "Get Well Soon Bouquet", emoji: "🌷", href: cat("Balloon Bouquets") },
      { label: "Welcome Back Bouquets", emoji: "👋", href: cat("Balloon Bouquets") },
      { label: "Anniversary Balloons", emoji: "💕", href: occ("Wedding") },
    ],
  },
  {
    label: "Flowers Dubai",
    emoji: "🌹",
    href: cat("Flowers"),
    items: [
      { label: "Rose", emoji: "🌹", href: cat("Flowers") },
      { label: "Tulips", emoji: "🌷", href: cat("Flowers") },
      { label: "Hydrangea", emoji: "💜", href: cat("Flowers") },
      { label: "Lilies", emoji: "🤍", href: cat("Flowers") },
    ],
  },
  {
    label: "Cakes & Sweets",
    emoji: "🍰",
    href: cat("Cakes & Sweets"),
    items: [
      { label: "Cream Cakes", emoji: "🎂", href: cat("Cakes & Sweets") },
      { label: "Customized Cakes", emoji: "🍰", href: cat("Cakes & Sweets") },
      { label: "Pastries & Cupcakes", emoji: "🧁", href: cat("Cakes & Sweets") },
    ],
  },
  {
    label: "Party Supplies",
    emoji: "🎉",
    href: cat("Party Supplies"),
    items: [
      { label: "Party Decorations", emoji: "🎊", href: cat("Decoration Packages") },
      { label: "Party Tableware", emoji: "🍽️", href: cat("Party Supplies") },
      { label: "Costumes", emoji: "🎭", href: cat("Party Supplies") },
    ],
  },
  {
    label: "Services",
    emoji: "🛎️",
    href: "/shop",
    items: [
      { label: "Balloon Printing", emoji: "🖨️", href: "/shop" },
      { label: "Balloon Drops & Releases", emoji: "🎈", href: "/shop" },
      { label: "Table & Chair Rental", emoji: "🪑", href: "/shop" },
      { label: "Light Decoration", emoji: "💡", href: "/shop" },
    ],
  },
  {
    label: "Sale",
    emoji: "🏷️",
    href: "/shop?sale=1",
    items: [],
  },
];
