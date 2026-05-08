interface LockProps {
  className?: string;
  size?: number;
}

export function Lock({ className, size = 12 }: LockProps) {
  return (
    <svg
      aria-hidden="true"
      className={className ?? "inline-block mr-1 align-[-0.125em]"}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
    >
      <rect x="4" y="9" width="12" height="9" rx="1" />
      <path d="M7 9 V6 a3 3 0 0 1 6 0 V9" />
    </svg>
  );
}
