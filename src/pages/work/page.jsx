"use client";

import { m } from "framer-motion";

import Bulb from "@/components/Bulb";
import Circles from "@/components/Circles";
import Decoration from "@/components/Decoration";
import WorkSlider from "@/components/WorkSlider";
import { fadeIn } from "@/variants";

const Work = () => {
  return (
    // Exactly one viewport, never scrolls: the project wheel handles wheel/swipe/keys itself.
    <div className="relative h-svh overflow-hidden bg-primary/30">
      <Circles />
      <Decoration
        src="/laptop.webp"
        width={520}
        height={479}
        delay="1s"
        className="hidden min-[360px]:block top-37.5 right-2 w-14 sm:top-36 sm:right-8 sm:w-24 lg:top-28 lg:w-20 xl:top-auto xl:right-auto xl:left-[15%] xl:bottom-4 xl:w-44 xl:[@media(max-height:860px)]:hidden"
      />
      {/* The design shows only the project panel; the heading stays for screen readers and SEO. */}
      <div className="sr-only">
        <h1>My work</h1>
        <p>
          Explore my recent projects, demonstrating my ability to build full-stack applications, develop REST APIs, and integrate complex frontend features using modern web technologies.
        </p>
      </div>

      <m.div variants={fadeIn("down", 0.6)} initial="hidden" animate="show" exit="hidden" className="relative z-10 h-full">
        <WorkSlider />
      </m.div>
      <Bulb />
    </div>
  );
};

export default Work;
