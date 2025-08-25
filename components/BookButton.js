"use client";

export default function BookButton({
  label = "📅 Book Online — 60s",
  variant = "glass",      // "glass" | "solid"
  className = "",
}) {
  const handleClick = () => {
    try {
      if (window?.HCPWidget?.openModal) {
        window.HCPWidget.openModal();
      } else {
        console.warn("Housecall Pro script not loaded yet.");
        // graceful fallback: scroll to #contact if it exists
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      console.error("Booking modal error:", err);
    }
  };

  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 " +
    "font-medium transition hover:-translate-y-0.5 hover:shadow focus:outline-none focus:ring-2";

  const styles =
    variant === "glass"
      ? "text-white border border-white/15 ring-1 ring-white/10 " +
        "bg-white/10 hover:bg-white/15 backdrop-blur-md backdrop-saturate-150"
      : "bg-blue-600 text-white ring-1 ring-blue-300 hover:bg-blue-700";

  return (
    <button type="button" onClick={handleClick} className={`${base} ${styles} ${className}`}>
      {label}
    </button>
  );
}
