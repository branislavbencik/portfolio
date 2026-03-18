import Image from "next/image";
import Link from "next/link";
import SelectedProjectCard from "@/components/SelectedProjectCard";

export default function Home() {
  return (
    <main
      className="w-full max-w-[1288px] mx-auto"
      style={{ paddingLeft: "80px", paddingRight: "80px" }}
    >
      {/* ── Case Studies ───────────────────────────────────────── */}
      <section style={{ paddingTop: "100px", paddingBottom: "100px" }}>
        <h1
          className="font-semibold text-[#171717]"
          style={{
            fontSize: "64px",
            lineHeight: "1",
            letterSpacing: "-0.04em",
            marginBottom: "64px",
          }}
        >
          Case studies
        </h1>

        <div className="flex flex-col" style={{ gap: "48px" }}>
          {/* Skoala */}
          <CaseStudyCard
            meta="SKOALA · LEAD DESIGNER · 2024–25"
            headline="Building yet another CMS"
            description="How to allow editors to produce diverse content at scale while keeping zero recurring development cost"
            highlight={
              <>
                🏆 Used by <strong>over 50%</strong> of Czech Schools
              </>
            }
            primaryHref="/skoala"
            secondaryLabel="View live"
            secondaryHref="https://skoala.cz"
            image="/images/skoala/skoala-thumb.png"
            imageAlt="Skoala LMS interface"
          />

          <hr className="border-0 border-t border-[rgba(23,23,23,0.12)]" />

          {/* TeaTime */}
          <CaseStudyCard
            meta="TEATIME · CO-OWNER · 2024–25"
            headline="Redesigning a B2B language school"
            description="How to give every student a different curriculum and still get comparable progress data"
            highlight={
              <>
                🏆 Acquired <strong>12</strong> corporate clients
              </>
            }
            primaryHref="/teatime"
            secondaryLabel="View website"
            secondaryHref="https://teatime.cz"
            image="/images/teatime/teatime-thumb.png"
            imageAlt="TeaTime language school interface"
          />
        </div>
      </section>

      {/* ── Selected Projects ──────────────────────────────────── */}
      <section
        style={{
          paddingTop: "100px",
          paddingBottom: "100px",
          borderTop: "1px solid rgba(23,23,23,0.12)",
        }}
      >
        <h2
          className="font-semibold text-[#171717]"
          style={{
            fontSize: "64px",
            lineHeight: "1",
            letterSpacing: "-0.04em",
            marginBottom: "64px",
          }}
        >
          Selected projects
        </h2>

        <div className="grid grid-cols-2" style={{ gap: "12px" }}>
          <SelectedProjectCard
            href="/nnspect"
            image="/images/nnspect/nnspect-thumb.png"
            imageAlt="NNspect inspection platform"
            tag="Industrial AI"
            headline="ML training platform for material quality inspection"
            meta="NNSPECT · 2022"
          />
          <SelectedProjectCard
            href="/sakurabook"
            image="/images/sakurabook/sakurabook-thumb.png"
            imageAlt="Sakurabook booking app"
            tag="Ecommerce"
            headline="Shopify plugin for per-hour booking in Japan"
            meta="SAKURABOOK · 2021"
          />
        </div>
      </section>

      {/* Spacer */}
      <div style={{ height: "100px" }} />
    </main>
  );
}

// ── Case study card ────────────────────────────────────────────────

interface CaseStudyCardProps {
  meta: string;
  headline: string;
  description: string;
  highlight: React.ReactNode;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  image: string;
  imageAlt: string;
}

function CaseStudyCard({
  meta,
  headline,
  description,
  highlight,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  image,
  imageAlt,
}: CaseStudyCardProps) {
  return (
    <div className="flex items-start" style={{ gap: "48px" }}>
      {/* Left — text ~35% */}
      <div className="flex flex-col" style={{ flex: "0 0 35%", gap: "20px" }}>
        <p
          className="text-[14px] font-medium leading-[1.4] tracking-[0.05em] uppercase opacity-50"
        >
          {meta}
        </p>
        <h2
          className="font-semibold text-[#171717]"
          style={{ fontSize: "40px", lineHeight: "1.1", letterSpacing: "-0.04em" }}
        >
          {headline}
        </h2>
        <p className="text-[18px] leading-[1.5] text-[#171717] opacity-70">
          {description}
        </p>
        <p className="text-[16px] leading-[1.5] text-[#171717]">{highlight}</p>
        <div className="flex items-center gap-5 flex-wrap" style={{ marginTop: "8px" }}>
          <Link
            href={primaryHref}
            className="inline-block px-5 py-3 bg-[#171717] text-white text-[16px] font-semibold leading-[1.4] rounded-sm no-underline hover:bg-black transition-colors"
          >
            View Case Study
          </Link>
          <a
            href={secondaryHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[16px] leading-[1.4] text-[#171717] no-underline hover:opacity-60 transition-opacity"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-[#22c55e]" />
            {secondaryLabel}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Right — image ~65% */}
      <div className="flex-1 min-w-0">
        <Link href={primaryHref} className="block">
          <div className="w-full overflow-hidden rounded-md border border-[rgba(23,23,23,0.08)] bg-[#f5f5f5]">
            <Image
              src={image}
              alt={imageAlt}
              width={2232}
              height={1296}
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
