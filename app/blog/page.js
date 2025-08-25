export const metadata = { title: "Blog — Mike’s PRO Handyman" };

const posts = [
  { slug: "tools-every-homeowner", title: "🧰 5 Tools Every Homeowner Should Own", excerpt: "Build your basic repair kit." },
  { slug: "prep-for-summer", title: "☀️ Prep Your Home for Summer", excerpt: "Stay cool and efficient." },
  { slug: "seasonal-checklist", title: "🛠️ Seasonal Maintenance", excerpt: "Easy checklist to prevent issues." },
];

export default function BlogIndexPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-center sm:py-12">
      <h1 className="text-3xl font-bold text-blue-800 sm:text-4xl">Handyman Tips & Blog</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {posts.map(p => (
          <a key={p.slug} href={`/blog/${p.slug}`} className="block rounded-xl bg-white p-6 text-center ring-1 ring-blue-100 shadow-sm transition hover:-translate-y-0.5 hover:shadow">
            <h2 className="text-lg font-semibold text-blue-700">{p.title}</h2>
            <p className="mt-1 text-sm text-gray-600">{p.excerpt}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
