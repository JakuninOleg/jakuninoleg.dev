"use client";

/** Static hero mascot — no reveal layer. */
export function HeroStage() {
  return (
    <div className="hero-stage" aria-hidden="true">
      <div className="hero-stage__glow" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hero-mascot"
        src="/mascot/mascot-base.webp?v=face-clean3"
        alt=""
        width={900}
        height={900}
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
}
