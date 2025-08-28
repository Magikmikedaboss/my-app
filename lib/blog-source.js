// lib/blog-source.js
const BID = process.env.BLOGGER_BLOG_ID;
const KEY = process.env.BLOGGER_API_KEY;
const BLOGGER_SITE = (process.env.NEXT_PUBLIC_BLOGGER_URL || "https://fixitwithmikelasvegas.blogspot.com").replace(/\/$/, "");
const RSS_URL = `${BLOGGER_SITE}/feeds/posts/default?alt=rss&max-results=20`;

const strip = (h = "") => h.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const truncate = (t = "", max = 160) => {
  t = strip(t);
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  const last = cut.lastIndexOf(" ");
  return (last > 100 ? cut.slice(0, last) : cut) + "…";
};
const firstImg = (html = "") => html.match(/<img[^>]+src=['"]([^'"]+)['"]/i)?.[1]?.replace(/\/s\d{2,4}\//, "/s1200/") || "";
const slugFromLink = (link = "") => {
  try {
    const u = new URL(link);
    const last = u.pathname.split("/").filter(Boolean).pop() || "";
    return decodeURIComponent(last.replace(/\.html?$/i, "")) || "post";
  } catch { return "post"; }
};
export const sanitize = (html = "") =>
  html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/\son\w+=["'][^"']*["']/gi, "");

async function viaApiList() {
  if (!BID || !KEY) throw new Error("Missing BLOGGER envs");
  const r = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BID}/posts?key=${KEY}&maxResults=20&orderBy=published`, { cache: "no-store" });
  if (!r.ok) throw new Error(`API HTTP ${r.status}`);
  const data = await r.json();
  return (data.items || []).map((it) => {
    const html = it.content || "";
    return {
      id: it.id,
      title: it.title || "Untitled",
      slug: slugFromLink(it.url || ""),
      summary: truncate(html),
      image: firstImg(html),
      link: it.url || "",
      published: it.published || null,
      content: html,
    };
  });
}

function parseRss(xml) {
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || xml.match(/<entry[\s\S]*?<\/entry>/gi) || [];
  return blocks.map((b) => {
    const pick = (re) => (b.match(re) || [,""])[1];
    const link =
      pick(/<link>([\s\S]*?)<\/link>/i) ||
      (b.match(/<link[^>]*rel=['"]alternate['"][^>]*href=['"]([^'"]+)['"]/i)?.[1] || "");
    const content =
      pick(/<content:encoded[^>]*>([\s\S]*?)<\/content:encoded>/i) ||
      pick(/<content[^>]*>([\s\S]*?)<\/content>/i) ||
      pick(/<description[^>]*>([\s\S]*?)<\/description>/i) || "";
    return {
      id: pick(/<guid[^>]*>([\s\S]*?)<\/guid>/i) || slugFromLink(link),
      title: strip(pick(/<title[^>]*>([\s\S]*?)<\/title>/i)) || "Untitled",
      slug: slugFromLink(link),
      summary: truncate(content),
      image: firstImg(content),
      link,
      published: pick(/<pubDate>([\s\S]*?)<\/pubDate>/i) || pick(/<updated>([\s\S]*?)<\/updated>/i) || null,
      content,
    };
  });
}
async function viaRssList() {
  const r = await fetch(RSS_URL, { cache: "no-store" });
  if (!r.ok) throw new Error(`RSS HTTP ${r.status}`);
  return parseRss(await r.text());
}

export async function listPosts(limit = 12) {
  try {
    const posts = await viaApiList();
    return posts.slice(0, limit);
  } catch {
    const posts = await viaRssList();
    return posts.slice(0, limit);
  }
}

export async function getPostById(id) {
  if (BID && KEY && id) {
    const r = await fetch(`https://www.googleapis.com/blogger/v3/blogs/${BID}/posts/${id}?key=${KEY}`, { cache: "no-store" });
    if (r.ok) {
      const it = await r.json();
      return {
        id: it.id, title: it.title || "Untitled", slug: slugFromLink(it.url || ""),
        image: firstImg(it.content || ""), link: it.url || "", published: it.published || null,
        content: it.content || ""
      };
    }
  }
  // fallback: search in list
  const list = await listPosts(50);
  return list.find((p) => p.id === id) || null;
}

export async function getPostBySlug(slug) {
  // API search first
  if (BID && KEY && slug) {
    const r = await fetch(
      `https://www.googleapis.com/blogger/v3/blogs/${BID}/posts/search?q=${encodeURIComponent(slug)}&key=${KEY}`,
      { cache: "no-store" }
    );
    if (r.ok) {
      const data = await r.json();
      const it = (data.items || [])[0];
      if (it) {
        return {
          id: it.id, title: it.title || "Untitled", slug: slugFromLink(it.url || ""),
          image: firstImg(it.content || ""), link: it.url || "", published: it.published || null,
          content: it.content || ""
        };
      }
    }
  }
  // fallback to list + match
  const list = await listPosts(50);
  return list.find((p) => p.slug === slug) || null;
}
