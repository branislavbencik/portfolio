import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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
        <LightboxProvider>
          <div className="max-w-frame mx-auto min-h-dvh border-x border-zinc-200 bg-canvas">
            <Nav />
            {children}
            <Footer />
          </div>
        </LightboxProvider>
      </body>
    </html>
  );
}
