'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'

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

const CYCLE_MS = 3500
const sequence = [0, 1, 2]

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
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const stepRef = useRef(1)

  const startCycle = useCallback((fromStep: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    stepRef.current = fromStep
    intervalRef.current = setInterval(() => {
      setActiveIndex(sequence[stepRef.current % sequence.length])
      stepRef.current++
    }, CYCLE_MS)
  }, [])

  useEffect(() => {
    setActiveIndex(0)
    startCycle(1)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [startCycle])

  const handleMouseEnter = (i: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setHoverIndex(i)
  }

  const handleMouseLeave = (i: number) => {
    setHoverIndex(null)
    setActiveIndex(i)
    startCycle(i + 1)
  }

  const effectiveActive = hoverIndex !== null ? hoverIndex : activeIndex

  return (
    <section className="py-section">
      <p className="type-allcaps text-foreground-tertiary mb-4">Product Designer</p>

      {/* Desktop: 2-column grid (headlines | tooltip). Tablet: headlines only */}
      <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-x-4 max-lg:grid-cols-1">
        {lines.map(({ text, tooltip }, i) => {
          const isInactive = effectiveActive !== i
          const colorClass = isInactive ? 'text-foreground opacity-30' : 'text-foreground'

          return (
            <React.Fragment key={i}>
              <div
                className="cursor-default"
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => handleMouseLeave(i)}
              >
                <span className={`type-h1 transition-colors duration-150 ${colorClass}`}>
                  {text}
                </span>
              </div>

              {/* Desktop tooltip — hidden on tablet */}
              <div className="flex items-end pb-1.5 max-lg:hidden">
                <AnimatePresence>
                  {effectiveActive === i && (
                    <motion.p
                      key={i}
                      className="type-subheadline text-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <TooltipText text={tooltip} />
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </React.Fragment>
          )
        })}
      </div>

      {/* Tablet tooltip — shared area below all headlines, hidden on desktop */}
      <div className="hidden max-lg:block mt-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={effectiveActive}
            className="type-subheadline text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <TooltipText text={lines[effectiveActive].tooltip} />
          </motion.p>
        </AnimatePresence>
      </div>
    </section>
  )
}
