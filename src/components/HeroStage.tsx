"use client";

import { useEffect, useRef } from "react";

/**
 * Fixed mascot + flashlight stickers (Ilya-style).
 * Base character never changes. Reveal layer is stickers-only.
 * Flashlight reveal: desktop pointer only. Mobile shows a soft peek.
 */
export function HeroStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const stickersRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const stickers = stickersRef.current;
    if (!stage || !stickers) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 819px)").matches;
    const staticPeek = reduced || coarse || narrow;

    const clearMask = () => {
      stickers.style.webkitMaskImage = "none";
      stickers.style.maskImage = "none";
      stickers.classList.add("hero-stickers--peek");
    };

    if (staticPeek) {
      clearMask();
      return;
    }

    stickers.classList.remove("hero-stickers--peek");

    const state = {
      targetX: 280,
      targetY: 240,
      x: 280,
      y: 240,
      radius: 200,
      running: false,
      visible: true,
      raf: 0,
    };

    const applyMask = (x: number, y: number, radius: number) => {
      const mask = `radial-gradient(circle ${radius}px at ${x}px ${y}px, black 0%, black 42%, rgba(0,0,0,0.7) 58%, rgba(0,0,0,0.2) 78%, transparent 100%)`;
      stickers.style.webkitMaskImage = mask;
      stickers.style.maskImage = mask;
    };

    const onPointer = (event: PointerEvent) => {
      const rect = stickers.getBoundingClientRect();
      state.targetX = event.clientX - rect.left;
      state.targetY = event.clientY - rect.top;
    };

    const tick = () => {
      if (!state.running) return;
      const width = stickers.clientWidth || 600;

      const ease = 0.12;
      state.x += (state.targetX - state.x) * ease;
      state.y += (state.targetY - state.y) * ease;
      state.radius = Math.min(width * 0.28, 210);
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
      state.targetX = (stickers.clientWidth || 600) * 0.58;
      state.targetY = (stickers.clientHeight || 700) * 0.38;
      state.x = state.targetX;
      state.y = state.targetY;
      start();
    };

    if (stickers.complete && stickers.naturalWidth > 0) boot();
    else stickers.addEventListener("load", boot, { once: true });

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
        ref={stickersRef}
        className="hero-stickers"
        src="/mascot/mascot-stickers.webp"
        alt=""
        width={900}
        height={900}
        decoding="async"
        fetchPriority="low"
      />
    </div>
  );
}
