import { motion } from "framer-motion";

import { useParallax } from "@/lib/motion";

const Bulb = () => {
  const parallax = useParallax(16);
  return (
    <motion.div style={parallax} className="hidden md:block absolute -left-36 -bottom-12 rotate-12 mix-blend-color-dodge animate-pulse duration-75 z-10 w-50 xl:w-65 select-none pointer-events-none">
      <img
        src="/bulb.webp"
        loading="lazy"
        decoding="async"
        alt="bulb"
        width={260}
        height={200}
        className="w-full h-full"
      />
    </motion.div>
  );
};

export default Bulb;
