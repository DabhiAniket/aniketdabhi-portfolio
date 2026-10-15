import { memo, useEffect, useRef } from "react";

import { initPointer, pointer, reducedMotionQuery } from "@/lib/pointer";

// Glowing curves in the theme accent (#f13024) that trail the mouse or finger (mageui-style).
// Each trail is a chain of spring-linked points chasing the pointer; drawn as
// one smooth quadratic curve with a soft glow pass and a thin bright core.
const FRICTION = 0.5;
const DAMPENING = 0.25;
const TENSION = 0.98;
const STEP = 1000 / 60; // fixed physics step so 120Hz screens feel the same

const FluidLines = memo(function FluidLines() {
  const canvasRef = useRef(null);

  useEffect(() => {
    initPointer();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = 0;
    let h = 0;
    let small = false;
    let trails = [];
    let raf = 0;
    let last = 0;
    let acc = 0;
    let alpha = 0; // overall visibility, eases in/out with pointer presence
    let hue = 0; // slow shimmer around the accent red
    let drawn = false;

    const build = (x, y) => {
      const count = small ? 12 : 20;
      const size = small ? 34 : 46;
      trails = Array.from({ length: count }, (_, i) => ({
        // Spread spring/friction per curve so the bundle fans out into distinct strands.
        spring: 0.4 + (i / count) * 0.08 + Math.random() * 0.04,
        friction: FRICTION + Math.random() * 0.04 - 0.02,
        nodes: Array.from({ length: size }, () => ({ x, y, vx: 0, vy: 0 })),
      }));
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      if (!w || !h) return;
      const wasSmall = small;
      small = w < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!trails.length || wasSmall !== small) build(pointer.x || w / 2, pointer.y || h / 2);
      drawn = false;
    };

    const simulate = () => {
      for (const t of trails) {
        let spring = t.spring;
        const head = t.nodes[0];
        head.vx += (pointer.x - head.x) * spring;
        head.vy += (pointer.y - head.y) * spring;
        for (let i = 0; i < t.nodes.length; i++) {
          const n = t.nodes[i];
          if (i > 0) {
            const prev = t.nodes[i - 1];
            n.vx += (prev.x - n.x) * spring + prev.vx * DAMPENING;
            n.vy += (prev.y - n.y) * spring + prev.vy * DAMPENING;
          }
          n.vx *= t.friction;
          n.vy *= t.friction;
          n.x += n.vx;
          n.y += n.vy;
          spring *= TENSION;
        }
      }
    };

    // Total movement, used to stop redrawing once the curves have settled.
    const energy = () => {
      let e = 0;
      for (const t of trails) {
        const n = t.nodes[t.nodes.length - 1];
        e += Math.abs(n.vx) + Math.abs(n.vy) + Math.abs(n.x - pointer.x) + Math.abs(n.y - pointer.y);
      }
      return e / trails.length;
    };

    const strokeTrail = (t) => {
      const ns = t.nodes;
      ctx.beginPath();
      ctx.moveTo(ns[0].x, ns[0].y);
      for (let i = 1; i < ns.length - 2; i++) {
        const a = ns[i];
        const b = ns[i + 1];
        ctx.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2);
      }
      const a = ns[ns.length - 2];
      const b = ns[ns.length - 1];
      ctx.quadraticCurveTo(a.x, a.y, b.x, b.y);
      ctx.stroke();
    };

    const draw = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, w, h);
      if (alpha < 0.01) return;
      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      const hueNow = 4 + Math.sin(hue) * 6; // #f13024 is hue ~4; drifts ~358 (crimson) to ~10 (red-orange)
      // Soft glow pass: wide and faint, overlaps add up into a bloom.
      ctx.lineWidth = small ? 7 : 9;
      ctx.strokeStyle = `hsla(${hueNow}, 88%, 54%, ${0.035 * alpha})`;
      for (const t of trails) strokeTrail(t);
      // Thin bright core.
      ctx.lineWidth = small ? 1 : 1.2;
      ctx.strokeStyle = `hsla(${hueNow + 2}, 100%, 66%, ${0.22 * alpha})`;
      for (const t of trails) strokeTrail(t);
    };

    const loop = (time) => {
      const dt = last ? Math.min(100, time - last) : STEP;
      last = time;
      acc += dt;
      while (acc >= STEP) {
        simulate();
        acc -= STEP;
      }
      hue += dt * 0.0006;
      const target = pointer.active ? 1 : 0;
      alpha += (target - alpha) * (1 - Math.pow(pointer.active ? 0.9 : 0.94, dt / STEP));

      if (!pointer.active && alpha < 0.01) {
        // Fully faded out: clear once and sleep until the pointer comes back.
        alpha = 0;
        draw();
        raf = 0;
        return;
      }
      // Skip redraws while the curves rest under a still mouse (and nothing is fading).
      const settled = energy() < 0.05 && Math.abs(target - alpha) < 0.005;
      if (!settled || !drawn) {
        draw();
        drawn = settled;
      }
      raf = requestAnimationFrame(loop);
    };

    const wake = () => {
      if (raf || reducedMotionQuery?.matches) return;
      // Coming back after a fade-out: start the curves at the pointer, not where they were left.
      if (alpha === 0) build(pointer.x, pointer.y);
      last = 0;
      acc = 0;
      drawn = false;
      raf = requestAnimationFrame(loop);
    };

    // The shared pointer module owns the coordinates; these listeners only wake the loop.
    const opts = { passive: true };
    const events = ["pointermove", "pointerdown", "touchstart", "touchmove"];
    // Run after the shared listeners (registered first in initPointer) have updated `pointer`.
    events.forEach((e) => window.addEventListener(e, wake, opts));

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const onMotionPref = () => {
      if (reducedMotionQuery.matches) {
        cancelAnimationFrame(raf);
        raf = 0;
        alpha = 0;
        draw();
      }
    };
    reducedMotionQuery?.addEventListener("change", onMotionPref);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      events.forEach((e) => window.removeEventListener(e, wake, opts));
      reducedMotionQuery?.removeEventListener("change", onMotionPref);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-lvh pointer-events-none select-none"
      aria-hidden
    />
  );
});

export default FluidLines;
