export const metadata = { title: "About — Mike’s PRO Handyman" };

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-center sm:py-12">
      <h1 className="text-3xl font-bold text-blue-800 sm:text-4xl">About Mike</h1>
      <p className="mt-3 text-gray-700">
        25+ years of reliable home repair across electrical, plumbing, carpentry, and finish work.
        Serving Las Vegas, Henderson, and Summerlin.
      </p>

      <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
        <div className="rounded-lg bg-white p-4 ring-1 ring-blue-100 shadow-sm">
          <div className="text-2xl">✅</div>
          <p className="mt-1 text-sm text-gray-700">Licensed & insured</p>
        </div>
        <div className="rounded-lg bg-white p-4 ring-1 ring-blue-100 shadow-sm">
          <div className="text-2xl">⏱️</div>
          <p className="mt-1 text-sm text-gray-700">On-time & tidy</p>
        </div>
        <div className="rounded-lg bg-white p-4 ring-1 ring-blue-100 shadow-sm">
          <div className="text-2xl">⭐</div>
          <p className="mt-1 text-sm text-gray-700">Friendly service</p>
        </div>
      </div>

      <div className="mt-8">
        <a href="/contact" className="rounded-full bg-blue-600 px-6 py-3 font-medium text-white ring-1 ring-blue-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow transition">
          Book a Visit
        </a>
      </div>
    </main>
  );
}
