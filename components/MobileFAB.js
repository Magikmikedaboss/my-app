"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function GAListener({ gaId }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag || !gaId) return;
    const qs = searchParams?.toString();
    const page_path = qs ? `${pathname}?${qs}` : pathname;
    window.gtag("config", gaId, { page_path });
  }, [pathname, searchParams, gaId]);

  return null;
}
