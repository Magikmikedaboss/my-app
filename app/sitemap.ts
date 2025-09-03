import type { MetadataRoute } from "next";

const BASE = "https://mikesprohandyman.com";
const routes = [
  "/", "/about", "/contact", "/reviews", "/gallery",
  "/services", "/services/drywall-repair", "/services/painting", "/services/flooring", "/services/fixture-installation",
  "/service-area/phoenix-az", "/service-area/scottsdale-az", "/service-area/tempe-az",
  "/blog"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.startsWith("/services") ? 0.8 : 0.6,
  }));
}
