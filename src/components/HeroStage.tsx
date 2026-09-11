"use client";

import { useEffect, useRef } from "react";

/**
 * Dual-layer mascot like ilyadotgr:
 * - base: clean character
 * - reveal: full composite (props in front + behind) with flashlight mask
 * Desktop: pointer flashlight. Mobile: soft static peek of the reveal layer.
 */
export function HeroStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const reveal = revealRef.current;
    if (!stage || !reveal) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 819px)").matches;
    const staticPeek = reduced || coarse || narrow;

    const clearToPeek = () => {
      reveal.style.webkitMaskImage = "none";
      reveal.style.maskImage = "none";
      reveal.classList.add("hero-reveal--peek");
    };

    if (staticPeek) {
      clearToPeek();
      return;
    }

    reveal.classList.remove("hero-reveal--peek");

    const state = {
      targetX: 280,
      targetY: 240,
      x: 280,
      y: 240,
      radius: 220,
      running: false,
      visible: true,
      raf: 0,
    };

    const applyMask = (x: number, y: number, radius: number) => {
      const mask = `radial-gradient(circle ${radius}px at ${x}px ${y}px, black 0%, black 42%, rgba(0,0,0,0.68) 60%, rgba(0,0,0,0.2) 78%, transparent 100%)`;
      reveal.style.webkitMaskImage = mask;
      reveal.style.maskImage = mask;
    };

    const onPointer = (event: PointerEvent) => {
      const rect = reveal.getBoundingClientRect();
      state.targetX = event.clientX - rect.left;
      state.targetY = event.clientY - rect.top;
    };

    const tick = () => {
      if (!state.running) return;
      const width = reveal.clientWidth || 600;
      const ease = 0.12;
      state.x += (state.targetX - state.x) * ease;
      state.y += (state.targetY - state.y) * ease;
      state.radius = Math.min(width * 0.3, 240);
      applyMask(state.x, state.y, state.radius);
      state.raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (document.hidden || !state.visible || state.running) return;
      state.running = true;
      state.raf = requestAnimationFrame(tick);
    };

    const stop = () => {
      state.running = false;
      cancelAnimationFrame(state.raf);
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        state.visible = entries.some((entry) => entry.isIntersecting);
        if (state.visible) start();
        else stop();
      },
      { threshold: 0.05 },
    );

    observer.observe(stage);
    const hero = stage.closest(".hero") ?? document;
    hero.addEventListener("pointermove", onPointer as EventListener, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    const boot = () => {
      state.targetX = (reveal.clientWidth || 600) * 0.55;
      state.targetY = (reveal.clientHeight || 700) * 0.38;
      state.x = state.targetX;
      state.y = state.targetY;
      applyMask(state.x, state.y, Math.min((reveal.clientWidth || 600) * 0.3, 240));
      start();
    };

    if (reveal.complete && reveal.naturalWidth > 0) boot();
    else reveal.addEventListener("load", boot, { once: true });

    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      hero.removeEventListener("pointermove", onPointer as EventListener);
    };
  }, []);

  return (
    <div ref={stageRef} className="hero-stage" aria-hidden="true">
      <div className="hero-stage__glow" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hero-mascot"
        src="/mascot/mascot-base.webp"
        alt=""
        width={900}
        height={900}
        decoding="async"
        fetchPriority="high"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={revealRef}
        className="hero-reveal"
        src="/mascot/mascot-reveal.webp"
        alt=""
        width={900}
        height={900}
        decoding="async"
        fetchPriority="low"
      />
    </div>
  );
}
