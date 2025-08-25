import { notFound } from "next/navigation";

const POSTS = {
  "tools-every-homeowner": {
    title: "🧰 5 Tools Every Homeowner Should Own",
    body: "Hammer, tape measure, utility knife, adjustable wrench, cordless drill."
  },
  "prep-for-summer": {
    title: "☀️ Prep Your Home for Summer",
    body: "Check AC filter, seal gaps, clean fans, test sprinklers, shade windows."
  },
  "seasonal-checklist": {
    title: "🛠️ Seasonal Maintenance",
    body: "Quarterly: test alarms, inspect caulk, flush water heater (per model)."
  }
};

export async function generateMetadata({ params }) {
  const post = POSTS[params.slug];
  return {
    title: post ? `${post.title} — Blog` : "Blog Post",
    description: post ? post.body.slice(0, 120) : "Handyman blog post"
  };
}

export default function BlogPost({ params }) {
  const post = POSTS[params.slug];
  if (!post) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-800 text-center">{post.title}</h1>
      <article className="prose mx-auto mt-6 text-gray-800">
        <p>{post.body}</p>
      </article>
      <div className="mt-8 text-center">
        <a href="/blog" className="text-blue-700 underline">← Back to Blog</a>
      </div>
    </main>
  );
}
