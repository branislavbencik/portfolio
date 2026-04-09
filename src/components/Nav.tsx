import Link from "next/link";

export default function Nav() {
  return (
    <header className="w-full border-y border-zinc-200">
      <nav className="w-full max-w-frame mx-center flex items-center justify-between px-content-x py-5 h-16">
        <Link
          href="/"
          className="type-body-m text-foreground no-underline hover:opacity-60 transition-opacity"
        >
          Branislav Benčík
        </Link>
        <Link
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="type-body-m text-foreground no-underline hover:opacity-60 transition-opacity"
          >
            Resumé
          </Link>
      </nav>
    </header>
  );
}
