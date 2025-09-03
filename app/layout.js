import "./globals.css";
import Script from "next/script";
import Header from "../components/Header.js";
import Footer from "../components/Footer.jsx";
import BackgroundCanvas from "../components/BackgroundCanvas.js";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import GAListener from "../components/GAListener"; // ⟵ add this

// Use your live domain if the env is missing
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.mikesprohandyman.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Mike’s PRO Handyman",
  description:
    "Reliable handyman services in Las Vegas — repairs, installs, maintenance.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Mike’s PRO Handyman",
    description:
      "Reliable handyman services in Las Vegas — repairs, installs, maintenance.",
    images: [
      {
        url: "/og/handyman-home.jpg",
        width: 1200,
        height: 630,
        alt: "Mike’s PRO Handyman",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mike’s PRO Handyman",
    description:
      "Reliable handyman services in Las Vegas — repairs, installs, maintenance.",
    images: ["/og/handyman-home.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1E3A8A",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="scroll-smooth">
      <body className="min-h-screen flex flex-col text-gray-900">
        {/* Google Analytics (GA4) — loads on every page */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C0JNELJRWP"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            // initial page load
            gtag('config', 'G-C0JNELJRWP', {
              page_path: window.location.pathname + window.location.search
            });
          `}
        </Script>

        {/* Background sits behind everything */}
        <BackgroundCanvas />

        {/* Housecall Pro booking script (keep only here) */}
        <Script
          src="https://online-booking.housecallpro.com/script.js?token=d4e1ed98b32f451292eb26a710d891f0&orgName=Mikes-Pro-Handyman-service"
          strategy="afterInteractive"
        />

        {/* Content wrapper above the background */}
        <div className="relative z-10 flex-1">
          <Header />
          <main>{children}</main>
        </div>

        {/* Site-wide footer */}
        <Footer />

        {/* SPA route-change tracking for GA4 */}
        <GAListener gaId="G-C0JNELJRWP" />

        {/* Real-user metrics (Web Vitals) */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
