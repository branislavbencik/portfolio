import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

import ConsoleEasterEgg from "@/components/ConsoleEasterEgg";
import TabAttention from "@/components/TabAttention";
import { LightboxProvider } from "@/components/LightboxContext";
import "./globals.css";

const siteUrl = "https://branislavbencik.com";

export const metadata: Metadata = {
  title: "Branislav Benčík | Product Designer",
  description: "Portfolio of Branislav Benčík. Senior product designer who thinks in systems and codes well enough to build them.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Branislav Benčík | Product Designer",
    description: "Portfolio of Branislav Benčík. Senior product designer who thinks in systems and codes well enough to build them.",
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
    description: "Portfolio of Branislav Benčík. Senior product designer who thinks in systems and codes well enough to build them.",
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
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
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
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-text-primary focus:text-text-inverse focus:px-4 focus:py-2 focus:rounded-[4px] focus:type-body-m focus:outline-none"
        >
          Skip to content
        </a>
        <ConsoleEasterEgg />
        <TabAttention />
        <LightboxProvider>
          <div className="min-h-dvh flex flex-col">
            <Nav />
            <div className="max-w-frame mx-auto w-full flex-1 bg-canvas">
              {children}
            </div>
            <Footer />
          </div>
        </LightboxProvider>
      </body>
    </html>
  );
}
