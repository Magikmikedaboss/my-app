// app/blog/[slug]/page.js
import { notFound } from "next/navigation";

export const revalidate = 3600;

const BLOGGER = "https://fixitwithmikelasvegas.blogspot.com";
const FEED = `${BLOGGER}/feeds/posts/default?alt=rss&max-results=150`;

// --- tiny helpers ---
const decode = (s = "") =>
  s.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'");
const pick = (str, re) => (str.match(re) || [,""])[1];
function stripText(html=""){ return html.replace(/<[^>]*>/g," ").replace(/\s+/g," ").trim(); }

// minimal HTML “sanitizer”: drop external-fetching tags, unsafe attrs; normalize image URLs
function sanitize(html = "") {
  // 1) Kill blocks that can pull resources or execute
  html = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "");
  html = html.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
  html = html.replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "");
  html = html.replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, "");
  // 2) Remove external resource tags entirely
  html = html.replace(/<link[^>]*>/gi, "");
  html = html.replace(/<meta[^>]*>/gi, "");
  // 3) Remove inline event handlers & inline styles (background:url etc.)
  html = html.replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "");
  html = html.replace(/\sstyle=(['"]).*?\1/gi, "");
  // 4) If any stray @import text slipped out, nuke it
  html = html.replace(/@import[^;]+;/gi, "");
  // 5) Promote lazy image attributes to src
  html = html.replace(
    /<img([^>]*?)\s(?:data-src|data-original|data-lazy-src)=["']([^"']+)["']([^>]*)>/gi,
    '<img$1 src="$2"$3>'
  );
  // 6) Normalize image src (protocol-relative & root-relative)
  html = html.replace(/src=["']\/\/([^"']+)["']/gi, 'src="https://$1"');
  html = html.replace(/src=["']\/([^"']+)["']/gi, (m, p1) => `src="${BLOGGER}/${p1}"`);
  return html;
}

function parseEntries(xml) {
  const blocks =
    xml.match(/<item[\s\S]*?<\/item>/gi) ||
    xml.match(/<entry[\s\S]*?<\/entry>/gi) ||
    [];
  return blocks.map((block) => {
    let title = pick(block, /<title[^>]*>([\s\S]*?)<\/title>/i);
    let link  = pick(block, /<link>([\s\S]*?)<\/link>/i);
    if (!link) {
      const m = block.match(/<link[^>]*rel=['"]alternate['"][^>]*href=['"]([^'"]+)['"][^>]*\/?>/i);
      link = m ? m[1] : "";
    }
    let date  = pick(block, /<pubDate>([\s\S]*?)<\/pubDate>/i) || pick(block, /<updated>([\s\S]*?)<\/updated>/i);
    // Prefer full content if available
    let content =
      pick(block, /<content:encoded[^>]*>([\s\S]*?)<\/content:encoded>/i) ||
      pick(block, /<content[^>]*>([\s\S]*?)<\/content>/i) ||
      pick(block, /<description>([\s\S]*?)<\/description>/i) ||
      "";

    title = decode(title.replace(/<!\[CDATA\[|\]\]>/g, "").trim());
    content = decode(content.replace(/<!\[CDATA\[|\]\]>/g, ""));
    const when = date ? new Date(date).toISOString() : null;

    let slug = "post";
    try {
      const u = new URL(link);
      const parts = u.pathname.split("/").filter(Boolean);
      const last = parts[parts.length - 1] || "";
      slug = decodeURIComponent(last.replace(/\.html?$/i, "")) || slug;
    } catch {}

    return { slug, title, link, date: when, content };
  });
}

async function getPost(slug) {
  const res = await fetch(FEED, { next: { revalidate: 3600 } });
  const xml = await res.text();
  const entries = parseEntries(xml);
  return entries.find((e) => e.slug === slug) || null;
}

export async function generateStaticParams() {
  const res = await fetch(FEED, { cache: "no-store" });
  const xml = await res.text();
  const entries =
    xml.match(/<item[\s\S]*?<\/item>/gi) ||
    xml.match(/<entry[\s\S]*?<\/entry>/gi) ||
    [];
  const slugs = entries.map((block) => {
    let link = (block.match(/<link>([\s\S]*?)<\/link>/i) || [,""])[1];
    if (!link) {
      const m = block.match(/<link[^>]*rel=['"]alternate['"][^>]*href=['"]([^'"]+)['"][^>]*\/?>/i);
      link = m ? m[1] : "";
    }
    try {
      const u = new URL(link);
      const last = u.pathname.split("/").filter(Boolean).pop() || "post";
      return decodeURIComponent(last.replace(/\.html?$/i, ""));
    } catch {
      return null;
    }
  }).filter(Boolean);
  return slugs.slice(0, 50).map((slug) => ({ slug })); // prebuild some; others via ISR
}

export async function generateMetadata({ params }) {
  const { slug } = await params;               // ✅ await params
  const post = await getPost(slug);
  if (!post) return {};
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://mikesprohandyman.com";
  const url = `${base}/blog/${slug}`;
  const desc = stripText(post.content).slice(0, 160);
  return {
    title: post.title,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: stripText(post.content).slice(0, 200),
      type: "article",
      url,
    },
    twitter: { card: "summary_large_image", title: post.title, description: desc },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;               // ✅ await params
  const post = await getPost(slug);
  if (!post) return notFound();

  const safeHTML = sanitize(post.content);
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://mikesprohandyman.com";

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <article>
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold text-blue-800">{post.title}</h1>
          {post.date && (
            <p className="mt-2 text-sm text-gray-600">
              <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
            </p>
          )}
          {/* JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                headline: post.title,
                datePublished: post.date,
                dateModified: post.date,
                mainEntityOfPage: `${base}/blog/${slug}`, // ✅ use slug var
              }),
            }}
          />
        </header>

        <div
          className="
            prose prose-slate sm:prose-lg max-w-none
            prose-a:text-blue-700 hover:prose-a:underline
            prose-img:rounded-xl prose-hr:border-slate-200
            prose-blockquote:border-blue-300
          "
          dangerouslySetInnerHTML={{ __html: safeHTML }}
        />
      </article>
    </main>
  );
}
