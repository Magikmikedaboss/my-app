"use client";

export default function BookNowButton({ children = "📅 Book Online — 60s", className = "", ariaLabel = "Open fast online booking" }) {
  return (
    <button
      type="button"
      onClick={() => window.HCPWidget?.openModal()}
      aria-label={ariaLabel}
      className={className || "btn btn-primary-glass btn-shine"}
    >
      {children}
    </button>
  );
}
