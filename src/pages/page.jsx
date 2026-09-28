"use client";

import { Suspense, lazy } from "react";
import { motion } from "framer-motion";

import ProjectsBtn from "@/components/ProjectsBtn";
import Avatar from "@/components/Avatar";
import { fadeIn } from "@/variants";

const ParticlesContainer = lazy(() => import("@/components/ParticlesContainer"));

const Home = () => {
  return (
    <div className="bg-primary/60 min-h-screen relative overflow-hidden">
      {/* Phones & tablets: same red explosion glow as desktop, behind the avatar.
          Lives outside the z-10 content so color-dodge blends with the page background. */}
      <div
        className="xl:hidden absolute inset-x-0 bottom-0 h-130 sm:h-170 bg-explosion bg-cover bg-no-repeat bg-position-[70%_center] mix-blend-color-dodge translate-z-0 pointer-events-none mask-[linear-gradient(to_bottom,transparent,black_30%)]"
        aria-hidden
      />
      <div className="w-full h-full bg-linear-to-r from-primary/10 via-black/30 to-black/10 min-h-screen flex flex-col justify-center">
        <div className="relative z-10 text-center flex flex-col justify-center xl:text-left container mx-auto pt-40 sm:pt-44 pb-20 lg:pt-32 xl:pt-0 xl:pb-0">
          <motion.h1
            variants={fadeIn("down", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h1"
          >
            Building Digital Experiences <br /> That{" "}
            <span className="text-accent">Actually Work</span>
          </motion.h1>

          <motion.p
            variants={fadeIn("down", 0.3)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="max-w-sm sm:max-w-lg xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16"
          >
            I'm a Full-Stack Software Developer who enjoys turning ideas into reliable, scalable web applications. I work across React.js, Node.js, Laravel, Python FastAPI and modern databases, with a strong focus on clean UI, solid backend architecture and production-ready solutions.
          </motion.p>

          <div className="flex justify-center xl:hidden relative">
            <ProjectsBtn />
          </div>
          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="hidden xl:flex"
          >
            <ProjectsBtn />
          </motion.div>

          {/* Avatar for phones & tablets (desktop uses the large one on the right) */}
          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="xl:hidden relative mx-auto mt-8 w-full max-w-75 sm:max-w-105"
          >
            <Avatar
              priority
              className="relative flex mask-[linear-gradient(to_bottom,black_65%,transparent_98%)]"
            />
          </motion.div>
        </div>
      </div>
      <div className="w-7xl h-full absolute right-0 bottom-0 pointer-events-none">
        <div
          role="img"
          className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0"
          aria-hidden
        />

        <Suspense fallback={null}>
          <ParticlesContainer />
        </Suspense>

        <motion.div
          variants={fadeIn("up", 0.5)}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: 1, ease: "easeInOut" }}
          className="w-full h-full max-w-184.25 max-h-169.5 absolute -bottom-32 lg:bottom-0 lg:right-[8%]"
        >
          <Avatar priority />
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
