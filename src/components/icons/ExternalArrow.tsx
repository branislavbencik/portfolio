interface ExternalArrowProps {
  className?: string;
  size?: number;
}

export function ExternalArrow({ className, size = 14 }: ExternalArrowProps) {
  return (
    <svg
      aria-hidden="true"
      className={className ?? "inline-block ml-1 align-[-0.125em]"}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
    >
      <line x1="5" y1="15" x2="15" y2="5" />
      <polyline points="7,5 15,5 15,13" />
    </svg>
  );
}
