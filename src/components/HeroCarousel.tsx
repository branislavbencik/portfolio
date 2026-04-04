"use client"

import { useRef, useState } from "react"
import TextRotate, { TextRotateRef } from "./TextRotate"

const TEXTS = [
  "👋 Hi, I'm Branislav Benčík",
  "🏰 Prague Based Product Designer",
  "🧠 I like to think in systems rather than screens.",
  "I'm too lazy, adhd and impatient to specialize and to hone the craft.",
  "Happy to see the AI Era coming to help with that specialist stuff.",
  "🎓 I studied Computer Science and then Philosophy. I still have 0 degrees and 0 regrets.",
  "I'm so lazy that i build my personal philosophy about the fact that laziness is a gift",
  "This site is built with Claude Code. The animation you see is kindly stolen from fancycomponents.dev",
  "I'm amateur DJ. In a rare case you like percussive global bass, listen to this https://leese.bandcamp.com/track/roep",
  "I do contemporary circus.",
  "I love to cook. Here's how you make excellent traditional Italian Carbonara.",
  "🍄 I'm psychonaut. I support deregulation of psychedlics. I have psychedelic training. https://beyondpsychedelics.cz/vzdelavani/psychedelicke-minimum/",
  "That's enough, this is slowly becoming the doomsclicking",
  "Seriously. Read some book. My favorite is Sapiens.",
  "Or make yourself excellent traditional Italian Carbonara.",
]

export default function HeroCarousel() {
  const textRotateRef = useRef<TextRotateRef>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const isFirst = currentIndex === 0
  const isLast = currentIndex === TEXTS.length - 1

  return (
    <div className="mt-section">
      <div className="flex items-center gap-6 mb-12">
        <button
          onClick={() => textRotateRef.current?.previous()}
          aria-label="Previous"
          disabled={isFirst}
          className={`type-h3 text-foreground transition-opacity cursor-pointer bg-transparent border-0 p-0 ${
            isFirst ? "opacity-20" : "hover:opacity-60"
          }`}
        >
          ←
        </button>
        <button
          onClick={() => textRotateRef.current?.next()}
          aria-label="Next"
          disabled={isLast}
          className={`type-h3 text-foreground transition-opacity cursor-pointer bg-transparent border-0 p-0 ${
            isLast ? "invisible" : "hover:opacity-60"
          }`}
        >
          →
        </button>
      </div>


      <div className="min-h-hero">
        <TextRotate
          ref={textRotateRef}
          texts={TEXTS}
          as="h1"
          auto={false}
          loop={false}
          splitBy="lines"
          animatePresenceMode="wait"
          initial={{ x: "100%", y: 0, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ x: "-100%", y: 0, opacity: 0 }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          onNext={setCurrentIndex}
           rotationInterval={500}
          mainClassName="type-h1 text-foreground"
        />
      </div>


    </div>
  )
}
