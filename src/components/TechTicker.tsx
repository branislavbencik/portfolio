"use client";

const ITEMS = [
  "Claude Code",
  "n8n",
  "React",
  "Next.js",
  "LLM Orchestration",
  "Prompt Engineering",
  "p5.js",
  "AI Automation",
];

function TickerSet() {
  return (
    <>
      {ITEMS.map((item, i) => (
        <span key={i} className="type-body-s text-text-inverse opacity-50 whitespace-nowrap">
          {item}
        </span>
      ))}
    </>
  );
}

function TickerRow() {
  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-8 w-max animate-ticker-left"
        aria-hidden="true"
      >
        <TickerSet />
        <TickerSet />
        <TickerSet />
        <TickerSet />
      </div>
    </div>
  );
}

export function TechTicker() {
  return (
    <div className="w-full bg-foreground py-4 overflow-hidden" aria-hidden="true">
      <TickerRow />
    </div>
  );
}
