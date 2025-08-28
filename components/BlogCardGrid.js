import Link from "next/link";
import Image from "next/image";
export default function BlogCardGrid({ posts = [], showCta = false }) {
  return (
    <section id="blog" className="scroll-mt-24 py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <div className="inline-flex items-center rounded-full bg-blue-600/10 px-3 py-1 text-blue-300">
            <span className="mr-2">🛠️</span> Handyman Tips & Updates
          </div>
          <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-white">Latest from the Blog</h2>
          <p className="mt-2 text-white/80">Quick DIY tips, seasonal maintenance, and service updates.</p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.id || p.slug}
              href={`/blog/${p.slug}${p.id ? `?id=${encodeURIComponent(p.id)}` : ""}`}
              className="rounded-2xl overflow-hidden bg-white/5 ring-1 ring-white/10 hover:ring-white/20 transition block"
            >
              <div className="relative w-full aspect-[16/9] bg-white/5">
                {p.image && (
                  <Image
                    alt={p.title}
                    src={p.image}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    priority={false}
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
          ))}

          {posts.length === 0 && (
            <div className="col-span-full rounded-xl bg-white/5 p-6 text-white/80">
              No posts yet. Check <code>/api/blog-feed</code>.
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
