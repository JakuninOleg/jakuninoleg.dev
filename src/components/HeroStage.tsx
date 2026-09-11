"use client";

import { useEffect, useRef } from "react";

/**
 * Three layers (Ilya depth, without morphing the character):
 * 1) stickers-behind — under the mascot (peek from behind legs/shoulders)
 * 2) mascot-base — never masked, never changes
 * 3) stickers-front — over the mascot, flashlight reveal on desktop
 */
export function HeroStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const behindRef = useRef<HTMLImageElement>(null);
  const frontRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const behind = behindRef.current;
    const front = frontRef.current;
    if (!stage || !behind || !front) return;

    const layers = [behind, front];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 819px)").matches;
    const staticPeek = reduced || coarse || narrow;

    const setPeek = () => {
      for (const layer of layers) {
        layer.style.webkitMaskImage = "none";
        layer.style.maskImage = "none";
        layer.classList.add("hero-stickers--peek");
      }
    };

    if (staticPeek) {
      setPeek();
      return;
    }

    for (const layer of layers) layer.classList.remove("hero-stickers--peek");

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
      for (const layer of layers) {
        layer.style.webkitMaskImage = mask;
        layer.style.maskImage = mask;
      }
    };

    const onPointer = (event: PointerEvent) => {
      const rect = front.getBoundingClientRect();
      state.targetX = event.clientX - rect.left;
      state.targetY = event.clientY - rect.top;
    };

    const tick = () => {
      if (!state.running) return;
      const width = front.clientWidth || 600;
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
      state.targetX = (front.clientWidth || 600) * 0.55;
      state.targetY = (front.clientHeight || 700) * 0.38;
      state.x = state.targetX;
      state.y = state.targetY;
      applyMask(state.x, state.y, Math.min((front.clientWidth || 600) * 0.3, 240));
      start();
    };

    if (front.complete && front.naturalWidth > 0) boot();
    else front.addEventListener("load", boot, { once: true });

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
        ref={behindRef}
        className="hero-stickers hero-stickers--behind"
        src="/mascot/mascot-stickers-behind.webp"
        alt=""
        width={900}
        height={900}
        decoding="async"
        fetchPriority="low"
      />
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
        ref={frontRef}
        className="hero-stickers hero-stickers--front"
        src="/mascot/mascot-stickers-front.webp"
        alt=""
        width={900}
        height={900}
        decoding="async"
        fetchPriority="low"
      />
    </div>
  );
}
