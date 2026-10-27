import { memo } from "react";
import { m } from "framer-motion";

import { useParallax } from "@/lib/motion";

// Decorative glowing image in the same style as <Bulb />.
// Sits behind page content (content wrappers use `relative z-10`), never receives pointer events.
const Decoration = memo(function Decoration({
  src,
  width,
  height,
  className = "",
  delay = "0s",
  depth = -14,
}) {
  const parallax = useParallax(depth);
  return (
    <m.div
      className={`absolute mix-blend-color-dodge animate-pulse pointer-events-none select-none ${className}`}
      style={{ animationDelay: delay, ...parallax }}
      aria-hidden
    >
      <img
        src={src}
        // The 520px artwork also ships as `name-240.webp`; phones show it at ~56px wide.
        srcSet={width >= 500 ? `${src.replace(/\.webp$/, "-240.webp")} 240w, ${src} ${width}w` : undefined}
        sizes={width >= 500 ? "(min-width: 1024px) 240px, (min-width: 640px) 128px, 56px" : undefined}
        alt=""
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="w-full h-auto"
      />
    </m.div>
  );
});

export default Decoration;
