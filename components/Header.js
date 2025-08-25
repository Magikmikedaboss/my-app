// components/Header.js
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = [
    { label: "Home", href: "/" },          // full home page
    { label: "About", href: "/#about" },   // scrolls to about on home
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  // Active state for real routes (not hash links)
  const isActive = (href) => {
    if (href.includes("#")) return false;
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-white/10 bg-gradient-to-b from-blue-950/85 via-slate-950/80 to-blue-950/85 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          {/* Brand */}
          <Link href="/#home" className="flex items-center gap-2 text-white">
            {/* Make sure this image exists at /public/assets/mikelogo.png */}
           
            <span className="font-semibold tracking-tight">
              Mike’s PRO Handyman<span className="ml-1 align-super text-[0.65em]">™</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`rounded-lg px-3 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
                  isActive(href)
                    ? "bg-white/10 text-white"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {label}
              </Link>
            ))}

            <button
              onClick={() => window.HCPWidget?.openModal()}
              className="ml-2 rounded-full bg-blue-500/80 px-3 py-1.5 text-sm text-white ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              Book
            </button>
          </nav>

          {/* Mobile toggle */}
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="text-white md:hidden"
          >
            {!open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t border-white/10 bg-gradient-to-b from-blue-950/95 to-slate-950/95 backdrop-blur-xl">
            <nav className="px-4 py-2">
              {nav.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-white/90 transition hover:bg-white/10 hover:text-white"
                >
                  {label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  window.HCPWidget?.openModal();
                }}
                className="mt-1 w-full rounded-lg bg-blue-500/80 px-3 py-2 text-left text-white ring-1 ring-white/10 transition hover:bg-blue-500"
              >
                Book
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
