// app/blog/[slug]/page.js
import { notFound } from "next/navigation";

export const revalidate = 1800;

const BLOG_ID = process.env.BLOGGER_BLOG_ID;
const KEY = process.env.BLOGGER_API_KEY;

const api = (path) =>
  `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}${path}${path.includes("?") ? "&" : "?"}key=${KEY}`;

function urlToSlug(u = "") {
  try {
    const last = new URL(u).pathname.split("/").filter(Boolean).pop() || "";
    return decodeURIComponent(last.replace(/\.html?$/i, ""));
  } catch { return ""; }
}

function idFromFallbackSlug(slug = "") {
  // supports our API fallback "post-<id>"
  const m = slug.match(/^post-(\d+)$/);
  return m ? m[1] : null;
}

async function fetchById(id) {
  if (!id) return null;
  const r = await fetch(api(`/posts/${id}`), { cache: "no-store" });
  if (!r.ok) return null;
  return r.json();
}

async function fetchBySlug(slug) {
  const r = await fetch(api(`/posts?maxResults=100&orderBy=published`), { cache: "no-store" });
  if (!r.ok) return null;
  const data = await r.json();
  return (data.items || []).find((it) => urlToSlug(it.url) === slug) || null;
}

export default async function BlogPost({ params, searchParams }) {
  if (!BLOG_ID || !KEY) {
    return <div className="mx-auto max-w-3xl px-4 py-10 text-white/90">Missing API credentials.</div>;
  }

  // Prefer explicit ?id=; else derive id from slug like "post-<id>"; else search by slug
  const idFromQuery = searchParams?.id || null;
  const idFromSlug = idFromFallbackSlug(params.slug);
  const item =
    (idFromQuery && (await fetchById(idFromQuery))) ||
    (idFromSlug && (await fetchById(idFromSlug))) ||
    (await fetchBySlug(params.slug));

  if (!item) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-white">{item.title}</h1>
      <div
        className="prose prose-invert max-w-none mt-6
                   prose-headings:text-white prose-a:text-blue-300 hover:prose-a:text-blue-200
                   prose-img:rounded-xl prose-img:mx-auto prose-figcaption:text-white/70
                   prose-hr:border-white/10"
        dangerouslySetInnerHTML={{ __html: item.content || "" }}
      />
    </article>
  );
}
