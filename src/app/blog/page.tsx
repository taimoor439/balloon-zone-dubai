import Link from "next/link";

export const metadata = {
  title: "Blog | Balloon Zone Dubai",
  description: "Balloon decoration ideas, party tips and celebration inspiration from Balloon Zone Dubai.",
};

const POSTS = [
  {
    slug: "birthday-balloon-ideas-dubai",
    title: "🎂 7 Birthday Balloon Ideas That Make Any Dubai Party Unforgettable",
    date: "10 November 2026",
    excerpt:
      "From chrome-gold garlands to number balloons and personalised bouquets — the birthday looks Dubai families ask for most, and how to pick the right one for your space.",
    body: "A great birthday setup starts with one hero piece: a garland arch, a balloon wall, or a tall bouquet cluster. Keep the palette to two or three colours, add a number or letter balloon for the age, and let the cake table do the rest. Order before 6 PM and we deliver the same day, fully inflated.",
  },
  {
    slug: "baby-shower-balloon-decor-dubai",
    title: "🍼 Baby Shower Balloon Decor: Soft, Elegant and Photo-Ready",
    date: "4 November 2026",
    excerpt:
      "Pastel garlands, cloud-style clusters and a sweet welcome sign — how to style a baby shower that photographs beautifully without cluttering the room.",
    body: "For baby showers, less is more: soft blush, cream and sage with one statement arch behind the gift table. Foil balloons float for days, so they still look perfect in photos the morning after. Our Baby Shower Setup includes delivery and installation at your venue.",
  },
  {
    slug: "balloon-care-float-times",
    title: "🎈 How Long Do Helium Balloons Last? Care Tips for Dubai Weather",
    date: "28 October 2026",
    excerpt:
      "Latex vs foil, heat, sunlight and air-conditioning — what really decides how long your balloons float, and the simple care steps that add hours.",
    body: "Latex helium balloons typically float 8–12 hours; foil balloons can last 3–5 days or longer. Keep them indoors, away from direct sun and hot cars, and avoid over-handling. If a balloon arrives damaged, our delivery guarantee covers a replacement or refund.",
  },
];

export default function Blog() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="text-sm text-pine-600">🎈 Balloon Zone Dubai</p>
      <h1 className="font-serif text-4xl text-pine-900 mt-1">Blog — Party Ideas &amp; Balloon Inspiration</h1>
      <p className="text-stone-600 mt-2">Decoration ideas, care tips and celebration inspiration from our Dubai team.</p>
      <div className="mt-8 space-y-6">
        {POSTS.map((post) => (
          <article key={post.slug} className="rounded-2xl border bg-white p-6">
            <p className="text-xs text-stone-500">{post.date}</p>
            <h2 className="font-serif text-2xl text-pine-900 mt-1">{post.title}</h2>
            <p className="text-stone-700 mt-2">{post.excerpt}</p>
            <p className="text-sm text-stone-600 mt-2">{post.body}</p>
          </article>
        ))}
      </div>
      <p className="mt-8 text-center">
        <Link href="/shop" className="inline-block rounded-full bg-pine-800 text-white px-6 py-3 font-semibold">Shop balloons &amp; decorations →</Link>
      </p>
    </div>
  );
}
