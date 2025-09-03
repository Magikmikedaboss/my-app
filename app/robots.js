// app/robots.js
export default function robots() {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.mikesprohandyman.com";

  // If you ever want to block staging, you can switch on an env flag here.
  const isProd = baseUrl.includes("mikesprohandyman.com");

  return {
    rules: isProd
      ? {
          userAgent: "*",
          allow: "/",
          // (Optional) keep internal endpoints out of the index:
          disallow: ["/api/", "/private/", "/_next/", "/assets/"],
        }
      : {
          userAgent: "*",
          disallow: "/",
        },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
