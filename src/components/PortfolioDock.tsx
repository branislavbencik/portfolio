"use client"

import React, { useRef, useState, useEffect } from "react"
import Image from "next/image"
import {
  motion,
  AnimatePresence,
  type MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react"
import { usePathname } from "next/navigation"
import Link from "next/link"

/* ── Icons ──────────────────────────────────────────────────────────── */

function IconHome() {
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 3L2 11h3v9h5v-6h4v6h5v-9h3z" />
    </svg>
  )
}

function IconDocument() {
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M22 6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2l10 7 10-7z" />
      <path d="M2 8v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-10 7L2 8z" />
    </svg>
  )
}

function IconGithub() {
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.338c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  )
}

function IconLinkedin() {
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function IconChevronLeft() {
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" />
    </svg>
  )
}

function IconChevronRight() {
  return (
    <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

/* ── Focus ring ─────────────────────────────────────────────────────── */

const focusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-text-inverse focus-visible:ring-offset-1 focus-visible:ring-offset-foreground focus-visible:rounded-[2px]"

/* ── Separator ──────────────────────────────────────────────────────── */

function Sep() {
  return <div className="w-px h-3 bg-text-inverse/20 self-center mx-0.5 shrink-0" aria-hidden="true" />
}

/* ── DockItem — magnifying, for navigation ───────────────────────────── */

function DockItem({
  mouseX,
  label,
  children,
}: {
  mouseX: MotionValue<number>
  label: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return val - bounds.x - bounds.width / 2
  })

  const scaleSpring = useSpring(
    useTransform(distance, [-100, 0, 100], [1, 1.4, 1]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  )

  return (
    <div
      className="relative flex flex-col items-center justify-end"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && (
          <motion.span
            className="absolute bottom-full mb-2 bg-foreground text-text-inverse type-allcaps px-1.5 py-0.5 rounded-[2px] whitespace-nowrap pointer-events-none select-none"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.1 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.div
        ref={ref}
        style={{ scale: scaleSpring }}
        className={`w-7 h-7 max-md:w-11 max-md:h-11 p-1 flex items-center justify-center rounded-[2px] origin-bottom transition-colors ${
          hovered ? "text-text-inverse" : "text-text-inverse/50"
        }`}
      >
        {children}
      </motion.div>
    </div>
  )
}

/* ── ExpandingItem — horizontal expand on hover ──────────────────────── */

type ExpandingItemBase = {
  icon: React.ReactNode
  label: string
  alwaysLabeled?: boolean
  ariaLabel?: string
}

type ExpandingItemLink = ExpandingItemBase & {
  href: string
  target?: string
  rel?: string
  onClick?: never
}

type ExpandingItemButton = ExpandingItemBase & {
  href?: never
  target?: never
  rel?: never
  onClick: () => void
}

type ExpandingItemProps = ExpandingItemLink | ExpandingItemButton

function ExpandingItem({
  icon,
  label,
  alwaysLabeled = false,
  ariaLabel,
  ...rest
}: ExpandingItemProps) {
  const [hovered, setHovered] = useState(false)
  const showLabel = alwaysLabeled || hovered

  const sharedClass = `h-7 flex items-center gap-1.5 px-1.5 rounded-[2px] overflow-hidden transition-colors duration-100 ${
    hovered ? "text-text-inverse" : "text-text-inverse/50"
  } ${focusClass}`

  const content = (
    <>
      <div className="w-5 h-5 shrink-0 flex items-center justify-center">{icon}</div>
      <AnimatePresence>
        {showLabel && (
          <motion.span
            key="label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="type-allcaps whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </>
  )

  if ("href" in rest && rest.href) {
    return (
      <motion.a
        layout
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        href={rest.href}
        target={rest.target}
        rel={rest.rel}
        aria-label={ariaLabel}
        className={sharedClass}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      layout
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      type="button"
      onClick={(rest as ExpandingItemButton).onClick}
      aria-label={ariaLabel}
      className={`${sharedClass} cursor-pointer`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {content}
    </motion.button>
  )
}

/* ── IdentityItem — avatar expands to name on hover ─────────────────── */

function IdentityItem() {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="h-7 flex items-center gap-1.5 px-1.5 rounded-[2px] overflow-hidden self-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src="/images/avatar.jpg"
        alt="Branislav Benčík"
        width={20}
        height={20}
        className="rounded-full object-cover grayscale shrink-0"
        unoptimized
      />
      <AnimatePresence>
        {hovered && (
          <motion.span
            key="name"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="type-allcaps text-text-inverse/60 whitespace-nowrap"
          >
            Branislav Benčík
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ── Dock ────────────────────────────────────────────────────────────── */

interface PortfolioDockProps {
  projects: { slug: string; title: string }[]
}

export default function PortfolioDock({ projects }: PortfolioDockProps) {
  const pathname = usePathname()
  const [mailCopied, setMailCopied] = useState(false)
  const mouseX = useMotionValue(Infinity)
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
    }
  }, [])

  const currentSlug = pathname.replace("/", "")
  const currentIdx = projects.findIndex((p) => p.slug === currentSlug)
  const isProjectPage = currentIdx !== -1

  const prevProject = isProjectPage
    ? projects[(currentIdx - 1 + projects.length) % projects.length]
    : null
  const nextProject = isProjectPage
    ? projects[(currentIdx + 1) % projects.length]
    : null

  function handleMail() {
    navigator.clipboard.writeText("branislav.bencik@gmail.com").then(() => {
      setMailCopied(true)
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current)
      copyTimeoutRef.current = setTimeout(() => setMailCopied(false), 1500)
    })
  }

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <motion.div
        layout
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="bg-foreground rounded-[4px] p-1.5 flex items-end gap-1 shadow-[0_4px_24px_rgba(0,0,0,0.18)]"
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {/* Identity — avatar expands to name on hover */}
        <IdentityItem />

        <Sep />

        {/* Navigation — project pages only */}
        {isProjectPage && prevProject && (
          <DockItem
            mouseX={mouseX}
            label={prevProject.title.length > 32 ? prevProject.title.slice(0, 32) + "…" : prevProject.title}
          >
            <Link
              href={`/${prevProject.slug}`}
              aria-label={`Previous project: ${prevProject.title}`}
              className={`flex items-center justify-center w-full h-full ${focusClass}`}
            >
              <IconChevronLeft />
            </Link>
          </DockItem>
        )}

        {pathname !== "/" && (
          <DockItem mouseX={mouseX} label="Home">
            <Link
              href="/"
              aria-label="Go to home"
              className={`flex items-center justify-center w-full h-full ${focusClass}`}
            >
              <IconHome />
            </Link>
          </DockItem>
        )}

        {isProjectPage && nextProject && (
          <DockItem
            mouseX={mouseX}
            label={nextProject.title.length > 32 ? nextProject.title.slice(0, 32) + "…" : nextProject.title}
          >
            <Link
              href={`/${nextProject.slug}`}
              aria-label={`Next project: ${nextProject.title}`}
              className={`flex items-center justify-center w-full h-full ${focusClass}`}
            >
              <IconChevronRight />
            </Link>
          </DockItem>
        )}

        {isProjectPage && <Sep />}

        {/* Utilities */}
        <ExpandingItem
          icon={<IconDocument />}
          label="Resume"
          alwaysLabeled
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          ariaLabel="View resume"
        />

        <ExpandingItem
          icon={<IconMail />}
          label={mailCopied ? "Copied!" : "Email"}
          onClick={handleMail}
          ariaLabel="Copy email address"
        />

        <ExpandingItem
          icon={<IconGithub />}
          label="GitHub"
          href="https://github.com/branislavbencik"
          target="_blank"
          rel="noopener noreferrer"
          ariaLabel="GitHub profile"
        />

        <ExpandingItem
          icon={<IconLinkedin />}
          label="LinkedIn"
          href="https://www.linkedin.com/in/branislavbencik/"
          target="_blank"
          rel="noopener noreferrer"
          ariaLabel="LinkedIn profile"
        />
      </motion.div>
    </div>
  )
}
