export const revalidate = 600;

import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById, getPostBySlug } from "../../../lib/blog-source";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const item = await getPostBySlug(slug);
    if (!item) return {};
    return {
      title: item.title,
      description: item.summary || "Blog post",
      alternates: { canonical: `/blog/${item.slug}` },
      openGraph: {
        title: item.title,
        description: item.summary || "",
        images: item.image ? [{ url: item.image, width: 1200, height: 630 }] : [],
      },
      twitter: { card: "summary_large_image" },
    };
  } catch {
    return {};
  }
}

export default async function BlogPost({ params, searchParams }) {
  const { slug } = await params;
  const sp = await searchParams;
  const idFromQuery = sp?.id || null;

  const item =
    (idFromQuery && (await getPostById(idFromQuery))) ||
    (await getPostBySlug(slug));

  if (!item) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <nav className="mb-6 text-sm">
        <Link href="/blog" className="text-white/80 underline hover:text-white">← Back to Blog</Link>
      </nav>

      <article className="prose prose-invert max-w-none">
        <h1 className="!mb-2">{item.title}</h1>
        {item.published && (
          <p className="!mt-0 text-white/60 text-sm">
            {new Date(item.published).toLocaleDateString()}
          </p>
        )}
        {/* post body (sanitized & with width/height on <img> to reduce CLS) */}
        <div dangerouslySetInnerHTML={{ __html: item.content || "" }} />
      </article>
    </main>
  );
}
