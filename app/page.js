// app/page.js
import Script from "next/script";
import ContactForm from "../components/ContactForm";        // keep relative import
import HomeBlogSection from "../components/HomeBlogSection"; // server component (async)

// Optional: page-level metadata (you can keep your layout metadata if you prefer)
export const metadata = {
  title: "Mike’s PRO Handyman — Las Vegas",
  description:
    "Las Vegas Handyman — electrical, plumbing, drywall, doors & fixtures. Fast online booking with instant confirmation.",
};

export default function Home() {
  return (
    <>
      {/* Housecall Pro booking script (remove if already included in app/layout.js) */}
      <Script
        src="https://online-booking.housecallpro.com/script.js?token=d4e1ed98b32f451292eb26a710d891f0&orgName=Mikes-Pro-Handyman-service"
        strategy="afterInteractive"
      />

      {/* Tiny handler: any element with [data-hcp-open] opens the booking modal */}
      <Script id="hcp-open-handler" strategy="afterInteractive">
        {`
          document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-hcp-open]');
            if (!trigger) return;
            e.preventDefault();
            try { window.HCPWidget?.openModal?.(); } catch {}
          });
        `}
      </Script>

      {/* Tiny handler: show/hide mobile FAB when scrolling */}
      <Script id="fab-scroll-handler" strategy="afterInteractive">
        {`
          const fab = document.getElementById('mobileFab');
          if (fab) {
            const toggle = () => {
              if (window.scrollY > 300) {
                fab.classList.add('visible','opacity-100','translate-y-0');
                fab.classList.remove('invisible','opacity-0','translate-y-10');
              } else {
                fab.classList.add('invisible','opacity-0','translate-y-10');
                fab.classList.remove('visible','opacity-100','translate-y-0');
              }
            };
            window.addEventListener('scroll', toggle, { passive: true });
            toggle();
          }
        `}
      </Script>

      {/* Main */}
      <main className="mx-auto max-w-4xl space-y-10 px-4 py-10 text-center sm:space-y-12 sm:py-12">
        {/* Hero */}
        <section id="home" className="surface-deep p-8 text-white sm:p-10">
          <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90 ring-1 ring-white/15">
            Mike’s PRO Handyman
          </p>

          <h1 className="text-3xl font-bold leading-tight drop-shadow sm:text-4xl">
            Las Vegas Handyman — Fast Online Booking for Home Repairs
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-white/90">
            Licensed, insured handyman for <strong>Las Vegas</strong>, <strong>Henderson</strong> &{" "}
            <strong>Summerlin</strong>. Electrical, plumbing, drywall, doors & fixtures—done right.{" "}
            <strong>Book online in under 60 seconds</strong> with real-time availability and instant confirmation.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              data-hcp-open
              aria-label="Open fast online booking"
              className="btn btn-primary-glass btn-shine"
            >
              📅 Book Online — 60s
            </button>
            <a href="tel:+1-702-555-1234" className="btn btn-white-soft">
              📞 Call Now
            </a>
            <a href="#services" className="btn btn-ghost-glass">
              🛠️ View Services
            </a>
          </div>

          <ul className="mt-6 grid grid-cols-1 gap-2 text-sm text-white/90 sm:grid-cols-3">
            <li className="flex items-center justify-center gap-2">✅ Same-day & next-day availability</li>
            <li className="flex items-center justify-center gap-2">✅ Transparent pricing & estimates</li>
            <li className="flex items-center justify-center gap-2">✅ 25+ years — licensed & insured</li>
          </ul>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs ring-1 ring-white/15">
            <span className="inline-block rounded-full bg-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
              New
            </span>
            <span>Faster booking modal • Updated service bundles • Text updates for appointments</span>
          </div>
        </section>

        {/* About */}
        <section id="about" className="scroll-mt-24">
          <div className="rounded-2xl border border-white/25 bg-gradient-to-br from-sky-200/65 via-blue-100/55 to-white/55 p-8 text-slate-900 ring-1 ring-black/10 backdrop-blur-xl shadow-xl sm:p-10">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800 ring-1 ring-blue-200">
              25+ Years Experience
            </p>

            <h2 className="mt-2 text-2xl font-bold text-blue-900 sm:text-3xl">About Mike’s PRO Handyman</h2>

            <p className="mt-3 text-slate-800">
              Licensed, insured handyman with <strong>25+ years across construction and technical trades</strong>—
              electrical, plumbing, carpentry, and low-voltage/smart-home. Serving Las Vegas, Henderson, and Summerlin
              with reliable workmanship and friendly service.
            </p>

            <details className="group mt-4">
              <summary className="inline-flex cursor-pointer select-none items-center gap-2 rounded-full border border-blue-200 bg-white/90 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-blue-200 transition hover:-translate-y-0.5 hover:bg-white">
                <span className="inline-block">📘 Read More</span>
                <svg className="h-4 w-4 transition group-open:rotate-180" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </summary>

              <div className="mt-4 space-y-3 text-slate-800/95">
                <p>
                  I combine field experience with modern tools: stud-secure TV mounting, smart thermostats & cameras,
                  dimmers & GFCIs, faucet/fixture swaps, drywall texture matching, and door/lock alignment.
                </p>
                <ul className="list-inside list-disc text-sm">
                  <li>Residential & light commercial</li>
                  <li>Clean work, clear communication, on-time arrivals</li>
                  <li>Upfront estimates and photo updates when requested</li>
                </ul>
              </div>
            </details>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 font-medium text-white ring-1 ring-blue-300 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow"
              >
                📅 Get a Free Estimate
              </a>
              <a
                href="tel:+1-702-555-1234"
                className="inline-flex items-center justify-center rounded-full border border-blue-200 bg-white px-6 py-3 font-medium text-blue-700 ring-1 ring-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                📞 Call Now
              </a>
            </div>
          </div>
        </section>

        {/* Specialties (round icons row) */}
        <section id="specialties" className="section scroll-mt-24">
          <div className="container-md">
            <div className="surface-deep p-8 sm:p-10 text-white">
              <p className="badge-glass">Popular Services</p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold">Fixes, Installs & Upgrades — Done Right</h2>
              <p className="mt-1 text-sm text-white/85">Swipe on mobile, tap to learn more.</p>

              {(() => {
                const items = [
                  { label: "🛠️ Repairs & Maintenance", img: "/assets/specialties/repairs.jpg",    href: "/services#repairs" },
                  { label: "💡 Electrical & Plumbing",  img: "/assets/specialties/electrical.jpg", href: "/services#electrical" },
                  { label: "🛁 Kitchen & Bath",         img: "/assets/specialties/kitchen.jpg",    href: "/services#kitchen-bath" },
                  { label: "🧰 Assembly & Install",     img: "/assets/specialties/assembly.jpg",   href: "/services#assembly" },
                  { label: "🎨 Painting & Drywall",     img: "/assets/specialties/painting.jpg",   href: "/services#painting" },
                ];
                return (
                  <ul
                    className="
                      mt-6
                      flex gap-5 px-1 py-2 overflow-x-auto snap-x snap-mandatory
                      [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden
                      sm:grid sm:grid-cols-5 sm:gap-6 sm:overflow-visible sm:px-0
                      place-items-center
                    "
                  >
                    {items.map(({ label, img, href }) => (
                      <li key={label} className="snap-center shrink-0 sm:shrink">
                        <a
                          href={href}
                          className="
                            group relative flex aspect-square w-28 sm:w-32 items-center justify-center
                            overflow-hidden rounded-full
                            border border-white/15 ring-1 ring-white/10 bg-white/10 backdrop-blur-md
                            shadow-[0_10px_30px_rgba(2,6,23,0.35)]
                            transition-transform hover:-translate-y-0.5 hover:ring-2 hover:ring-accent/60
                          "
                          style={{ backgroundImage: `url('${img}')`, backgroundSize: "cover", backgroundPosition: "center" }}
                          aria-label={label.replace(/^[^\\s]+\\s/, "")}
                        >
                          <span className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-slate-950/30 to-slate-950/65 group-hover:from-blue-700/20 group-hover:to-slate-950/75" />
                          <span
                            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                            style={{ background: "radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,.18), rgba(255,255,255,0) 60%)" }}
                          />
                          <span className="relative z-10 px-3 text-center text-xs sm:text-sm font-semibold leading-tight drop-shadow [text-shadow:0_1px_2px_rgba(0,0,0,.55)]">
                            {label}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                );
              })()}
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="section scroll-mt-24">
          <div className="container-md">
            <div className="surface-deep p-8 text-white sm:p-10">
              <div className="flex flex-col items-center gap-1 sm:flex-row sm:justify-between">
                <h2 className="text-2xl font-bold sm:text-3xl">Services at a Glance</h2>
                <p className="text-sm text-white/80">Most requested tasks. Tap to book or inquire.</p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {[
                  { title: "🛠️ General Repairs", desc: "Drywall, doors, fixtures, and more—done right." },
                  { title: "💡 Lighting & Electrical", desc: "Installations and minor repairs—safe & tidy." },
                  { title: "🚰 Plumbing Fixes", desc: "Leaky faucets, disposals, toilets, P-traps." },
                ].map((card) => (
                  <div key={card.title} className="group rounded-2xl border border-white/15 bg-white/10 p-6 text-center shadow-sm ring-1 ring-white/10 backdrop-blur-md backdrop-saturate-150 transition hover:-translate-y-0.5 hover:shadow-lg">
                    <h3 className="text-lg font-semibold">{card.title}</h3>
                    <p className="mt-1 text-sm text-white/85">{card.desc}</p>
                    <div className="mt-4 flex justify-center gap-2">
                      <button data-hcp-open aria-label={`Book ${card.title}`} className="btn btn-primary-glass btn-shine">
                        Book
                      </button>
                      <a href="/#contact" className="btn btn-ghost-glass">
                        Inquire
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <a href="/services" className="text-sm underline text-white/80 hover:text-white">
                  See all services →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Blog (dynamic, styled to match) */}
        <HomeBlogSection />

        {/* Contact (home) */}
        <section id="contact" className="scroll-mt-24">
          <div
            className="
              mx-auto max-w-3xl
              rounded-2xl border border-white/15 ring-1 ring-white/15
              bg-gradient-to-br from-blue-950/80 via-blue-900/70 to-indigo-900/70
              text-white backdrop-blur-xl backdrop-saturate-150
              shadow-[0_20px_60px_-20px_rgba(2,6,23,0.6)]
              p-6 sm:p-8
            "
          >
            <h2 className="text-2xl sm:text-3xl font-bold">Contact</h2>
            <p className="mt-2 text-white/90">Tell me about your project and preferred time.</p>

            <div className="mt-4">
              <ContactForm plain />
            </div>

            <p className="mt-6 text-sm text-white/80">
              Or call:{" "}
              <a href="tel:+1-702-555-1234" className="underline hover:text-white">
                (702) 555-1234
              </a>
            </p>
          </div>
        </section>
      </main>

      {/* Mobile FAB */}
      <div
        id="mobileFab"
        className={[
          "fixed bottom-4 right-4 z-50 flex flex-col gap-3 md:hidden transition-all duration-500",
          "invisible opacity-0 translate-y-10", // toggled by the script above
        ].join(" ")}
      >
        <a
          href="tel:+1-702-555-1234"
          aria-label="Call Now"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-md"
        >
          📞
        </a>
        <button
          data-hcp-open
          aria-label="Book Now"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-700 ring-1 ring-gray-300 shadow"
        >
          📅
        </button>
      </div>
    </>
  );
}
