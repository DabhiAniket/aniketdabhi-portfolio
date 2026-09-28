import { memo } from "react";

// Decorative glowing image in the same style as <Bulb />.
// Sits behind page content (content wrappers use `relative z-10`), never receives pointer events.
const Decoration = memo(function Decoration({
  src,
  width,
  height,
  className = "",
  delay = "0s",
}) {
  return (
    <div
      className={`absolute mix-blend-color-dodge animate-pulse pointer-events-none select-none ${className}`}
      style={{ animationDelay: delay }}
      aria-hidden
    >
      <img
        src={src}
        alt=""
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="w-full h-auto"
      />
    </div>
  );
});

export default Decoration;
