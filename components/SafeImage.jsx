"use client";

import { useState } from "react";

export default function SafeImage({ src, alt = "", className = "" }) {
  const [broken, setBroken] = useState(false);
  if (!src || broken) return null; // hide if missing/broken

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setBroken(true)}
    />
  );
}
