"use client";

import { useState } from "react";
import HoverPreview from "@/components/playground/HoverPreview";
import {
  LedeV1Status,
  LedePlayground,
  type TextColor,
  type LinkColor,
  type Underline,
} from "@/components/playground/HeroCitationsVariant";

type ThumbWidth = 240 | 280 | 320;
type CardStyle = "light" | "museum" | "casestudy";
type Shadow = "on" | "off";

// Explicit class maps — Tailwind 4's content scanner doesn't detect
// classes built via template literals like `thumb-${w}`. Static maps
// keep literal class strings in source for the candidate detector.
const THUMB_CLASS: Record<ThumbWidth, string> = {
  240: "thumb-240",
  280: "thumb-280",
  320: "thumb-320",
};
const CARD_STYLE_CLASS: Record<CardStyle, string> = {
  light: "card-style-light",
  museum: "card-style-museum",
  casestudy: "card-style-casestudy",
};
const SHADOW_CLASS: Record<Shadow, string> = {
  on: "shadow-on",
  off: "shadow-off",
};

const TEXT_COLOR_OPTIONS: { value: TextColor; label: string }[] = [
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
  { value: "tertiary", label: "Tertiary" },
];
const LINK_COLOR_OPTIONS: { value: LinkColor; label: string }[] = [
  { value: "primary", label: "Primary" },
  { value: "secondary", label: "Secondary" },
  { value: "tertiary", label: "Tertiary" },
  { value: "blue", label: "Blue" },
];
const UNDERLINE_OPTIONS: { value: Underline; label: string }[] = [
  { value: "on", label: "On" },
  { value: "off", label: "Off" },
];
const THUMB_WIDTH_OPTIONS: { value: ThumbWidth; label: string }[] = [
  { value: 240, label: "240px" },
  { value: 280, label: "280px" },
  { value: 320, label: "320px" },
];
const CARD_STYLE_OPTIONS: { value: CardStyle; label: string }[] = [
  { value: "light", label: "Light chrome" },
  { value: "museum", label: "Museum label" },
  { value: "casestudy", label: "Case study" },
];
const SHADOW_OPTIONS: { value: Shadow; label: string }[] = [
  { value: "on", label: "On" },
  { value: "off", label: "Off" },
];

function ToggleGroup<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="type-allcaps text-text-secondary">{label}</span>
      <div className="flex border border-surface-2 rounded-md overflow-hidden">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={String(opt.value)}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={active}
              className={`type-caption font-mono px-3 py-1.5 transition-colors ${
                active
                  ? "bg-surface-2 text-text-primary font-medium"
                  : "bg-canvas text-text-secondary hover:text-text-primary"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function HeroCitationsPlaygroundPage() {
  const [textColor, setTextColor] = useState<TextColor>("primary");
  const [linkColor, setLinkColor] = useState<LinkColor>("primary");
  const [underline, setUnderline] = useState<Underline>("on");
  const [thumbWidth, setThumbWidth] = useState<ThumbWidth>(280);
  const [cardStyle, setCardStyle] = useState<CardStyle>("museum");
  const [shadow, setShadow] = useState<Shadow>("on");

  const wrapperClass = `${THUMB_CLASS[thumbWidth]} ${CARD_STYLE_CLASS[cardStyle]} ${SHADOW_CLASS[shadow]}`;

  return (
    <main className={wrapperClass}>
      <HoverPreview />

      <header className="max-w-frame mx-center max-lg:px-content-x pt-section pb-section">
        <p className="type-allcaps text-text-secondary mb-3">Design lab</p>
        <h1 className="type-heading text-text-primary mb-4">Hero citation variants — parametrized exploration</h1>
        <p className="type-body text-text-secondary max-w-column">
          Six toggle axes across text color, link color, underline, thumb width, card style, and shadow.
          The V1 reference (live shipping baseline) sits at the top — not affected by toggles. The V6++
          playground below reacts to the sticky bar in real time. On touch devices the hover preview
          renders into a fixed slot below the lede; first tap previews, second tap navigates.
        </p>
      </header>

      <section className="border-b border-surface-2">
        <div className="max-w-frame mx-center max-lg:px-content-x py-section">
          <header className="mb-12 max-w-column">
            <p className="type-allcaps text-text-secondary mb-2">Variant V1</p>
            <h2 className="type-subheading text-text-primary mb-2">Reference — live shipping baseline (status quo)</h2>
            <p className="type-caption text-text-secondary font-mono">
              Superscript mono chips with parens + arrow. The current `/` hero. Shown for delta only — not affected by toggles.
            </p>
          </header>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-0">
              <p className="type-byline text-text-primary">Hi, I&apos;m Branislav,</p>
              <h3 className="type-display text-text-primary">Generalist Product Designer.</h3>
            </div>
            <LedeV1Status />
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-40 bg-canvas border-b border-surface-2">
        <div className="max-w-frame mx-center max-lg:px-content-x py-4 flex flex-wrap gap-6 items-end">
          <ToggleGroup
            label="Text color"
            options={TEXT_COLOR_OPTIONS}
            value={textColor}
            onChange={setTextColor}
          />
          <ToggleGroup
            label="Link color"
            options={LINK_COLOR_OPTIONS}
            value={linkColor}
            onChange={setLinkColor}
          />
          <ToggleGroup
            label="Underline"
            options={UNDERLINE_OPTIONS}
            value={underline}
            onChange={setUnderline}
          />
          <ToggleGroup
            label="Thumb width"
            options={THUMB_WIDTH_OPTIONS}
            value={thumbWidth}
            onChange={setThumbWidth}
          />
          <ToggleGroup
            label="Card style"
            options={CARD_STYLE_OPTIONS}
            value={cardStyle}
            onChange={setCardStyle}
          />
          <ToggleGroup
            label="Shadow"
            options={SHADOW_OPTIONS}
            value={shadow}
            onChange={setShadow}
          />
        </div>
      </div>

      <section>
        <div className="max-w-frame mx-center max-lg:px-content-x py-section">
          <header className="mb-12 max-w-column">
            <p className="type-allcaps text-text-secondary mb-2">Variant V6++</p>
            <h2 className="type-subheading text-text-primary mb-2">Parametrized — flip toggles above</h2>
            <p className="type-caption text-text-secondary font-mono">
              text={textColor} · link={linkColor} · underline={underline} · {thumbWidth}px · {cardStyle} · shadow={shadow}
            </p>
          </header>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-0">
              <p className="type-byline text-text-primary">Hi, I&apos;m Branislav,</p>
              <h3 className="type-display text-text-primary">Generalist Product Designer.</h3>
            </div>
            <LedePlayground textColor={textColor} linkColor={linkColor} underline={underline} />
          </div>
        </div>
      </section>
    </main>
  );
}
