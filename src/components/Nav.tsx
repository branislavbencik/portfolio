import Link from "next/link";

export default function Nav() {
  return (
    <header className="w-full">
      <nav className="w-full max-w-frame mx-auto flex items-center justify-between px-nav-x py-nav-y h-16">
        <Link
          href="/"
          className="type-body-m text-foreground no-underline hover:opacity-60 transition-opacity"
        >
          Branislav Benčík
        </Link>
        <div className="flex items-center gap-8 max-lg:gap-4">
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="type-body-m text-foreground no-underline hover:opacity-60 transition-opacity"
          >
            Resumé
          </Link>
        </div>
      </nav>
    </header>
  );
}
