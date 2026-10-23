"use client";

import { motion } from "framer-motion";
import { BsArrowRight, BsArrowUpRight } from "react-icons/bs";

import { workData } from "@/data/portfolio";
import { reveal, trackSpotlight } from "@/lib/motion";

const ProjectCard = ({ project }) => {
  const hasLink = project.link && project.link !== "#";
  // The preview image also opens the project (handy on touch screens); the
  // "Live Demo" button below is the keyboard/screen-reader link, so the image
  // link is kept out of the tab order to avoid a duplicate stop.
  const Preview = hasLink ? "a" : "div";
  const previewProps = hasLink
    ? {
        href: project.link,
        target: "_blank",
        rel: "noreferrer noopener",
        tabIndex: -1,
        "aria-hidden": true,
      }
    : {};

  return (
    <div
      onPointerMove={trackSpotlight}
      className="spotlight relative flex flex-col h-full rounded-lg overflow-hidden group bg-[rgba(65,47,123,0.15)] ring-1 ring-white/10 hover:ring-accent/40 focus-within:ring-accent/60 transition-shadow duration-500 hover:shadow-[0_20px_50px_-20px_rgba(241,48,36,0.45)]"
    >
      <Preview {...previewProps} className="relative block overflow-hidden">
        <img
          src={project.path}
          alt={`${project.title} – project by Aniket Dabhi`}
          width={800}
          height={450}
          loading="lazy"
          decoding="async"
          className="w-full h-auto aspect-video object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
        />
  
        <div
          className="absolute inset-0 bg-linear-to-l from-transparent via-[#e838cc] to-[#4a22bd] opacity-0 group-hover:opacity-80 group-focus-visible:opacity-80 transition-opacity duration-700"
          aria-hidden
        />
  
        <div className="absolute inset-x-0 bottom-0 flex justify-center translate-y-full group-hover:-translate-y-10 group-focus-visible:-translate-y-10 group-hover:xl:-translate-y-20 transition-all duration-300 pointer-events-none">
          <span className="flex items-center gap-x-2 text-[13px] tracking-[0.2em]">
            <span className="delay-100">LIVE</span>
            <span className="translate-y-[500%] group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-all duration-300 delay-150">
              PROJECT
            </span>
            <span className="text-xl translate-y-[500%] group-hover:translate-y-0 group-focus-visible:translate-y-0 transition-all duration-300 delay-150">
              <BsArrowRight aria-hidden />
            </span>
          </span>
        </div>
      </Preview>

      <div className="relative z-2 flex flex-1 flex-col gap-2 p-4 sm:p-5 text-left">
        <h2 className="text-[15px] sm:text-base font-medium leading-snug">{project.title}</h2>
        {project.description && (
          <p className="text-[13px] sm:text-sm leading-relaxed line-clamp-3">{project.description}</p>
        )}
        {hasLink && (
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Live demo of ${project.title} (opens in a new tab)`}
            className="mt-auto self-start inline-flex items-center gap-x-2 pt-2 text-[13px] tracking-[0.15em] uppercase text-accent hover:text-white focus-visible:text-white focus-visible:outline-none transition-colors duration-300 group/demo"
          >
            Live Demo
            <BsArrowUpRight
              className="text-base transition-transform duration-300 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5"
              aria-hidden
            />
          </a>
        )}
      </div>
    </div>
  );
};

// Every project is shown at once (no slider), so none of them are hidden
// behind a swipe: 1 column on phones, 2 on tablets/laptops, 3 on desktop.
const WorkSlider = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {workData.projects.map((project, i) => (
        <motion.div key={project.title} {...reveal(0.05 + (i % 3) * 0.08)} className="h-full">
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  );
};

export default WorkSlider;
