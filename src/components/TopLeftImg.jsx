import { m } from "framer-motion";

import { useParallax } from "@/lib/motion";

const TopLeftImg = () => {
  const parallax = useParallax(-10);
  return (
    <m.div style={parallax} className="absolute left-0 top-0 mix-blend-color-dodge z-10 w-50 xl:w-100 opacity-50 pointer-events-none select-none">
      <img
        src="/top-left-img.webp"
        decoding="async"
        alt=""
        width={400}
        height={400}
      />
    </m.div>
  );
};

export default TopLeftImg;
