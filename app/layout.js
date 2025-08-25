// app/layout.js
import "./globals.css";
import Script from "next/script";
import Header from "../components/Header.js";
import Footer from "../components/Footer.jsx";
import BackgroundCanvas from "../components/BackgroundCanvas.js";

export const metadata = {
  title: "Mike’s PRO Handyman",
  description: "Reliable handyman services in Las Vegas — repairs, installs, maintenance.",
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
      {/* Make the page a flex column so the footer sits at the bottom */}
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

        {/* Site-wide footer (now visible) */}
        <Footer />
      </body>
    </html>
  );
}
