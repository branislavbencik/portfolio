import type { Metadata } from "next";
import AboutEssay from "@/components/about/AboutEssay";
import Bookshelf from "@/components/about/Bookshelf";
import FreeTime from "@/components/about/FreeTime";
import ShellGame from "@/components/about/ShellGame";

export const metadata: Metadata = {
  title: "About | Branislav Benčík",
  description:
    "About Branislav Benčík — utilitarian designer-engineer. Reading list, free time, and a small experiment in interface honesty.",
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <div className="w-full max-w-frame mx-center max-lg:px-content-x pt-32 max-md:pt-16 pb-section">
        <AboutEssay />

        <div className="mt-section">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="type-allcaps leading-none text-text-secondary shrink-0">
              And on the side
            </h2>
            <div
              aria-hidden="true"
              className="relative -top-px h-px bg-surface-2 flex-1"
            />
          </div>
          <div className="grid grid-cols-3 gap-8 max-md:grid-cols-1 max-md:gap-6 items-stretch">
            <Bookshelf />
            <FreeTime />
            <ShellGame />
          </div>
        </div>
      </div>
    </main>
  );
}
