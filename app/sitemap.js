// app/sitemap.js
export const revalidate = 3600; // rebuild sitemap at most once per hour

export default async function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.mikesprohandyman.com";

  // Static routes (add/remove as your site grows)
  const staticRoutes = [
    "",
    "/services",
    "/blog",
    "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: path === "" ? 1.0 : 0.7,
  }));

  // Try to include your blog posts from your existing API
  let posts = [];
  try {
    const res = await fetch(`${baseUrl}/api/blog-feed`, {
      // cache-friendly on Vercel/Next
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      posts =
        (data?.posts || []).map((p) => ({
          url: `${baseUrl}/blog/${p.slug}${
            p.id ? `?id=${encodeURIComponent(p.id)}` : ""
          }`,
          lastModified: p.updated || p.published || new Date().toISOString(),
          changeFrequency: "weekly",
          priority: 0.6,
        })) ?? [];
    }
  } catch {
    // If the feed fails, we still return static routes
  }

  return [...staticRoutes, ...posts];
}
