"use client";

import { motion } from "framer-motion";

import Bulb from "@/components/Bulb";
import Circles from "@/components/Circles";
import Decoration from "@/components/Decoration";
import ServiceSlider from "@/components/ServiceSlider";
import { fadeIn } from "@/variants";

const Services = () => {
  return (
    <div className="relative min-h-screen bg-primary/30 pt-40 sm:pt-44 pb-32 lg:pt-36 xl:pt-36 xl:pb-12 flex items-center">
      <Circles />
      <Decoration
        src="/cloud.webp"
        width={520}
        height={520}
        delay="1s"
        className="hidden min-[360px]:block top-37.5 right-2 w-14 sm:top-36 sm:right-8 sm:w-24 lg:top-28 lg:w-20 xl:top-auto xl:right-auto xl:left-[12%] xl:bottom-8 xl:w-48"
      />
      <div className="relative z-10 container mx-auto">
        <div className="flex flex-col xl:flex-row gap-x-8">
          <div className="text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0">
            <motion.h2
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="h2 xl:mt-8"
            >
              My services <span className="text-accent">.</span>
            </motion.h2>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="mb-4 max-w-[400px] mx-auto lg:mx-0"
            >
              I specialize in creating complete, high-performance web applications from the ground up. Whether it's designing beautiful, interactive user interfaces or architecting secure, scalable backend systems, I approach every project with a focus on writing clean, maintainable code. My goal is to deliver robust digital solutions that not only look great but solve real-world problems efficiently and reliably for your users.
            </motion.p>
          </div>

          <motion.div
            variants={fadeIn("down", 0.6)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="w-full xl:max-w-[65%]"
          >
            <ServiceSlider />
          </motion.div>
        </div>
      </div>
      <Bulb />
    </div>
  );
};

export default Services;
