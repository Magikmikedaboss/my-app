// app/api/blog-feed/route.js
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BLOG_ID = (process.env.BLOGGER_BLOG_ID || "").trim();
let KEY = (process.env.BLOGGER_API_KEY || "").trim();
KEY = KEY.replace(/^"+|"+$/g, "").replace(/^'+|'+$/g, "");

const looksLikeKey = /^AIza[0-9A-Za-z_\-]{20,}$/;

const truncate = (t = "", max = 160) => {
  t = t.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const last = cut.lastIndexOf(" ");
  return (last > 100 ? cut.slice(0, last) : cut).trim() + "…";
};

function deriveSlug(link = "", fallbackId = "") {
  try {
    const last = new URL(link).pathname.split("/").filter(Boolean).pop() || "";
    const slug = decodeURIComponent(last.replace(/\.html?$/i, "")).trim();
    if (slug) return slug;
  } catch {}
  // Guaranteed non-empty slug:
  return fallbackId ? `post-${fallbackId}` : `post-${Math.random().toString(36).slice(2, 8)}`;
}

export async function GET() {
  try {
    if (!BLOG_ID || !KEY) {
      return new Response(JSON.stringify({ ok: false, error: "Missing env: BLOGGER_BLOG_ID or BLOGGER_API_KEY" }), {
        status: 500, headers: { "Content-Type": "application/json" }
      });
    }
    if (!looksLikeKey.test(KEY)) {
      return new Response(JSON.stringify({ ok: false, error: "BLOGGER_API_KEY format looks wrong." }), {
        status: 500, headers: { "Content-Type": "application/json" }
      });
    }

    const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts?key=${encodeURIComponent(KEY)}&maxResults=12&orderBy=published`;
    const r = await fetch(url, { cache: "no-store" });
    const text = await r.text();

    if (!r.ok) {
      let msg = text; try { msg = JSON.parse(text)?.error?.message || text; } catch {}
      return new Response(JSON.stringify({ ok: false, status: r.status, error: msg }), {
        status: 502, headers: { "Content-Type": "application/json" }
      });
    }

    const data = JSON.parse(text);
    const posts = (data.items || []).map((it) => {
      const html = it.content || "";
      const link = it.url || "";
      const id = it.id || "";

      const slug = deriveSlug(link, id);

      const img = html.match(/<img[^>]+src=['"]([^'"]+)['"]/i)?.[1] || "";
      const image = img ? img.replace(/\/s\d{2,4}\//, "/s1200/") : "";
      const summary = truncate(html.replace(/<[^>]*>/g, " "));

      return { id, title: it.title || "Untitled", slug, summary, image, link, published: it.published };
    });

    return new Response(JSON.stringify({ ok: true, posts }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 502, headers: { "Content-Type": "application/json" },
    });
  }
}
