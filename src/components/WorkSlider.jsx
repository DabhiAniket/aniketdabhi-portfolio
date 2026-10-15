"use client";

import { BsArrowRight, BsArrowUpRight } from "react-icons/bs";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { workData } from "@/data/portfolio";
import { trackSpotlight } from "@/lib/motion";

const ProjectCard = ({ project }) => {
  const hasLink = project.link && project.link !== "#";
  // The whole card is the link, so it also works on touch screens (no hover there).
  const Card = hasLink ? "a" : "div";
  const linkProps = hasLink
    ? {
        href: project.link,
        target: "_blank",
        rel: "noreferrer noopener",
        "aria-label": `${project.title} – open live project`,
      }
    : {};

  return (
    <Card
      {...linkProps}
      onPointerMove={trackSpotlight}
      className="spotlight relative block rounded-lg overflow-hidden group ring-1 ring-white/10 hover:ring-accent/40 focus-visible:ring-accent focus-visible:outline-none transition-shadow duration-500 hover:shadow-[0_20px_50px_-20px_rgba(241,48,36,0.45)]"
    >
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

      {/* Always-visible caption (fades out when the hover overlay takes over) */}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-4 pt-12 pb-3 text-left bg-linear-to-t from-black/85 via-black/45 to-transparent transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0">
        <h2 className="text-sm sm:text-[15px] font-medium leading-snug">{project.title}</h2>
        {hasLink && <BsArrowUpRight className="shrink-0 text-accent text-lg mb-0.5" aria-hidden />}
      </div>

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
    </Card>
  );
};

const WorkSlider = () => {
  return (
    <Swiper
      spaceBetween={16}
      // A peek of the next card on phones hints that the list swipes.
      slidesPerView={1.12}
      breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 16 } }}
      pagination={{
        clickable: true,
      }}
      grabCursor
      modules={[Pagination]}
      className="pb-12! overflow-hidden"
    >
      {workData.projects.map((project) => (
        <SwiperSlide key={project.title}>
          <ProjectCard project={project} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default WorkSlider;
