import type { ServiceRoute } from "@/content/service-routes";

const paths: Record<ServiceRoute, React.ReactNode> = {
  "landing-pages": <><rect x="9" y="10" width="46" height="43" rx="5"/><path d="M9 20h46M16 15h2m4 0h2M17 38l9-9 7 7 6-6 8 8"/><path d="m39 43 8-5-2 9-2-3z"/></>,
  "product-catalogues": <><rect x="8" y="12" width="48" height="40" rx="5"/><path d="M8 22h48M17 30h10v13H17zM35 30h12M35 37h12M35 44h8"/><circle cx="47" cy="17" r="1"/></>,
  "online-stores": <><path d="M10 19h44l-4 11H14zM17 30l2 20h26l2-20M23 19v-5a9 9 0 0 1 18 0v5"/><path d="m26 40 5 5 9-10"/></>,
  "web-applications": <><rect x="8" y="11" width="48" height="42" rx="5"/><path d="M8 22h48M20 22v31M28 32h18M28 40h13M28 47h8"/><circle cx="15" cy="17" r="1"/></>,
  "design-redesign": <><path d="M17 11h27l9 9v29a4 4 0 0 1-4 4H17a5 5 0 0 1-5-5V16a5 5 0 0 1 5-5zM44 11v9h9"/><path d="m20 43 7-18 8 18M23 37h9M39 30l8 9m0-9-8 9"/></>,
  "seo-positioning": <><circle cx="28" cy="28" r="17"/><path d="m41 41 13 13M18 34l8-9 7 5 7-10M18 45h20"/><circle cx="28" cy="28" r="3"/></>,
  cms: <><rect x="8" y="10" width="48" height="44" rx="5"/><path d="M8 20h48M17 30h13M17 37h24M17 44h18M39 28h9v9h-9z"/><circle cx="15" cy="15" r="1"/></>,
  "ai-solutions": <><circle cx="32" cy="32" r="12"/><path d="M32 8v12m0 24v12M8 32h12m24 0h12M15 15l8 8m18 18 8 8m0-34-8 8M23 41l-8 8"/><path d="m27 31 4-6 6 7-4 7z"/></>,
};

export function ServiceGlyph({ kind, className = "" }: { kind: ServiceRoute; className?: string }) {
  return <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{paths[kind]}</svg>;
}
