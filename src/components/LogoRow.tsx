import Image from "next/image";

interface LogoEntry {
  src: string;
  alt: string;
}

interface LogoRowProps {
  logos: LogoEntry[];
}

export function LogoRow({ logos }: LogoRowProps) {
  return (
    <div className="w-full flex flex-row items-center justify-center flex-wrap gap-16 max-md:gap-10">
      {logos.map((l) => (
        <Image
          key={l.src}
          src={l.src}
          alt={l.alt}
          width={240}
          height={80}
          className="h-16 max-md:h-10 w-auto"
          unoptimized
        />
      ))}
    </div>
  );
}
