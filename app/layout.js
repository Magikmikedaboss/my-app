import "./globals.css";
import Script from "next/script";
import Header from "../components/Header.js";
import Footer from "../components/Footer.jsx";
import BackgroundCanvas from "../components/BackgroundCanvas.js";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://mikesprohandyman.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Mike’s PRO Handyman",
  description: "Reliable handyman services in Las Vegas — repairs, installs, maintenance.",

  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Mike’s PRO Handyman",
    description: "Reliable handyman services in Las Vegas — repairs, installs, maintenance.",
    images: [
      {
        url: "/og/handyman-home.jpg", // place this in /public/og/handyman-home.jpg
        width: 1200,
        height: 630,
        alt: "Mike’s PRO Handyman",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mike’s PRO Handyman",
    description: "Reliable handyman services in Las Vegas — repairs, installs, maintenance.",
    images: ["/og/handyman-home.jpg"],
  },
};

// Fixes the viewport warning
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1E3A8A",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col text-gray-900">
        {/* Background sits behind everything */}
        <BackgroundCanvas />

        {/* Housecall Pro booking script */}
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
      </body>
    </html>
  );
}
