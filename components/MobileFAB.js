// components/MobileFab.js
"use client";

import { useEffect, useState } from "react";

export default function MobileFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={[
        "fixed bottom-4 right-4 z-50 flex flex-col gap-3 md:hidden transition-all duration-500",
        visible ? "visible opacity-100 translate-y-0" : "invisible opacity-0 translate-y-10",
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
        onClick={() => window.HCPWidget?.openModal()}
        aria-label="Book Now"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-blue-700 ring-1 ring-gray-300 shadow"
      >
        📅
      </button>
    </div>
  );
}
