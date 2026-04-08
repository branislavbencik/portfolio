import { CaseStudyCard } from "@/components/CaseStudyCard";
import SelectedProjectCard from "@/components/SelectedProjectCard";
import HeroStatement from "@/components/HeroStatement";

export default function Home() {
  return (
    <main className="w-full max-w-frame mx-center px-content-x">
      <HeroStatement />

      <div className="flex flex-col gap-section pb-section">
        {/* Case study cards — full-width */}
        <div className="flex flex-col gap-case-study">
          <CaseStudyCard
            meta="Skoala · Lead Designer · 2024–25"
            headline="Designing a CMS from scratch"
            highlight="used by 3500+ czech schools"
            primaryHref="/skoala"
            image="/images/skoala/skoala-thumb.png"
            imageAlt="Skoala LMS interface"
          />

          <CaseStudyCard
            meta="Teatime · Co-owner · 2024–25"
            headline="Redesigning a B2B language school"
            highlight="acquired 12 corporate clients"
            primaryHref="/teatime"
            image="/images/teatime/teatime-thumb.png"
            imageAlt="TeaTime language school interface"
          />
        </div>

        {/* More Work grid */}
        <div className="grid grid-cols-3 gap-x-6 gap-y-12 max-lg:grid-cols-2 max-md:grid-cols-1">
          <SelectedProjectCard
            href="/nnspect"
            image="/images/nnspect/nnspect-thumb.png"
            imageAlt="NNspect inspection platform"
            tag="Industrial AI"
            headline="ML training platform for material quality inspection"
            meta="Nnspect · 2022"
          />

          <SelectedProjectCard
            href="/sakurabook"
            image="/images/sakurabook/sakurabook-thumb.png"
            imageAlt="Sakurabook booking app"
            tag="Ecommerce"
            headline="Shopify plugin for per-hour booking in Japan"
            meta="Sakurabook · 2021"
          />

          <SelectedProjectCard
            href="/crowdberry"
            image="/images/crowdberry/crowdberry-thumb.png"
            imageAlt="Crowdberry investment platform"
            tag="Fintech"
            headline="Investment crowdfunding marketplace"
            meta="Crowdberry · 2020"
          />
        </div>
      </div>
    </main>
  );
}
