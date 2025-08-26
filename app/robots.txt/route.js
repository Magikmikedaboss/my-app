export async function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Sitemap: https://mikesprohandyman.com/sitemap.xml",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain" } });
}
