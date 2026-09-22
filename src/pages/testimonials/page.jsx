"use client";

import { motion } from "framer-motion";

import TestimonialSlider from "@/components/TestimonialSlider";
import { fadeIn } from "@/variants";

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-primary/30 pt-44 pb-28 xl:pt-32 xl:pb-0 text-center">
      <div className="container mx-auto h-full flex flex-col justify-center pt-16">


        <motion.h2
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="h2 text-[24px] md:text-[36px] mt-0 mb-4 xl:mt-0 xl:mb-4 relative z-20"
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
