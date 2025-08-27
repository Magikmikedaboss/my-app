import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section">
      <div className="container-md">
        <div className="surface-deep p-8 text-white text-center">
          <h1 className="text-3xl font-bold">Page not found</h1>
          <p className="mt-2 text-white/80">
            Sorry, we couldn’t find that page.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-2">
            <Link href="/" className="btn btn-white-soft">← Back home</Link>
            <Link href="/blog" className="btn btn-ghost-glass">View blog</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
