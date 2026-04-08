import React from 'react'

const lines = [
  {
    text: 'I think in systems,',
    tooltip: 'Dependencies, flows, edge cases.\nI see what breaks before it breaks.',
  },
  {
    text: 'design for impact,',
    tooltip: 'I designed platform that teaches financial\nliteracy to every 2nd kid in Czechia.',
  },
  {
    text: '& own the outcome.',
    tooltip: "Strategy. Automation, front-end code,\n live products. I don't stop at the handoff.",
  },
]

function TooltipText({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((part, j) => (
        <React.Fragment key={j}>
          {j > 0 && <br />}
          {part}
        </React.Fragment>
      ))}
    </>
  )
}

export default function HeroStatement() {
  return (
    <section className="py-section">
      <p className="type-allcaps text-foreground-tertiary mb-4">Product Designer</p>

      {/* Desktop: 2-column grid (headlines | tooltip). Tablet: headlines only */}
      <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-x-4 max-lg:grid-cols-1">
        {lines.map(({ text, tooltip }, i) => (
          <React.Fragment key={i}>
            <div>
              <span className="type-display text-foreground">{text}</span>
            </div>

            {/* Desktop tooltip — hidden on tablet */}
            <div className="flex items-start max-lg:hidden">
              <p className="type-subheadline text-foreground">
                <TooltipText text={tooltip} />
              </p>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Tablet: show all tooltips stacked below headlines */}
      <div className="hidden max-lg:flex max-lg:flex-col max-lg:gap-2 mt-6">
        {lines.map(({ tooltip }, i) => (
          <p key={i} className="type-subheadline text-foreground">
            <TooltipText text={tooltip} />
          </p>
        ))}
      </div>
    </section>
  )
}
