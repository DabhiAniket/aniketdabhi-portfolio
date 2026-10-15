import { useSpring, useTransform } from "framer-motion";

import { parallaxX, parallaxY } from "@/lib/pointer";

const spring = { stiffness: 50, damping: 18, mass: 0.8 };

// Subtle pointer parallax: returns motion values for `style={{ x, y }}`.
// Negative depth moves against the pointer (feels further away).
export function useParallax(depth = 12) {
  const sx = useSpring(parallaxX, spring);
  const sy = useSpring(parallaxY, spring);
  const x = useTransform(sx, (v) => v * depth);
  const y = useTransform(sy, (v) => v * depth);
  return { x, y };
}

// Scroll reveal props for a motion element; plays once when ~20% is visible.
export const reveal = (delay = 0, distance = 28) => ({
  initial: { opacity: 0, y: distance },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

// Cursor-following highlight for `.spotlight` cards; writes CSS vars only.
export function trackSpotlight(e) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  el.style.setProperty("--my", `${e.clientY - rect.top}px`);
}
