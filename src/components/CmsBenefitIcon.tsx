import type { ReactNode } from "react";

const icons: ReactNode[] = [
  <>
    <path d="M17 15h25l7 7v31H17a4 4 0 0 1-4-4V19a4 4 0 0 1 4-4Z" />
    <path d="M42 15v8h7M22 32h18M22 39h18M22 46h11" />
    <path className="accent" d="M22 25h10" />
  </>,
  <>
    <rect x="10" y="14" width="44" height="39" rx="3" />
    <path d="M10 24h44M17 31h13v14H17zM37 31h10M37 38h10M37 45h8M17 49h30" />
    <path className="accent" d="M17 19h15" />
  </>,
  <>
    <rect x="15" y="10" width="41" height="38" rx="3" />
    <rect x="9" y="17" width="41" height="38" rx="3" />
    <circle className="accent" cx="20" cy="28" r="3" />
    <path d="m14 47 11-11 8 7 6-6 6 6M15 49h29" />
  </>,
  <>
    <path d="M17 10h24l7 7v21M41 10v8h7M15 46V14a4 4 0 0 1 4-4M22 25h18M22 32h14" />
    <path d="M19 45s6-8 16-8 16 8 16 8-6 8-16 8-16-8-16-8Z" />
    <circle className="accent" cx="35" cy="45" r="4" />
  </>,
  <>
    <rect x="10" y="12" width="44" height="40" rx="4" />
    <path d="M10 21h44M18 30h27M18 38h27M18 46h27" />
    <circle className="accent" cx="29" cy="30" r="3" />
    <circle className="accent" cx="40" cy="38" r="3" />
    <circle className="accent" cx="25" cy="46" r="3" />
  </>,
];

export function CmsBenefitIcon({ index, className }: { index: number; className?: string }) {
  return <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{icons[index]}</svg>;
}
