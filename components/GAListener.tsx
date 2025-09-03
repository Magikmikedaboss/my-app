"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default function GAListener({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!window.gtag || !gaId) return;

    // fire a page_view on route changes
    const page_path = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
    window.gtag("config", gaId, { page_path });
  }, [pathname, searchParams, gaId]);

  return null;
}
