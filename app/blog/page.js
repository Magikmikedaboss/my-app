export const revalidate = 600; // ISR
import { listPosts } from "../../lib/blog-source";
import BlogCardGrid from "../../components/BlogCardGrid";

export const metadata = {
  title: "Blog — Mike’s PRO Handyman",
  description: "Handyman tips, smart upgrades, and maintenance guides.",
  alternates: { canonical: "/blog" },
};

export default async function BlogIndex() {
  const posts = await listPosts(12);
  return <BlogCardGrid posts={posts} showCta={false} />;
}
