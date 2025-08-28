export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { listPosts } from "../../../lib/blog-source";

export async function GET() {
  try {
    const posts = await listPosts(12);
    return new Response(JSON.stringify({ ok: true, posts }), {
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }
}
