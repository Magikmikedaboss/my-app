export const revalidate = 600;

import { notFound } from "next/navigation";
import { getPostById, getPostBySlug, sanitize } from "@/lib/blog-source";

export default async function BlogPost({ params, searchParams }) {
  const { slug } = await params;            // Next 15 requires awaiting these
  const { id = "" } = await searchParams;

  let item = null;
  if (id) item = await getPostById(id);
  if (!item && slug) item = await getPostBySlug(slug);
  if (!item) notFound();

  return (
    <main className="section">
      <article className="container-md">
        <h1 className="text-3xl font-bold text-white">{item.title || "Untitled"}</h1>
        <div className="prose prose-invert max-w-none mt-4" dangerouslySetInnerHTML={{ __html: sanitize(item.content || "") }} />
      </article>
    </main>
  );
}
