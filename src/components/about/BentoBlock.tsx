import { ReactNode } from "react";

type BentoBlockProps = {
  children: ReactNode;
  className?: string;
};

export default function BentoBlock({ children, className = "" }: BentoBlockProps) {
  return (
    <article
      className={`flex flex-col gap-6 p-8 bg-surface-tile border border-surface-2 rounded-md ${className}`}
    >
      {children}
    </article>
  );
}
