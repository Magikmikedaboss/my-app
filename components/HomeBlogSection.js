// components/HomeBlogSection.jsx
export const revalidate = 3600; // refresh hourly

const BLOGGER = process.env.NEXT_PUBLIC_BLOGGER_URL || "https://fixitwithmikelasvegas.blogspot.com";
const FEED = `${BLOGGER}/feeds/posts/default?alt=rss&max-results=12`;

// helpers
const decode = (s = "") =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

const stripTags = (html = "") => html.replace(/<[^>]*>/g, " ");
const stripSpaces = (s = "") => s.replace(/\s+/g, " ").trim();

// decode → drop CDATA → strip tags → collapse spaces
const textify = (s = "") => stripSpaces(stripTags(decode(s.replace(/<!\[CDATA\[|\]\]>/g, ""))));

const pick = (str, re) => {
  const m = str.match(re);
  return m ? m[1] : "";
};

function parseFeed(xml) {
  const blocks =
    xml.match(/<item[\s\S]*?<\/item>/gi) ||
    xml.match(/<entry[\s\S]*?<\/entry>/gi) ||
    [];

  return blocks.map((b) => {
    let title = pick(b, /<title[^>]*>([\s\S]*?)<\/title>/i);
    let link  = pick(b, /<link>([\s\S]*?)<\/link>/i);
    if (!link) {
      const m = b.match(/<link[^>]*rel=['"]alternate['"][^>]*href=['"]([^'"]+)['"][^>]*\/?>/i);
      link = m ? m[1] : "";
    }
    let date =
      pick(b, /<pubDate>([\s\S]*?)<\/pubDate>/i) ||
      pick(b, /<updated>([\s\S]*?)<\/updated>/i);

    // prefer full content if present
    const rawSummary =
      pick(b, /<content:encoded[^>]*>([\s\S]*?)<\/content:encoded>/i) ||
      pick(b, /<content[^>]*>([\s\S]*?)<\/content>/i) ||
      pick(b, /<summary[^>]*>([\s\S]*?)<\/summary>/i) ||
      pick(b, /<description>([\s\S]*?)<\/description>/i) ||
      "";

    // FIX: decode first, then strip
    title = textify(title);
    const summary = textify(rawSummary).slice(0, 180);
    const when = date ? new Date(date).toISOString() : null;

    // slug from Blogger link
    let slug = "post";
    try {
      const u = new URL(link);
      const last = u.pathname.split("/").filter(Boolean).pop() || "";
      slug = decodeURIComponent(last.replace(/\.html?$/i, "")) || slug;
    } catch {}

    return { title, summary, date: when, slug };
  });
}

export default async function HomeBlogSection() {
  let posts = [];
  try {
    const res = await fetch(FEED, { next: { revalidate: 3600 } });
    const xml = await res.text();
    posts = parseFeed(xml).slice(0, 3);
  } catch {}

  const fallback = [
    { slug: "tools",    title: "🧰 5 Tools Every Homeowner Should Own", summary: "Build a basic kit for quick fixes and emergencies." },
    { slug: "summer",   title: "☀️ Prep Your Home for Summer",         summary: "Simple steps to keep things cool and efficient." },
    { slug: "seasonal", title: "🛠️ Seasonal Maintenance Checklist",    summary: "Stay ahead of wear & tear with this quick list." },
  ];

  const cards = posts.length ? posts : fallback;

  return (
    <section id="blog" className="section scroll-mt-24">
      <div className="container-md">
        <div className="rounded-2xl bg-gradient-to-b from-blue-400/20 to-blue-200/10 p-[1px]">
          <div className="surface-deep p-6 sm:p-8">
            <div className="text-center">
              <span className="badge-glass inline-flex items-center gap-2">
                <span className="text-base">🛠️</span> Handyman Tips &amp; Updates
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-white">Latest from the Blog</h2>
              <p className="mt-2 text-white/85">Quick DIY tips, seasonal maintenance, and service updates.</p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {cards.map((p) => {
                const href = posts.length ? `/blog/${p.slug}` : "/blog";
                return (
                  <a key={p.slug} href={href} className="card-glass p-6">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-300/10 to-cyan-300/10 opacity-0 transition group-hover:opacity-100" />
                    <h3 className="text-lg font-semibold text-white line-clamp-2">{p.title}</h3>
                    {p.date && <p className="mt-1 text-xs text-white/70">{new Date(p.date).toLocaleDateString()}</p>}
                    {p.summary && <p className="mt-2 text-sm text-white/85 line-clamp-3">{p.summary}</p>}
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white/90 group-hover:underline">
                      Read more →
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="mt-6 text-center">
              <a href="/blog" className="btn btn-primary-glass btn-shine">📚 View All Posts</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
