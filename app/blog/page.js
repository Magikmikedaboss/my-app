export const revalidate = 600; // ISR, static + auto-regenerate

import Link from "next/link";
import { listPosts } from "@/lib/blog-source";

export default async function BlogIndex() {
  const posts = await listPosts(12);

  return (
    <main className="section">
      <div className="container-md">
        <h1 className="text-3xl font-bold text-white">Blog</h1>
        <p className="mt-1 text-white/80">Tips, updates, and how-tos.</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.id || p.slug} href={`/blog/${p.slug}?id=${encodeURIComponent(p.id || "")}`} className="card-glass p-0 overflow-hidden group">
              <div className="relative w-full aspect-[16/9] bg-white/5">
                {!!p.image && <img src={p.image} alt={p.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold line-clamp-2">{p.title}</h3>
                {!!p.summary && <p className="mt-2 text-sm text-white/85 line-clamp-3">{p.summary}</p>}
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white/90">Read more →</span>
              </div>
            </Link>
          ))}

          {posts.length === 0 && (
            <div className="col-span-full rounded-xl bg-white/5 p-6 text-white/80">
              No posts yet. Check <code>/api/blog-feed</code>.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
