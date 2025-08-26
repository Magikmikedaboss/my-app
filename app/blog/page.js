// app/blog/page.js
export const revalidate = 3600; // refresh list hourly

const BLOGGER =
  process.env.NEXT_PUBLIC_BLOGGER_URL ||
  "https://fixitwithmikelasvegas.blogspot.com";
const FEED = `${BLOGGER}/feeds/posts/default?alt=rss&max-results=50`;

/* ---------- helpers: decode -> strip -> excerpt ---------- */
const decode = (s = "") =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

const stripTags = (html = "") =>
  html
    .replace(/<(script|style|iframe)[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<[^>]*>/g, " ");

const cleanExcerpt = (html = "", limit = 180) =>
  stripTags(decode(html)).replace(/\s+/g, " ").trim().slice(0, limit);

/* ---------- image helpers ---------- */
const bumpBloggerSize = (url, size = "s1200") =>
  url.replace(/\/s\d+(-c)?\//, `/${size}/`);

const firstImageFrom = (html = "") => {
  const m = html.match(/<img[^>]+src=['"]([^'"]+)['"]/i);
  if (!m) return "";
  let url = m[1];
  if (url.startsWith("//")) url = "https:" + url;
  if (/blogger\.googleusercontent\.com/.test(url)) url = bumpBloggerSize(url);
  return url;
};

/* ---------- tiny utils ---------- */
const pick = (str, re) => {
  const m = str.match(re);
  return m ? m[1] : "";
};

/* ---------- feed parsing ---------- */
function parseFeed(xml) {
  const blocks =
    xml.match(/<item[\s\S]*?<\/item>/gi) ||
    xml.match(/<entry[\s\S]*?<\/entry>/gi) ||
    [];

  return blocks.map((b) => {
    // title / link
    let title = pick(b, /<title[^>]*>([\s\S]*?)<\/title>/i);
    let link = pick(b, /<link>([\s\S]*?)<\/link>/i);
    if (!link) {
      const m = b.match(
        /<link[^>]*rel=['"]alternate['"][^>]*href=['"]([^'"]+)['"][^>]*\/?>/i
      );
      link = m ? m[1] : "";
    }

    // dates
    let date =
      pick(b, /<pubDate>([\s\S]*?)<\/pubDate>/i) ||
      pick(b, /<updated>([\s\S]*?)<\/updated>/i);

    // body fields
    const description = pick(b, /<description>([\s\S]*?)<\/description>/i) || "";
    const content = pick(b, /<content[^>]*>([\s\S]*?)<\/content>/i) || "";

    // image: media tags or first <img> in content/description
    let image =
      pick(b, /<media:thumbnail[^>]*url=['"]([^'"]+)['"]/i) ||
      pick(b, /<media:content[^>]*url=['"]([^'"]+)['"]/i) ||
      firstImageFrom(content) ||
      firstImageFrom(description) ||
      "";

    if (image.startsWith("//")) image = "https:" + image;
    if (/blogger\.googleusercontent\.com/.test(image)) {
      image = bumpBloggerSize(image);
    }

    // clean fields
    title = decode(stripTags(title));
    const summary = cleanExcerpt(description || content, 180);
    const when = date ? new Date(date).toISOString() : null;

    // slug from link (/YYYY/MM/slug.html)
    let slug = "post";
    try {
      const u = new URL(link);
      const last = u.pathname.split("/").filter(Boolean).pop() || "";
      slug = decodeURIComponent(last.replace(/\.html?$/i, "")) || slug;
    } catch {}

    return { title, summary, date: when, slug, image };
  });
}

async function fetchPosts() {
  const res = await fetch(FEED, { next: { revalidate: 3600 } });
  const xml = await res.text();
  return parseFeed(xml);
}

export const metadata = {
  title: "Blog — Mike’s PRO Handyman",
  description: "Tips, project ideas, and updates from Mike’s PRO Handyman.",
  alternates: { canonical: "https://mikesprohandyman.com/blog" },
};

export default async function BlogIndex() {
  const posts = await fetchPosts();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      {/* Shell to match the site */}
      <section className="rounded-2xl bg-gradient-to-b from-blue-400/20 to-blue-200/10 p-[1px]">
        <div className="surface-deep rounded-2xl p-8 text-white">
          <div className="text-center">
            <span className="badge-glass inline-flex items-center gap-2">
              <span className="text-base">🛠️</span> Handyman Tips &amp;
              Updates
            </span>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Mikes Pro Handyman Blog</h1>
            <p className="mt-2 text-white/85">
              Quick DIY tips, seasonal maintenance, and service updates.
            </p>
          </div>

          {posts.length === 0 ? (
            <p className="mt-6 text-white/85">No posts yet. Check back soon.</p>
          ) : (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {posts.map((p) => (
                <li key={p.slug}>
                  <a
                    href={`/blog/${p.slug}`}
                    className="group relative block overflow-hidden rounded-2xl border border-blue-200/60 ring-1 ring-blue-200/60 bg-white/95 text-blue-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    {/* thumbnail */}
                    {p.image && (
                      <div className="aspect-[16/9] w-full overflow-hidden rounded-b-none rounded-t-2xl bg-black/10">
                        <img
                          src={p.image}
                          alt={p.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <h2 className="text-lg font-semibold line-clamp-2">
                        {p.title}
                      </h2>

                      {p.date && (
                        <p className="mt-1 text-xs text-gray-600">
                          {new Date(p.date).toLocaleDateString()}
                        </p>
                      )}

                      {p.summary && (
                        <p className="mt-2 text-sm text-slate-700 line-clamp-3">
                          {p.summary}
                        </p>
                      )}

                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-700 group-hover:underline">
                        Read more →
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
