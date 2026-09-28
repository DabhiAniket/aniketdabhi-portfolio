"use client";

import { motion } from "framer-motion";

import TestimonialSlider from "@/components/TestimonialSlider";
import Decoration from "@/components/Decoration";
import { fadeIn } from "@/variants";

const Testimonials = () => {
  return (
    <div className="relative min-h-screen bg-primary/30 pt-40 sm:pt-44 pb-32 lg:pt-36 xl:pt-32 xl:pb-12 text-center flex flex-col justify-center">
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center sm:pt-8 xl:pt-16">
        {/* Heading row: decorations flank the title so they stay visible on any screen height */}
        <div className="relative">
          <Decoration
            src="/bulb.webp"
            width={256}
            height={392}
            delay="0.5s"
            className="hidden sm:block rotate-12 top-1/2 -translate-y-1/2 left-[4%] xl:left-[2%] w-14 md:w-18 lg:w-22 xl:w-20"
          />
          <Decoration
            src="/user.webp"
            width={520}
            height={520}
            delay="1.5s"
            className="hidden sm:block top-1/2 -translate-y-1/2 right-[4%] w-20 md:w-24 lg:w-28 xl:w-32"
          />
          <motion.h1
            variants={fadeIn("up", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2 text-[24px] md:text-[36px] mt-0 mb-4 xl:mt-0 xl:mb-4 relative z-20"
          >
            My Personal <span className="text-accent">Approach.</span>
          </motion.h1>
        </div>

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
