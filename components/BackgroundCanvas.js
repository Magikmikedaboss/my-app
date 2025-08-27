import Image from "next/image";

export default function BackgroundCanvas() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10">
      {/* Full-viewport background image */}
      <Image
        src="/painting-exterior--facade-of-new-modern-american-house.jpg"
        alt=""            // decorative
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Overlay for readability (tweak the /40) */}
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
