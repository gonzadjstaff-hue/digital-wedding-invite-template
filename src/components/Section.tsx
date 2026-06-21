import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export function Section({ children, className = "" }: SectionProps) {
  return <section className={`section reveal ${className}`}>{children}</section>;
}

export function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <span />
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3l1.8 5.5H19l-4.6 3.4L16.2 18 12 14.6 7.8 18l1.8-6.1L5 8.5h5.2L12 3z"
          stroke="currentColor"
          strokeWidth="0.8"
        />
      </svg>
      <span />
    </div>
  );
}
