import { SelectedProjectContent } from "@/components/SelectedProjectContent";
import SelectedProjectCard from "@/components/SelectedProjectCard";

export default function SakurabookPage() {
  return (
    <>
      <main className="w-full max-w-frame mx-center px-content-x py-detail">
        <SelectedProjectContent
          metadata="SAKURABOOK · 2021"
          headline="Shopify plugin for per-hour booking in Japan"
          description="Hourly booking is common in Japan not just for services but also for spaces. Built a booking plugin for Shopify that handles hourly availability, two storefront templates (one for booking, another for browsing), and the full flow from merchant setup to customer checkout"
          tag="Ecommerce"
          images={[
            {
              src: "/images/sakurabook/sakurabook-thumb.png",
              alt: "Sakurabook booking plugin overview",
            },
            {
              src: "/images/sakurabook/sakurabook-ws1.png",
              caption: "Availability states use Japanese convention: ○ available, △ limited, ✕ taken. Time picker handles overnight spans across two calendar days.",
            },
            {
              src: "/images/sakurabook/sakurabook-ws2.png",
              caption: "Designed in English for easier workflow, localized and shipped in Japanese. Japanese text runs shorter, so layouts are held without overflow adjustment.",
            },
            {
              src: "/images/sakurabook/sakurabook-ws3.png",
              caption: "The merchant-facing plugin, built with Shopify's Polaris Design System and modeled after Google Calendar. Space detail on the left, multi-space dashboard on the right.",
              background: false,
            },
          ]}
        />
      </main>

      {/* Next project — double border (two 1px lines, 8px gap) */}
      <div className="w-full flex flex-col gap-2">
        <div className="border-t border-border-light" />
        <div className="border-t border-border-light" />
      </div>
      <div className="w-full max-w-frame mx-center px-content-x py-detail">
        <div className="max-w-text mx-auto">
          <SelectedProjectCard
            href="/nnspect"
            image="/images/nnspect/nnspect-thumb.png"
            imageAlt="NNspect ML training platform"
            tag="Industrial AI"
            headline="ML training platform for material quality inspection"
            meta="NNSPECT · 2022"
          />
        </div>
      </div>
    </>
  );
}
