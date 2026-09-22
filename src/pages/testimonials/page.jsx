"use client";

import { motion } from "framer-motion";

import TestimonialSlider from "@/components/TestimonialSlider";
import { fadeIn } from "@/variants";

const Testimonials = () => {
  return (
    <div className="h-full bg-primary/30 py-32 text-center">
      <div className="container mx-auto h-full flex flex-col justify-center pt-16">
        <motion.div
          variants={fadeIn("up", 0.1)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex justify-center mb-2 xl:mb-1"
        >
          <img
            src="/logo-2.png"
            alt="logo"
            width={600}
            className="object-contain"
          />
        </motion.div>

        <motion.h2
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="h2 text-[24px] md:text-[36px] mt-0 -mb-8 xl:mt-0 xl:-mb-24 relative z-20"
        >
          My Personal <span className="text-accent">Approach.</span>
        </motion.h2>

        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          <TestimonialSlider />
        </motion.div>
      </div>
    </div>
  );
};

export default Testimonials;
