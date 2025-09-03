// components/GAListener.tsx (or .js)
"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Ensure TypeScript knows about gtag on window
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function GAListener({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Convert searchParams object into a stable string
  const search = useMemo(() => searchParams?.toString() ?? "", [searchParams]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag || !gaId) return;

    const page_path = search ? `${pathname}?${search}` : pathname;

    // Fire GA4 page_view on route changes
    window.gtag("config", gaId, { page_path });
  }, [gaId, pathname, search]);

  return null;
}
