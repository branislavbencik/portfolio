import Link from "next/link";

export default function Nav() {
  return (
    <header className="w-full">
      <nav
        className="w-full max-w-[1288px] mx-auto flex items-center justify-between"
        style={{
          paddingTop: "20px",
          paddingBottom: "20px",
          paddingLeft: "80px",
          paddingRight: "80px",
          height: "64px",
        }}
      >
        <Link
          href="/"
          className="text-[16px] font-semibold leading-[1.4] text-[#171717] no-underline hover:opacity-60 transition-opacity"
        >
          Branislav Benčík
        </Link>
        <div className="flex items-center gap-8">
          <Link
            href="/about"
            className="text-[16px] leading-[1.5] text-[#171717] no-underline hover:opacity-60 transition-opacity"
          >
            About
          </Link>
          <Link
            href="/resume"
            className="text-[16px] leading-[1.5] text-[#171717] no-underline hover:opacity-60 transition-opacity"
          >
            Resumé
          </Link>
        </div>
      </nav>
    </header>
  );
}
