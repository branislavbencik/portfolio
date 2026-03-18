import Image from "next/image";
import Link from "next/link";

interface SelectedProjectCardProps {
  href: string;
  image: string;
  imageAlt: string;
  tag: string;
  headline: string;
  meta: string;
}

export default function SelectedProjectCard({
  href,
  image,
  imageAlt,
  tag,
  headline,
  meta,
}: SelectedProjectCardProps) {
  return (
    <Link href={href} className="group flex flex-col no-underline text-[#171717]" style={{ gap: "8px" }}>
      {/* Thumbnail */}
      <div className="w-full overflow-hidden rounded-sm border border-[rgba(23,23,23,0.1)] bg-[#f5f5f5]">
        <Image
          src={image}
          alt={imageAlt}
          width={2232}
          height={1520}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col" style={{ gap: "4px" }}>
        <h3 className="text-[18px] font-semibold leading-[1.5] group-hover:opacity-70 transition-opacity">
          {headline}
        </h3>
        <p className="text-[14px] font-medium leading-[1.4] tracking-[0.05em] uppercase opacity-50">
          {meta}
        </p>
        <div className="pt-1">
          <span className="inline-block px-3 py-1 rounded-full border border-[#171717] text-[14px] font-medium leading-[1.4] tracking-[0.05em] uppercase">
            {tag}
          </span>
        </div>
      </div>
    </Link>
  );
}
