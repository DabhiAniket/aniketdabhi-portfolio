"use client";

import { useLayoutEffect } from "react";
import { m } from "framer-motion";

const Transition = () => {
  // Hand over from the static splash in index.html: removed before this overlay's first paint,
  // so the logo never blinks.
  useLayoutEffect(() => {
    document.getElementById("boot-splash")?.remove();
  }, []);

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
      <m.div
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
      <m.div
        className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
        variants={logoVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        aria-hidden
      >
        <img
          src="/full-logo-450.webp"
          srcSet="/full-logo-450.webp 450w, /full-logo-640.webp 640w, /full-logo.webp 900w"
          sizes="min(450px, 80vw)"
          alt=""
          width={450}
          height={450}
          fetchPriority="high"
          className="w-[min(450px,80vw)] h-auto"
        />
      </m.div>
    </>
  );
};

export default Transition;
