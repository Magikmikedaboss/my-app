import Link from "next/link";
import BookButton from "../../components/BookButton.js";

export const metadata = { title: "Services — Mike’s PRO Handyman" };

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
      {/* Page header */}
      <div className="surface-deep p-6 sm:p-10 text-white">
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">Handyman Services in Las Vegas</h1>
            <p className="mt-2 text-white/85">
              Licensed & insured. Same-day / next-day availability. Book online in under 60 seconds.
            </p>
          </div>

          <div className="mt-3 sm:mt-0 flex flex-wrap justify-center gap-2">
            <BookButton>📅 Book Now</BookButton>
            <Link href="/#contact" className="btn btn-ghost-glass">Inquire</Link>
          </div>
        </div>

        {/* Services grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {/* Card: General Repairs */}
          <div className="group rounded-xl border border-white/15 ring-1 ring-white/10 bg-white/10 p-6 shadow-sm backdrop-blur-md backdrop-saturate-150 transition hover:-translate-y-0.5 hover:shadow-lg">
            <h2 className="text-lg font-semibold">🛠️ General Repairs</h2>
            <p className="mt-1 text-sm text-white/85">Drywall, doors, trim, fixtures—done right.</p>
            <ul className="mt-3 space-y-1 text-sm text-white/80">
              <li>• Drywall patches & texture</li>
              <li>• Door alignment & hardware</li>
              <li>• Shelf & bracket installs</li>
            </ul>
            <div className="mt-4 flex justify-center gap-2">
              <BookButton className="min-w-[110px]">Book</BookButton>
              <Link href="/#contact" className="btn btn-ghost-glass">Inquire</Link>
            </div>
          </div>

          {/* Card: Lighting & Electrical */}
          <div className="group rounded-xl border border-white/15 ring-1 ring-white/10 bg-white/10 p-6 shadow-sm backdrop-blur-md backdrop-saturate-150 transition hover:-translate-y-0.5 hover:shadow-lg">
            <h2 className="text-lg font-semibold">💡 Lighting & Electrical</h2>
            <p className="mt-1 text-sm text-white/85">Fixtures, switches, dimmers (non-permit).</p>
            <ul className="mt-3 space-y-1 text-sm text-white/80">
              <li>• Light fixture replacements</li>
              <li>• Ceiling fan installs</li>
              <li>• Switches, dimmers, GFCIs</li>
            </ul>
            <div className="mt-4 flex justify-center gap-2">
              <BookButton className="min-w-[110px]">Book</BookButton>
              <Link href="/#contact" className="btn btn-ghost-glass">Inquire</Link>
            </div>
          </div>

          {/* Card: Plumbing Fixes */}
          <div className="group rounded-xl border border-white/15 ring-1 ring-white/10 bg-white/10 p-6 shadow-sm backdrop-blur-md backdrop-saturate-150 transition hover:-translate-y-0.5 hover:shadow-lg">
            <h2 className="text-lg font-semibold">🚰 Plumbing Fixes</h2>
            <p className="mt-1 text-sm text-white/85">Faucets, disposals, toilets, P-traps.</p>
            <ul className="mt-3 space-y-1 text-sm text-white/80">
              <li>• Faucet & supply line swaps</li>
              <li>• Disposal installs</li>
              <li>• Toilet flappers & fills</li>
            </ul>
            <div className="mt-4 flex justify-center gap-2">
              <BookButton className="min-w-[110px]">Book</BookButton>
              <Link href="/#contact" className="btn btn-ghost-glass">Inquire</Link>
            </div>
          </div>

          {/* Card: Assembly & Install */}
          <div className="group rounded-xl border border-white/15 ring-1 ring-white/10 bg-white/10 p-6 shadow-sm backdrop-blur-md backdrop-saturate-150 transition hover:-translate-y-0.5 hover:shadow-lg">
            <h2 className="text-lg font-semibold">🧰 Assembly & Install</h2>
            <p className="mt-1 text-sm text-white/85">TVs, shelves, furniture, blinds.</p>
            <ul className="mt-3 space-y-1 text-sm text-white/80">
              <li>• TV mounting (stud/secure)</li>
              <li>• Floating shelves</li>
              <li>• Furniture assembly</li>
            </ul>
            <div className="mt-4 flex justify-center gap-2">
              <BookButton className="min-w-[110px]">Book</BookButton>
              <Link href="/#contact" className="btn btn-ghost-glass">Inquire</Link>
            </div>
          </div>

          {/* Card: Paint & Drywall */}
          <div className="group rounded-xl border border-white/15 ring-1 ring-white/10 bg-white/10 p-6 shadow-sm backdrop-blur-md backdrop-saturate-150 transition hover:-translate-y-0.5 hover:shadow-lg">
            <h2 className="text-lg font-semibold">🎨 Paint & Drywall</h2>
            <p className="mt-1 text-sm text-white/85">Patches, touch-ups, color-match.</p>
            <ul className="mt-3 space-y-1 text-sm text-white/80">
              <li>• Nail holes & dents</li>
              <li>• Small patch & texture</li>
              <li>• Trim & door touch-ups</li>
            </ul>
            <div className="mt-4 flex justify-center gap-2">
              <BookButton className="min-w-[110px]">Book</BookButton>
              <Link href="/#contact" className="btn btn-ghost-glass">Inquire</Link>
            </div>
          </div>

          {/* Card: Doors & Locks */}
          <div className="group rounded-xl border border-white/15 ring-1 ring-white/10 bg-white/10 p-6 shadow-sm backdrop-blur-md backdrop-saturate-150 transition hover:-translate-y-0.5 hover:shadow-lg">
            <h2 className="text-lg font-semibold">🔐 Doors & Locks</h2>
            <p className="mt-1 text-sm text-white/85">Handles, deadbolts, alignment.</p>
            <ul className="mt-3 space-y-1 text-sm text-white/80">
              <li>• Strike plate & hinge tune</li>
              <li>• Deadbolt & handle sets</li>
              <li>• Weatherstripping</li>
            </ul>
            <div className="mt-4 flex justify-center gap-2">
              <BookButton className="min-w-[110px]">Book</BookButton>
              <Link href="/#contact" className="btn btn-ghost-glass">Inquire</Link>
            </div>
          </div>
        </div>

        {/* Bottom CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <BookButton>📅 Get a Free Estimate</BookButton>
          <Link href="/#services" className="btn btn-ghost-glass">Back to Home</Link>
        </div>

        {/* Small disclaimer for electrical */}
        <p className="mt-4 text-xs text-white/70">
          *Electrical limited to non-permit service. For larger projects, I can recommend a licensed specialist.
        </p>
      </div>
    </main>
  );
}
