export default async function sitemap() {
  const base = "https://mikesprohandyman.com";
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/services`, lastModified: new Date() },
    { url: `${base}/blog`, lastModified: new Date() },
    // Optional: add any other static pages
  ];
}
