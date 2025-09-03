import { headers } from "next/headers";
import BlogCardGrid from "../components/BlogCardGrid";

export const revalidate = 1800;

async function absoluteUrl(path) {
  const envBase = process.env.NEXT_PUBLIC_SITE_URL;
  if (envBase) return new URL(path, envBase).toString();
  const h = await headers(); // Next 15: must await
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host  = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  return `${proto}://${host}${path}`;
}

async function getPosts() {
  const url = await absoluteUrl("/api/blog-feed");
  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.ok ? data.posts : [];
}

export default async function HomeBlogSection() {
  const posts = await getPosts();
  return <BlogCardGrid posts={posts} showCta />;
}
