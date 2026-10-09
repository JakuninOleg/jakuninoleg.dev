"use client";

export function ResumePrintButton({ label, className }: { label: string; className?: string }) {
  return <button type="button" className={className} onClick={() => window.print()}>{label} <span aria-hidden="true">↗</span></button>;
}
