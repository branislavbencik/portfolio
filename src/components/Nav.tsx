import Link from "next/link";

export default function Nav() {
  return (
    <header className="w-full">
      <nav className="w-full border-b border-surface-2 max-w-frame mx-center flex items-center justify-between max-[1320]:px-content-x py-5 h-16">
        <Link
          href="/"
          className="type-body-m text-foreground no-underline hover:opacity-60 motion-safe:transition-opacity"
        >
          Branislav Benčík
        </Link>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="type-body-m text-foreground no-underline hover:opacity-60 motion-safe:transition-opacity"
          aria-label="Resume (opens in new tab)"
        >
         Resume
        </a>
      </nav>
    </header>
  );
}
