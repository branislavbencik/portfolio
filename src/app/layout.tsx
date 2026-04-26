import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import localFont from "next/font/local";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// VC Honey Banner cut — multi-weight loader for display sizes (40px+).
// Banner has tighter spacing and more refined apertures, designed for headlines.
const vcHoney = localFont({
  src: [
    { path: "../fonts/VCHoney-LightBanner.woff2", weight: "300", style: "normal" },
    { path: "../fonts/VCHoney-RegularBanner.woff2", weight: "400", style: "normal" },
    { path: "../fonts/VCHoney-SemiBoldBanner.woff2", weight: "600", style: "normal" },
    { path: "../fonts/VCHoney-BoldBanner.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-vc-honey",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

// VC Honey Deck cut — for serif at body/lede sizes (18-32px).
// Banner cut above is for display sizes (40px+); Deck has chunkier strokes
// and more open apertures, designed to read at smaller sizes.
const vcHoneyDeck = localFont({
  src: [
    { path: "../fonts/VCHoney-LightDeck.woff2", weight: "300", style: "normal" },
    { path: "../fonts/VCHoney-RegularDeck.woff2", weight: "400", style: "normal" },
    { path: "../fonts/VCHoney-SemiBoldDeck.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-vc-honey-deck",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

import ConsoleEasterEgg from "@/components/ConsoleEasterEgg";
import TabAttention from "@/components/TabAttention";
import CursorFollower from "@/components/CursorFollower";
import { LightboxProvider } from "@/components/LightboxContext";
import "./globals.css";

const siteUrl = "https://branislavbencik.com";

export const metadata: Metadata = {
  title: "Branislav Benčík | Product Designer",
  description: "Portfolio of Branislav Benčík. Product designer fluent in B2B systems and code.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Branislav Benčík | Product Designer",
    description: "Portfolio of Branislav Benčík. Product designer fluent in B2B systems and code.",
    url: siteUrl,
    siteName: "Branislav Benčík",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/avatar.jpg",
        width: 400,
        height: 400,
        alt: "Branislav Benčík",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Branislav Benčík | Product Designer",
    description: "Portfolio of Branislav Benčík. Product designer fluent in B2B systems and code.",
    images: ["/images/avatar.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Font variable classes go on <html> so the CSS variables (--font-geist-sans,
    // --font-geist-mono, --font-vc-honey, --font-vc-honey-deck) live at :root.
    // If they sit on <body>, Tailwind 4's `@theme inline { --font-mono: var(--font-geist-mono) }`
    // declaration at :root computes to invalid (because --font-geist-mono isn't at :root yet),
    // and every `var(--font-mono)` reference silently falls back to inherited sans.
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${vcHoney.variable} ${vcHoneyDeck.variable}`}
    >
      <body className="antialiased">
        {/* SVG grain filter — referenced by .grain-overlay via filter: url(#grain) */}
        <svg className="hidden" aria-hidden="true">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.08" />
            </feComponentTransfer>
          </filter>
        </svg>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-text-primary focus:text-text-inverse focus:px-4 focus:py-2 focus:rounded-sm focus:type-body focus:outline-none"
        >
          Skip to content
        </a>
        <ConsoleEasterEgg />
        <TabAttention />
        <CursorFollower />
        <LightboxProvider>
          <div className="min-h-dvh flex flex-col">
            <Nav />
            <div className="max-w-frame mx-auto w-full flex-1">
              {children}
            </div>
            <Footer />
          </div>
        </LightboxProvider>
      </body>
    </html>
  );
}
