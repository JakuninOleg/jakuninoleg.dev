"use client";

import { useEffect, useRef } from "react";
import styles from "./HeroCallouts.module.css";

/**
 * Dual-layer hero mascot:
 * desktop — base + flashlight mask on the stickers layer
 * mobile — stickers only, no reveal
 */
export function HeroStage() {
  const stageRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLImageElement>(null);
  const calloutsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const reveal = revealRef.current;
    const callouts = calloutsRef.current;
    if (!stage || !reveal || !callouts) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const narrow = window.matchMedia("(max-width: 819px)");
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    }, { threshold: 0.02 });

    let visible = false;
    let frame = 0;
    let mobileTimer: ReturnType<typeof setInterval> | undefined;
    let mobileActive = 0;
    let lastFrame = 0;
    const started = performance.now();
    const calloutElements = Array.from(callouts.children) as HTMLElement[];

    const place = (now: number) => {
      frame = 0;
      if (!visible || document.hidden || reduceMotion.matches || narrow.matches) return;
      frame = requestAnimationFrame(place);
      if (now - lastFrame < 33) return;
      lastFrame = now;

      const image = reveal.getBoundingClientRect();
      const bounds = stage.getBoundingClientRect();
      const tick = (now - started) / 2100;
      let leftmost = { index: 0, x: Infinity };

      calloutElements.forEach((callout, index) => {
        const angle = tick + index * Math.PI * 2 / 3 - Math.PI / 2
          + Math.sin(tick * .63 + index * 1.7) * .16;
        const wanderX = Math.sin(tick * 1.41 + index * 3.3) * .014;
        const wanderY = Math.cos(tick * 1.17 + index * 2.4) * .012;
        const x = image.left - bounds.left
          + (.53 + Math.cos(angle) * .3 + wanderX) * image.width;
        const y = image.top - bounds.top
          + (.1 + Math.sin(angle) * .03 + wanderY) * image.height;
        callout.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        if (x < leftmost.x) leftmost = { index, x };
      });
      calloutElements.forEach((callout, index) => {
        callout.classList.toggle(styles.calloutActive, index === leftmost.index);
      });
      callouts.style.opacity = "1";
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      if (mobileTimer) clearInterval(mobileTimer);
      mobileTimer = undefined;
    };
    const start = () => {
      if (!visible || document.hidden || reduceMotion.matches) return;
      if (narrow.matches) {
        if (mobileTimer) return;
        const showMobileCallout = () => {
          calloutElements.forEach((callout, index) => {
            callout.classList.toggle(styles.calloutActive, index === mobileActive);
          });
          callouts.style.opacity = "1";
        };
        showMobileCallout();
        mobileTimer = setInterval(() => {
          mobileActive = (mobileActive + 1) % calloutElements.length;
          showMobileCallout();
        }, 3200);
      } else if (!frame) {
        frame = requestAnimationFrame(place);
      }
    };
    const onVisibility = () => { if (document.hidden) stop(); else start(); };
    const onMotion = () => { if (reduceMotion.matches) stop(); else start(); };
    const onNarrow = () => {
      if (narrow.matches) {
        stop();
        calloutElements.forEach((callout) => { callout.style.transform = ""; });
        start();
      } else {
        stop();
        start();
      }
    };

    observer.observe(stage);
    document.addEventListener("visibilitychange", onVisibility);
    reduceMotion.addEventListener("change", onMotion);
    narrow.addEventListener("change", onNarrow);
    onNarrow();
    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMotion.removeEventListener("change", onMotion);
      narrow.removeEventListener("change", onNarrow);
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const reveal = revealRef.current;
    if (!stage || !reveal) return;

    const mqNarrow = window.matchMedia("(max-width: 819px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqCoarse = window.matchMedia("(hover: none), (pointer: coarse)");

    let stopMode: (() => void) | undefined;

    const clearInlineMask = () => {
      reveal.style.webkitMaskImage = "";
      reveal.style.maskImage = "";
    };

    const resetClasses = () => {
      reveal.classList.remove("hero-reveal--peek", "hero-reveal--full");
    };

    const setPeek = () => {
      resetClasses();
      reveal.classList.add("hero-reveal--peek");
      reveal.style.webkitMaskImage = "none";
      reveal.style.maskImage = "none";
    };

    const setFlashlight = () => {
      resetClasses();
      clearInlineMask();

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
      hero.addEventListener("pointermove", onPointer as EventListener, {
        passive: true,
      });
      document.addEventListener("visibilitychange", onVisibility);

      const boot = () => {
        state.targetX = (reveal.clientWidth || 600) * 0.55;
        state.targetY = (reveal.clientHeight || 700) * 0.38;
        state.x = state.targetX;
        state.y = state.targetY;
        applyMask(
          state.x,
          state.y,
          Math.min((reveal.clientWidth || 600) * 0.3, 240),
        );
        start();
      };

      if (reveal.complete && reveal.naturalWidth > 0) boot();
      else reveal.addEventListener("load", boot, { once: true });

      return () => {
        stop();
        observer.disconnect();
        document.removeEventListener("visibilitychange", onVisibility);
        hero.removeEventListener("pointermove", onPointer as EventListener);
        reveal.removeEventListener("load", boot);
        clearInlineMask();
      };
    };

    const applyMode = () => {
      stopMode?.();
      stopMode = undefined;

      if (mqNarrow.matches) {
        // Mobile CSS already shows the full image; avoid repainting the LCP image on hydration.
        resetClasses();
        clearInlineMask();
        return;
      }

      if (mqReduced.matches || mqCoarse.matches) {
        setPeek();
        return;
      }

      stopMode = setFlashlight();
    };

    applyMode();
    mqNarrow.addEventListener("change", applyMode);
    mqReduced.addEventListener("change", applyMode);
    mqCoarse.addEventListener("change", applyMode);

    return () => {
      stopMode?.();
      mqNarrow.removeEventListener("change", applyMode);
      mqReduced.removeEventListener("change", applyMode);
      mqCoarse.removeEventListener("change", applyMode);
      resetClasses();
      clearInlineMask();
    };
  }, []);

  return (
    <div ref={stageRef} className="hero-stage" aria-hidden="true">
      <div className="hero-stage__glow" />
      <picture>
        <source
          media="(max-width: 819px)"
          srcSet="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
        />
        <img
          className="hero-mascot"
          src="/mascot/mascot-base-fast.webp"
          alt=""
          width={1024}
          height={1024}
          decoding="async"
          fetchPriority="high"
        />
      </picture>
      <picture>
        <source
          media="(max-width: 819px)"
          type="image/avif"
          srcSet="/mascot/mascot-reveal-mobile.avif"
        />
        <source
          media="(max-width: 819px)"
          srcSet="/mascot/mascot-reveal-mobile.webp"
        />
        <img
          ref={revealRef}
          className="hero-reveal"
          src="/mascot/mascot-reveal-fast.webp"
          alt=""
          width={1024}
          height={1024}
          decoding="async"
          fetchPriority="high"
        />
      </picture>
      <div ref={calloutsRef} className={styles.callouts} aria-hidden="true">
        <span className={styles.callout}><span className={styles.bubble}>Генерирую<br />идеи!</span></span>
        <span className={styles.callout}><span className={styles.bubble}><span className={styles.desktopText}>Продумываю<br />архитектуру</span><span className={styles.mobileText}>Проектирую<br />дизайн</span></span></span>
        <span className={styles.callout}><span className={styles.bubble}>Собираю<br />и запускаю</span></span>
      </div>
    </div>
  );
}
