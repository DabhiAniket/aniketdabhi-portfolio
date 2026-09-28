"use client";

import { memo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";

import { loadFull } from "tsparticles";

const isSmallScreen =
  typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
const hasFinePointer =
  typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches;

const particlesOptions = {
  fullScreen: { enable: false },
  background: {
    color: {
      value: "",
    },
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: false,
        mode: "push",
      },
      onHover: {
        enable: hasFinePointer,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      push: {
        quantity: 90,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
  particles: {
    color: {
      value: "#f13024",
    },
    links: {
      color: "#f13024",
      distance: 150,
      enable: true,
      opacity: 0.5,
      width: 1,
    },
    collisions: {
      // O(n²) per frame and barely visible — off for smoother scrolling
      enable: false,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: false,
      speed: 1,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        width: 800,
      },
      value: isSmallScreen ? 40 : 80,
    },
    opacity: {
      value: 0.5,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: {
        min: 1,
        max: 5,
      },
    },
  },
  detectRetina: true,
};

const initParticles = async (engine) => {
  await loadFull(engine);
};

const ParticlesContainer = memo(function ParticlesContainer() {
  return (
    <ParticlesProvider init={initParticles}>
      <Particles
        className="w-full h-full absolute translate-z-0 pointer-events-none"
        id="tsparticles"
        options={particlesOptions}
      />
    </ParticlesProvider>
  );
});

export default ParticlesContainer;
