import { motionValue } from "framer-motion";

// Shared pointer state. One set of passive window listeners feeds both the
// canvas background (reads `pointer` every frame) and the parallax decorations
// (framer-motion values, so updates never trigger a React render).
export const pointer = { x: 0, y: 0, active: false, touch: false };

// Normalised -1..1 from the viewport centre; 0 when no pointer is present.
export const parallaxX = motionValue(0);
export const parallaxY = motionValue(0);

export const reducedMotionQuery =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)")
    : null;

let started = false;

export function initPointer() {
  if (started || typeof window === "undefined") return;
  started = true;

  const move = (x, y, touch) => {
    pointer.x = x;
    pointer.y = y;
    pointer.active = true;
    pointer.touch = touch;
    if (reducedMotionQuery?.matches) return;
    parallaxX.set((x / window.innerWidth) * 2 - 1);
    parallaxY.set((y / window.innerHeight) * 2 - 1);
  };

  const release = () => {
    pointer.active = false;
    parallaxX.set(0);
    parallaxY.set(0);
  };

  const opts = { passive: true };

  // Mouse & pen. Touch is handled by touch events below: pointer events are
  // cancelled as soon as the browser starts scrolling, touch events are not.
  window.addEventListener(
    "pointermove",
    (e) => e.pointerType !== "touch" && move(e.clientX, e.clientY, false),
    opts
  );

  const onTouch = (e) => {
    const t = e.touches[0];
    if (t) move(t.clientX, t.clientY, true);
  };
  window.addEventListener("touchstart", onTouch, opts);
  window.addEventListener("touchmove", onTouch, opts);
  window.addEventListener("touchend", (e) => !e.touches.length && release(), opts);
  window.addEventListener("touchcancel", release, opts);

  // Mouse left the window.
  document.addEventListener("mouseout", (e) => !e.relatedTarget && release());
  window.addEventListener("blur", release);
}
