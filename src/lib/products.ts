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
  description: string[]; // two short paragraphs, shown on the product page
  suitableFor: string[];
  includes: string[];
};

// Images are Unsplash balloon / celebration photos (remote, with a dark-green
// gradient fallback behind them). Prices marked verified:true were seen live
// in the audit; others are labelled “Demo price” on the site.
const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const PRODUCTS: Product[] = [
  { slug: "luxury-birthday-gala-package", name: "Luxury Birthday Gala Package", price: 1300, category: "Decoration Packages", occasion: "Birthday", image: img("photo-1530103862676-de8c9debad1d"), blurb: "Full gala balloon decoration, delivered and installed in Dubai.", verified: true, badge: "Bestseller",
    description: [
      "Make the birthday feel like a gala. Our Luxury Birthday Gala Package turns your venue into a show-stopping celebration, with a full balloon garland in rich party colours, a photo-worthy backdrop and elegant foil accents that set the scene the moment guests walk in.",
      "Our team delivers and installs everything at your home, hotel or venue in Dubai, then styles the final details so the setup looks picture-perfect from every angle. Order before 6 PM for same-day delivery, and let us handle the decorating while you enjoy the party.",
    ],
    suitableFor: ["Milestone birthdays", "Hotel and villa parties", "Birthday dinners and gatherings", "Photo shoots and reels", "Surprise birthday celebrations"],
    includes: ["Full balloon garland in party colours", "Decorated backdrop for photos", "Foil number and accent balloons", "Table and entrance styling", "Delivery and professional installation in Dubai"] },
  { slug: "classic-cocoa-birthday-cake", name: "Classic Cocoa Birthday Cake", price: 190, category: "Cakes & Sweets", occasion: "Birthday", image: img("photo-1578985545062-69928b1d9587"), blurb: "Rich cocoa cake, made for birthdays and every sweet celebration.", verified: true,
    description: [
      "A birthday classic, done properly. Our Classic Cocoa Birthday Cake is rich, moist and deeply chocolatey, baked fresh and finished with smooth cocoa frosting for a cake that looks as good as it tastes.",
      "It arrives ready to serve at your celebration, carefully packed and delivered in Dubai. Order before 6 PM for same-day delivery and add a candle moment your guests will remember.",
    ],
    suitableFor: ["Birthday parties", "Family gatherings", "Office birthday surprises", "Cake-cutting moments", "Chocolate lovers of all ages"],
    includes: ["Freshly baked cocoa birthday cake", "Smooth cocoa frosting finish", "Decorative cake topper", "Careful gift packaging", "Same-day delivery in Dubai"] },
  { slug: "blush-glow-ring-package", name: "Blush & Glow Ring Package", price: 1200, category: "Decoration Packages", occasion: "Proposal", image: img("photo-1519741497674-611481863552"), blurb: "Blush and glow ring setup for proposals and romantic moments.", verified: true,
    description: [
      "Pop the question in front of a ring that glows. The Blush & Glow Ring Package frames the moment with a beautiful balloon ring in soft blush tones, warm glowing accents and romantic styling made for proposals.",
      "Our team sets it up at your chosen spot — a hotel room, a villa garden or a restaurant corner — so all you have to do is ask. Same-day delivery is available for orders before 6 PM.",
    ],
    suitableFor: ["Marriage proposals", "Romantic surprises", "Anniversary celebrations", "Engagement photos", "Hotel room setups"],
    includes: ["Blush balloon ring installation", "Warm glow lighting accents", "Romantic floor and table styling", "Foil heart accents", "Delivery and professional setup in Dubai"] },
  { slug: "glow-garland-package", name: "Glow & Garland Package", price: 1000, category: "Decoration Packages", occasion: "Birthday", image: img("photo-1513151233558-d860c5398176"), blurb: "Glowing garland arrangement for birthdays and evening parties.", verified: true,
    description: [
      "Light up the evening. The Glow & Garland Package pairs a lush balloon garland with warm glowing accents, turning an ordinary room into a party space that photographs beautifully after dark.",
      "Perfect for birthday evenings and garden parties, the setup is delivered and installed by our team in Dubai. Order before 6 PM for same-day delivery.",
    ],
    suitableFor: ["Evening birthday parties", "Garden and villa celebrations", "Dinner parties", "Photo backdrops", "Teen and adult birthdays"],
    includes: ["Full glowing balloon garland", "Warm light accents", "Matching foil balloons", "Entrance and table styling", "Delivery and installation in Dubai"] },
  { slug: "baby-shower-setup", name: "Baby Shower Setup", price: 1045, category: "Decoration Packages", occasion: "Baby Shower", image: img("photo-1519689680058-324335c77eba"), blurb: "Soft, elegant baby-shower balloon decoration, installed at your venue.", verified: true, badge: "Popular",
    description: [
      "Soft, sweet and made for the mum-to-be. Our Baby Shower Setup brings gentle pastels, cloud-soft balloons and a pretty photo backdrop together for a celebration she will always remember.",
      "Our team delivers and installs the full setup at your home or venue in Dubai, styled and ready before your guests arrive. Order before 6 PM for same-day delivery.",
    ],
    suitableFor: ["Baby showers", "Gender reveal parties", "Mum-to-be surprises", "Family gatherings", "Photo sessions"],
    includes: ["Pastel balloon garland", "Baby shower photo backdrop", "Foil baby-themed accents", "Table and gift-area styling", "Delivery and professional installation in Dubai"] },
  { slug: "graduation-setup", name: "Graduation Setup", price: 1330, category: "Decoration Packages", occasion: "Graduation", image: img("photo-1513151233558-d860c5398176"), blurb: "Graduation balloon setup for schools, universities and home parties.", verified: true,
    description: [
      "Celebrate the graduate in style. Our Graduation Setup features a bold balloon display with graduation caps, stars and your school colours, made for proud photos with family and friends.",
      "We deliver and install it at your home, school or university venue in Dubai, so the stage is set before the celebration begins. Order before 6 PM for same-day delivery.",
    ],
    suitableFor: ["Graduation parties", "School and university ceremonies", "Family celebrations", "Graduation photo shoots", "Farewell gatherings"],
    includes: ["Graduation-themed balloon display", "Foil graduation cap and star accents", "Photo backdrop area", "Entrance and table styling", "Delivery and professional installation in Dubai"] },
  { slug: "new-year-balloon-decoration", name: "New Year Balloon Decoration", price: 3200, category: "Decoration Packages", occasion: "New Year", image: img("photo-1498931299472-f7a63a5a1cfa"), blurb: "Large New Year balloon decoration with numbers and gold accents.", verified: true,
    description: [
      "Ring in the New Year with a showpiece. Our New Year Balloon Decoration is a large, festive installation in gold and midnight tones, with sparkling numbers and statement balloons that make the countdown unforgettable.",
      "Designed for homes, hotels and corporate parties, our team delivers and installs the full display in Dubai, ready before your guests arrive. Order before 6 PM for same-day delivery.",
    ],
    suitableFor: ["New Year's Eve parties", "Hotel and corporate celebrations", "Countdown events", "Family gatherings", "Photo moments at midnight"],
    includes: ["Large New Year balloon installation", "Gold foil number balloons", "Sparkling accent balloons", "Entrance and stage styling", "Delivery and professional installation in Dubai"] },
  { slug: "love-story-bride-to-be-setup", name: "Love Story Bride To Be Setup", price: 540, wasPrice: 600, category: "Decoration Packages", occasion: "Wedding", image: img("photo-1519225421980-715cb0215aed"), blurb: "Bride-to-be balloon setup in soft whites and blush.", verified: true, badge: "Sale",
    description: [
      "A soft, romantic setup for the bride-to-be. Whites, blush and gold balloons come together with delicate styling for a bridal shower she will love.",
      "Our team delivers and installs everything at your home or venue in Dubai, with a photo corner ready for her and her bridesmaids. Order before 6 PM for same-day delivery.",
    ],
    suitableFor: ["Bridal showers", "Hen parties", "Engagement celebrations", "Bride-to-be surprises", "Photo sessions with the bridal party"],
    includes: ["Blush and white balloon garland", "Bride-to-be foil accents", "Photo corner styling", "Table decoration", "Delivery and professional installation in Dubai"] },
  { slug: "speed-racer-birthday-balloon-set", name: "Speed Racer Birthday Balloon Set", price: 240, wasPrice: 300, category: "Balloon Bouquets", occasion: "Birthday", image: img("photo-1558008258-3256797b43f3"), blurb: "Race-themed balloon set for a fast, fun birthday.", verified: true, badge: "Sale",
    description: [
      "Start your engines — this race-themed balloon set is built for a fast, fun birthday. Bold reds, blacks and checkered accents bring the racetrack to the party table.",
      "The set arrives fully inflated and ready to display, delivered in Dubai. Order before 6 PM for same-day delivery and let the birthday racer take pole position.",
    ],
    suitableFor: ["Kids' birthday parties", "Race-car themed parties", "Party table displays", "Birthday photo moments", "Surprise deliveries"],
    includes: ["Race-themed helium balloon bouquet", "Checkered flag foil accents", "Matching latex balloons", "Balloon weights and ribbons", "Fully inflated delivery in Dubai"] },
  { slug: "little-star-baby-welcome-package", name: "Little Star Baby Welcome Balloon Package", price: 1104, wasPrice: 1200, category: "Balloon Bouquets", occasion: "Newborn", image: img("photo-1555009393-f20bdb245c4d"), blurb: "Welcome-home balloon package for a new baby.", verified: true, badge: "Sale",
    description: [
      "Welcome the little star home. This gentle balloon package in soft pastels and starry accents turns the first homecoming into a moment the whole family will treasure.",
      "Our team delivers and installs the display at your home in Dubai, ready before mum and baby arrive. Order before 6 PM for same-day delivery.",
    ],
    suitableFor: ["Welcome-home celebrations", "New baby announcements", "Hospital room surprises", "Family gatherings", "Newborn photo shoots"],
    includes: ["Pastel welcome-home balloon display", "Foil star and moon accents", "Baby-themed balloon bouquet", "Entrance and nursery styling", "Delivery and professional installation in Dubai"] },
  { slug: "happy-new-year-decoration", name: "Happy New Year Decoration", price: 2772, wasPrice: 2800, category: "Decoration Packages", occasion: "New Year", image: img("photo-1514525253161-7a46d19cd819"), blurb: "Festive New Year decoration, delivered and installed.", verified: true,
    description: [
      "Welcome the New Year with sparkle. This festive decoration brings gold, silver and midnight balloons together for a party-ready display that shines all night long.",
      "Our team delivers and installs it at your home, hotel or venue in Dubai, so you can focus on the countdown. Order before 6 PM for same-day delivery.",
    ],
    suitableFor: ["New Year's Eve parties", "Corporate celebrations", "Hotel events", "Family countdowns", "Midnight photo moments"],
    includes: ["Festive New Year balloon display", "Gold and silver foil balloons", "Sparkling number accents", "Entrance and table styling", "Delivery and professional installation in Dubai"] },
  { slug: "uae-flag-day-arch", name: "UAE Flag Day Arch", price: 550, category: "Balloon Arches", occasion: "National Day", image: img("photo-1530103862676-de8c9debad1d"), blurb: "UAE Flag Day balloon arch in red, green, white and black.", verified: true,
    description: [
      "Show your UAE pride. This balloon arch in the colours of the UAE flag — red, green, white and black — makes a proud statement at Flag Day celebrations, schools and offices.",
      "Built sturdy and delivered fully inflated in Dubai, the arch is ready to welcome guests and frame your photos. Order before 6 PM for same-day delivery.",
    ],
    suitableFor: ["UAE Flag Day celebrations", "National Day events", "School assemblies", "Office decorations", "Community gatherings"],
    includes: ["Balloon arch in UAE flag colours", "Sturdy arch frame", "Matching entrance styling", "Fully inflated balloons", "Delivery in Dubai"] },
  { slug: "rose-gold-birthday-bouquet", name: "Rose Gold Birthday Bouquet", price: 210, category: "Balloon Bouquets", occasion: "Birthday", image: img("photo-1527529482837-4698179dc6ce"), blurb: "Rose-gold helium bouquet — a demo listing within the verified bouquet range (AED 90–495).", verified: false,
    description: [
      "Pretty in rose gold. This helium bouquet mixes rose-gold foil balloons with soft blush latex for a birthday gift that looks expensive and feels personal.",
      "It arrives fully inflated and ready to gift, delivered in Dubai. Order before 6 PM for same-day delivery and make their birthday shine.",
    ],
    suitableFor: ["Birthday gifts", "Surprise deliveries", "Girlfriend and wife birthdays", "Teen birthdays", "Hotel room surprises"],
    includes: ["Rose-gold foil balloons", "Blush latex balloons", "Helium-filled and fully inflated", "Balloon weight and ribbons", "Same-day delivery in Dubai"] },
  { slug: "butterfly-wings-party-set", name: "Butterfly Wings Set — Kid's Costume Party", price: 15, category: "Party Supplies", occasion: "Birthday", image: img("photo-1504196606672-aef5c9cefc92"), blurb: "Butterfly wings for a kid's costume party.", verified: true,
    description: [
      "Little wings, big smiles. This butterfly wings set turns any child into the star of the costume party, with colourful wings that are light, comfortable and ready to wear.",
      "A sweet, simple addition to a birthday outfit or a party favour bag — delivered in Dubai with your order. Order before 6 PM for same-day delivery.",
    ],
    suitableFor: ["Kids' costume parties", "Birthday outfits", "Fairy and butterfly themes", "Party favours", "Dress-up play"],
    includes: ["Colourful butterfly wings", "Comfortable elastic straps", "Lightweight party-ready design", "Gift-ready packaging", "Same-day delivery in Dubai"] },
  // Demo listings added Nov 2026 so the new mega-menu filters (flowers,
  // bouquets, cakes) have products to show. Prices are NOT verified live.
  { slug: "thank-you-balloon-bouquet", name: "Thank You Balloon Bouquet", price: 150, category: "Balloon Bouquets", occasion: "Thank You", image: img("photo-1527529482837-4698179dc6ce"), blurb: "A warm thank-you in balloons — soft golds and cream, ready to gift.", verified: false,
    description: [
      "Say thank you in balloons. Warm golds and soft cream balloons make this bouquet a thoughtful way to show gratitude — brighter than flowers and twice as memorable.",
      "It arrives fully inflated and ready to gift, delivered in Dubai. Order before 6 PM for same-day delivery.",
    ],
    suitableFor: ["Thank-you gifts", "Teacher appreciation", "Client gifts", "Hostess gifts", "Get-well surprises"],
    includes: ["Gold and cream helium balloons", "Thank-you foil accent", "Balloon weight and ribbons", "Gift-ready presentation", "Same-day delivery in Dubai"] },
  { slug: "love-you-rose-bouquet", name: "Love You Rose Bouquet", price: 220, category: "Balloon Bouquets", occasion: "Valentine's Day", image: img("photo-1519741497674-611481863552"), blurb: "Romantic rose and balloon bouquet for Valentine's Day and anniversaries.", verified: false,
    description: [
      "Roses and balloons, made for romance. The Love You Rose Bouquet pairs fresh roses with heart balloons for a Valentine's gift that says it all.",
      "It arrives beautifully arranged and ready to gift, delivered in Dubai. Order before 6 PM for same-day delivery — perfect for Valentine's Day, anniversaries and just because.",
    ],
    suitableFor: ["Valentine's Day", "Anniversaries", "Romantic surprises", "Proposals", "Just-because gifts"],
    includes: ["Fresh roses", "Heart-shaped foil balloons", "Romantic gift wrapping", "Balloon weight and ribbons", "Same-day delivery in Dubai"] },
  { slug: "fresh-rose-flower-box", name: "Fresh Rose Flower Box", price: 260, category: "Flowers", occasion: "Mother's Day", image: img("photo-1519225421980-715cb0215aed"), blurb: "Fresh roses arranged in a keepsake box — a classic Mother's Day gift.", verified: false,
    description: [
      "A box of roses she will keep. Fresh roses arranged in an elegant keepsake box make a timeless gift — beautiful on the day, and a lovely box to keep afterwards.",
      "Each box is arranged fresh and delivered in Dubai. Order before 6 PM for same-day delivery.",
    ],
    suitableFor: ["Mother's Day", "Birthday gifts", "Thank-you gifts", "Anniversaries", "Apology gifts"],
    includes: ["Fresh roses", "Elegant keepsake box", "Gift-ready presentation", "Care card", "Same-day delivery in Dubai"] },
  { slug: "tulip-and-lily-flower-bouquet", name: "Tulip & Lily Flower Bouquet", price: 240, category: "Flowers", occasion: "Women's Day", image: img("photo-1561181286-d3fee7d55364"), blurb: "Bright tulips and lilies for Women's Day and every celebration of her.", verified: false,
    description: [
      "Bright, joyful and full of life. Tulips and lilies in cheerful colours make this bouquet a celebration of her — perfect for Women's Day, birthdays and every moment she deserves flowers.",
      "Freshly arranged and delivered in Dubai, ready to gift. Order before 6 PM for same-day delivery.",
    ],
    suitableFor: ["Women's Day", "Birthday gifts", "Mother's Day", "Congratulations", "Just-because flowers"],
    includes: ["Fresh tulips and lilies", "Hand-tied bouquet", "Gift wrapping", "Water pack for freshness", "Same-day delivery in Dubai"] },
  { slug: "cream-celebration-cake", name: "Cream Celebration Cake", price: 230, category: "Cakes & Sweets", occasion: "Birthday", image: img("photo-1578985545062-69928b1d9587"), blurb: "Soft cream cake, made to order for birthdays and family gatherings.", verified: false,
    description: [
      "Soft, sweet and made to share. Our Cream Celebration Cake is light, creamy and finished with smooth frosting — a crowd-pleaser at birthdays and family gatherings.",
      "Baked to order and delivered fresh in Dubai, ready to cut and serve. Order before 6 PM for same-day delivery.",
    ],
    suitableFor: ["Birthday parties", "Family gatherings", "Office celebrations", "Cake-cutting moments", "Dessert tables"],
    includes: ["Freshly baked cream cake", "Smooth cream frosting", "Decorative finish", "Careful cake packaging", "Same-day delivery in Dubai"] },
  { slug: "pastries-and-cupcakes-box", name: "Pastries & Cupcakes Box", price: 120, category: "Cakes & Sweets", occasion: "Birthday", image: img("photo-1486427944299-d1955d23e34d"), blurb: "A box of pastries and cupcakes to share at the party table.", verified: false,
    description: [
      "A little bit of everything sweet. This box of pastries and cupcakes is made for sharing — set it on the party table and watch it disappear.",
      "Freshly baked and delivered in Dubai, ready to serve. Order before 6 PM for same-day delivery.",
    ],
    suitableFor: ["Party tables", "Birthday celebrations", "Office treats", "Family gatherings", "Dessert spreads"],
    includes: ["Assorted pastries", "Fresh cupcakes", "Party-ready gift box", "Serving-ready presentation", "Same-day delivery in Dubai"] },
];

export const OCCASIONS = [
  { name: "Birthday", image: "photo-1530103862676-de8c9debad1d" },
  { name: "Baby Shower", image: "photo-1519689680058-324335c77eba" },
  { name: "Wedding", image: "photo-1519225421980-715cb0215aed" },
  { name: "Proposal", image: "photo-1519741497674-611481863552" },
  { name: "Newborn", image: "photo-1555009393-f20bdb245c4d" },
  { name: "Graduation", image: "photo-1513151233558-d860c5398176" },
  { name: "New Year", image: "photo-1498931299472-f7a63a5a1cfa" },
  { name: "National Day", image: "photo-1514525253161-7a46d19cd819" },
  { name: "Valentine's Day", image: "photo-1519741497674-611481863552" },
  { name: "Mother's Day", image: "photo-1519225421980-715cb0215aed" },
  { name: "Women's Day", image: "photo-1561181286-d3fee7d55364" },
  { name: "Thank You", image: "photo-1527529482837-4698179dc6ce" },
];

export function formatAED(n: number) {
  return `AED ${n.toLocaleString("en-AE")}`;
}
export function countByOccasion(name: string) {
  return PRODUCTS.filter((p) => p.occasion === name).length;
}
