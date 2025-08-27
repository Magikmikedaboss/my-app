// components/BlogCardGrid.js
import Link from "next/link";
import SafeImage from "@/components/SafeImage";

export default function BlogCardGrid({ posts, title = "Latest from the Blog", showCta = false }) {
  return (
    <section id="blog" className="scroll-mt-24 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full bg-blue-600/10 px-3 py-1 text-blue-300">
            <span className="mr-2">🛠️</span> Handyman Tips & Updates
          </div>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">{title}</h2>
          <p className="mt-2 text-white/80">Quick DIY tips, seasonal maintenance, and service updates.</p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((p) => {
            const slug = p.slug || (p.id ? `post-${p.id}` : "post");
            const href = { pathname: `/blog/${slug}`, query: p.id ? { id: p.id } : undefined };
            return (
              <Link
                key={p.id || slug}
                href={href}
                className="rounded-xl overflow-hidden bg-white/5 ring-1 ring-white/10 hover:ring-white/20 transition"
              >
                <div className="relative w-full aspect-[16/9] bg-white/5">
                  {p.image && (
                    <SafeImage
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-white font-semibold line-clamp-2">{p.title}</h3>
                  {p.summary && <p className="mt-2 text-sm text-white/80 line-clamp-3">{p.summary}</p>}
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white/90">
                    Read more →
                  </span>
                </div>
              </Link>
            );
          })}

          {posts.length === 0 && (
            <div className="col-span-full rounded-xl bg-white/5 p-6 text-white/80">
              No posts found. Check <code>/api/blog-feed</code>.
            </div>
          )}
        </div>

        {showCta && (
          <div className="mt-6 text-center">
            <Link href="/blog" className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white">
              📚 View All Posts
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
