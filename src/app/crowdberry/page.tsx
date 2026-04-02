import { SelectedProjectContent } from "@/components/SelectedProjectContent";
import SelectedProjectCard from "@/components/SelectedProjectCard";

export default function CrowdberryPage() {
  return (
    <>
      <main className="w-full max-w-frame mx-center px-content-x py-detail">
        <SelectedProjectContent
          metadata="CROWDBERRY · 2020"
          headline="Investment crowdfunding marketplace"
          description="Designed the investor experience from opportunity browsing through the investment process to portfolio tracking. Usability tested with real investors."
          tag="Fintech"
          images={[
            {
              src: "/images/crowdberry/crowdberry-thumb.png",
              caption: "Each card surfaces key information for quick comparisons - investment type, return rate and minimum entry",
            },
            {
              src: "/images/crowdberry/crowdberry-ws1.png",
              caption: "Split view pairs a guided walkthrough with the actual form.",
            },
            {
              src: "/images/crowdberry/crowdberry-ws2.png",
              caption: "Portfolio Dashboard. An investor sees both where their money is and where each deal stands.",
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
        <div className="grid grid-cols-2 gap-6 max-lg:gap-16 max-lg:grid-cols-1">
          <SelectedProjectCard
            href="/sakurabook"
            image="/images/sakurabook/sakurabook-thumb.png"
            imageAlt="Sakurabook booking plugin overview"
            tag="Ecommerce"
            headline="Shopify plugin for per-hour booking in Japan"
            meta="SAKURABOOK · 2021"
          />
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
