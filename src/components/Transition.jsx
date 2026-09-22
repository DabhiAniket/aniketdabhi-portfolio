"use client";

import { motion } from "framer-motion";

const Transition = () => {
  const sweepVariants = {
    initial: {
      x: "0%",
    },
    animate: {
      x: "-100%",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
    exit: {
      x: ["-100%", "0%"],
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const logoVariants = {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 0,
      transition: { duration: 0.4, ease: "easeOut", delay: 0.1 },
    },
    exit: {
      opacity: 1,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  return (
    <>
      {/* Cinematic Dark Sweep */}
      <motion.div
        className="fixed top-0 bottom-0 left-0 w-screen h-screen z-30 shadow-[10px_0_50px_rgba(241,48,36,0.1)]"
        style={{
          background:
            "linear-gradient(90deg, #05020a 0%, #11072b 75%, rgba(241,48,36,0.25) 100%)",
        }}
        variants={sweepVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        aria-hidden
      />

      {/* Centered Logo */}
      <motion.div
        className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
        variants={logoVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        aria-hidden
      >
        <img src="/full-logo.png" alt="Loading..." width={450} />
      </motion.div>
    </>
  );
};

export default Transition;
