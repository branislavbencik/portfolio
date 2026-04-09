import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CuriouserText from "@/components/CuriouserText";
import { LightboxProvider } from "@/components/LightboxContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Branislav Benčík — Product Designer",
  description: "Portfolio of Branislav Benčík, Senior Product Designer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* SVG grain filter — referenced by .grain-overlay via filter: url(#grain) */}
        <svg style={{ display: "none" }} aria-hidden="true">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.08" />
            </feComponentTransfer>
          </filter>
        </svg>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-foreground focus:text-text-inverse focus:px-4 focus:py-2 focus:rounded-[4px] focus:type-body-m focus:outline-none"
        >
          Skip to content
        </a>
        <LightboxProvider>
          <div className="max-w-frame mx-auto min-h-dvh border-x border-surface-2 bg-canvas">
            <Nav />
            {children}
            <Footer />
            <CuriouserText />
          </div>
        </LightboxProvider>
      </body>
    </html>
  );
}
