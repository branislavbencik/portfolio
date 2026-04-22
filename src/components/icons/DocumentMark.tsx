interface DocumentMarkProps {
  className?: string;
  size?: number;
}

export function DocumentMark({ className, size = 16 }: DocumentMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      <path d="M5 2.5h7l3 3v12h-10z" />
      <path d="M12 2.5v3h3" />
      <line x1="7" y1="9" x2="13" y2="9" />
      <line x1="7" y1="12" x2="13" y2="12" />
      <line x1="7" y1="15" x2="11" y2="15" />
    </svg>
  );
}
