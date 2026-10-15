import { memo, useEffect, useRef } from "react";

import { initPointer, pointer, reducedMotionQuery } from "@/lib/pointer";

// Lightweight canvas replacement for tsParticles: same red nodes & links,
// plus depth parallax that follows the mouse/finger, a soft interaction
// bubble with "grab" lines around the pointer, and subtle scroll parallax.
const RGB = "241, 48, 36";
const LINK_ALPHA = 0.5;
const ALPHA_BUCKETS = 6;

const lerp = (from, to, k, dt) => from + (to - from) * (1 - Math.pow(1 - k, dt));

const ParticlesContainer = memo(function ParticlesContainer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    initPointer();

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let w = 0;
    let h = 0;
    let small = false;
    let linkDist = 150;
    let radius = 200;
    let nodes = [];
    let raf = 0;
    let last = 0;
    // Smoothed pointer: position, interaction strength (0..1) and parallax offset.
    const sm = { x: 0, y: 0, s: 0, ox: 0, oy: 0 };

    const makeNode = (x, y) => {
      const depth = 0.35 + Math.random() * 0.65;
      return {
        x: x ?? Math.random() * w,
        y: y ?? Math.random() * h,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        r: 1 + Math.random() * 4 * (0.5 + depth / 2),
        depth,
        dx: 0,
        dy: 0,
        px: 0,
        py: 0,
      };
    };

    // Particle density scales with screen area (fewer on phones).
    const targetCount = () =>
      Math.round(Math.min(110, Math.max(42, (w * h) / (small ? 7000 : 12000))));

    const resize = () => {
      const nw = canvas.clientWidth;
      const nh = canvas.clientHeight;
      if (!nw || !nh) return;
      small = nw < 768;
      linkDist = small ? 120 : 150;
      radius = small ? 170 : 220;
      const dpr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 2);
      canvas.width = Math.round(nw * dpr);
      canvas.height = Math.round(nh * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Keep existing nodes (rescaled) so a resize never "resets" the scene.
      if (w && h) {
        for (const n of nodes) {
          n.x *= nw / w;
          n.y *= nh / h;
        }
      }
      w = nw;
      h = nh;
      const count = targetCount();
      if (nodes.length > count) nodes.length = count;
      while (nodes.length < count) nodes.push(makeNode());
      if (!sm.x) {
        sm.x = w / 2;
        sm.y = h / 2;
      }
    };

    const draw = (dt, still) => {
      // Ease the pointer so nodes glide instead of snapping (also on touch release).
      sm.s = lerp(sm.s, pointer.active && !still ? 1 : 0, 0.08, dt);
      if (pointer.active) {
        sm.x = lerp(sm.x, pointer.x, 0.2, dt);
        sm.y = lerp(sm.y, pointer.y, 0.2, dt);
      }
      const par = small ? 18 : 36;
      sm.ox = lerp(sm.ox, pointer.active && !still ? (0.5 - sm.x / w) * par : 0, 0.05, dt);
      sm.oy = lerp(sm.oy, pointer.active && !still ? (0.5 - sm.y / h) * par : 0, 0.05, dt);

      const scroll = still ? 0 : window.scrollY * 0.12;
      const margin = linkDist / 2;
      const wrapH = h + margin * 2;
      const r2 = radius * radius;
      const push = small ? 22 : 30;

      for (const n of nodes) {
        if (!still) {
          n.x += n.vx * dt;
          n.y += n.vy * dt;
          if (n.x < 0) n.vx = Math.abs(n.vx);
          else if (n.x > w) n.vx = -Math.abs(n.vx);
          if (n.y < 0) n.vy = Math.abs(n.vy);
          else if (n.y > h) n.vy = -Math.abs(n.vy);
        }
        let px = n.x + sm.ox * n.depth;
        let py = n.y + sm.oy * n.depth - scroll * n.depth;
        py = ((((py + margin) % wrapH) + wrapH) % wrapH) - margin;

        // Soft bubble around the pointer; nodes spring back once it leaves.
        let tdx = 0;
        let tdy = 0;
        if (sm.s > 0.01) {
          const ddx = px - sm.x;
          const ddy = py - sm.y;
          const d2 = ddx * ddx + ddy * ddy;
          if (d2 < r2 && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / radius) * push * sm.s * n.depth;
            tdx = (ddx / d) * f;
            tdy = (ddy / d) * f;
          }
        }
        n.dx = lerp(n.dx, tdx, 0.12, dt);
        n.dy = lerp(n.dy, tdy, 0.12, dt);
        n.px = px + n.dx;
        n.py = py + n.dy;
      }

      ctx.clearRect(0, 0, w, h);

      // Faint glow that follows the pointer.
      if (sm.s > 0.01) {
        const g = ctx.createRadialGradient(sm.x, sm.y, 0, sm.x, sm.y, radius * 1.3);
        g.addColorStop(0, `rgba(${RGB}, ${0.16 * sm.s})`);
        g.addColorStop(1, `rgba(${RGB}, 0)`);
        ctx.globalAlpha = 1;
        ctx.fillStyle = g;
        ctx.fillRect(sm.x - radius * 1.3, sm.y - radius * 1.3, radius * 2.6, radius * 2.6);
      }

      // Links, batched into a few alpha buckets (one stroke per bucket).
      const paths = Array.from({ length: ALPHA_BUCKETS }, () => new Path2D());
      const ld2 = linkDist * linkDist;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.px - b.px;
          if (dx > linkDist || dx < -linkDist) continue;
          const dy = a.py - b.py;
          const d2 = dx * dx + dy * dy;
          if (d2 >= ld2) continue;
          const strength = (1 - Math.sqrt(d2) / linkDist) * (0.55 + 0.45 * Math.min(a.depth, b.depth));
          const bucket = Math.min(ALPHA_BUCKETS - 1, (strength * ALPHA_BUCKETS) | 0);
          paths[bucket].moveTo(a.px, a.py);
          paths[bucket].lineTo(b.px, b.py);
        }
      }
      ctx.strokeStyle = `rgb(${RGB})`;
      ctx.lineWidth = 1;
      for (let k = 0; k < ALPHA_BUCKETS; k++) {
        ctx.globalAlpha = ((k + 0.5) / ALPHA_BUCKETS) * LINK_ALPHA;
        ctx.stroke(paths[k]);
      }

      // "Grab" lines from the pointer to nearby nodes.
      if (sm.s > 0.01) {
        const gr = radius * 1.1;
        ctx.lineWidth = 1.2;
        for (const n of nodes) {
          const dx = n.px - sm.x;
          const dy = n.py - sm.y;
          const d2 = dx * dx + dy * dy;
          if (d2 >= gr * gr) continue;
          ctx.globalAlpha = (1 - Math.sqrt(d2) / gr) * 0.85 * sm.s;
          ctx.beginPath();
          ctx.moveTo(sm.x, sm.y);
          ctx.lineTo(n.px, n.py);
          ctx.stroke();
        }
      }

      ctx.fillStyle = `rgb(${RGB})`;
      for (const n of nodes) {
        ctx.globalAlpha = 0.25 + 0.4 * n.depth;
        ctx.beginPath();
        ctx.arc(n.px, n.py, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (t) => {
      const dt = last ? Math.min(3, (t - last) / 16.667) : 1;
      last = t;
      draw(dt, false);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = 0;
      if (reducedMotionQuery?.matches) {
        // Reduced motion: a single static frame, no drift and no pointer tracking.
        draw(1, true);
      } else {
        raf = requestAnimationFrame(loop);
      }
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (reducedMotionQuery?.matches) draw(1, true);
    });
    ro.observe(canvas);
    resize();
    start();
    reducedMotionQuery?.addEventListener("change", start);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      reducedMotionQuery?.removeEventListener("change", start);
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

export default ParticlesContainer;
