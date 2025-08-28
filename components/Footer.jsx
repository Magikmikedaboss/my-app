import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative z-10 mt-12 border-t border-white/10
                       bg-gradient-to-b from-slate-950/90 via-blue-950/85 to-slate-950/90
                       backdrop-blur-xl text-white
                       shadow-[0_-8px_30px_rgba(0,0,0,0.35)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        {/* Brand & blurb */}
        <div>
          <div className="flex items-center gap-2">
           
            <span className="font-semibold tracking-tight">
              Mike’s PRO Handyman<span className="ml-1 align-super text-[0.65em]">™</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-white/80">
            Licensed &amp; insured handyman serving Las Vegas, Henderson &amp; Summerlin. Fast online booking.
          </p>
        </div>

        {/* Nav */}
        <div>
          <h3 className="text-sm font-semibold text-white/90">Navigate</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold text-white/90">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li><a href="tel:+17023515020">(702) 351-5020</a></li>
            <li><a href="mailto:info@MikesProHandyman.com">info@MikesProHandyman.com</a></li>
            <li>Las Vegas • Henderson • Summerlin</li>
            <li className="text-xs text-white/60">Mon–Sat, 8am–6pm</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-4 py-4 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} Mike’s PRO Handyman. All rights reserved.</p>
          <p>*Electrical limited to non-permit service.</p>
        </div>
      </div>
    </footer>
  );
}
