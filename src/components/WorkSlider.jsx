"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { BsArrowDown, BsArrowUp, BsArrowUpRight } from "react-icons/bs";

import { workData } from "@/data/portfolio";

const { projects } = workData;
const last = projects.length - 1;
const pad = (n) => String(n).padStart(2, "0");
const clamp = (i) => Math.min(last, Math.max(0, i));

// Cards ride the rim of a large, slightly tilted wheel, like slides in a reel.
// Offsets are in % of the card's own size, so the wheel scales with the card.
const STEP = 11; // degrees between neighbouring cards
const TILT = -5; // the whole wheel leans a little, as in the reference
const RADIUS_Y = 365; // % of card height
const RADIUS_X = 205; // % of card width (same radius for a 16:9 card)
const rad = (d) => (d * STEP * Math.PI) / 180;

const WheelCard = ({ project, index, position, isActive, onSelect }) => {
  // d: how many slots this card is from the centre (negative = above).
  const d = useTransform(position, (p) => index - p);
  const x = useTransform(d, (v) => `${(Math.cos(rad(v)) - 1) * RADIUS_X}%`);
  const y = useTransform(d, (v) => `${Math.sin(rad(v)) * RADIUS_Y}%`);
  const rotate = useTransform(d, (v) => TILT + v * STEP);
  const rotateX = useTransform(d, (v) => v * -8);
  const scale = useTransform(d, (v) => 1 - Math.min(Math.abs(v), 3) * 0.12);
  const opacity = useTransform(d, (v) => Math.min(1, Math.max(0, 2.6 - Math.abs(v))));
  const shade = useTransform(d, (v) => Math.min(Math.abs(v) * 0.35, 0.75));
  const zIndex = useTransform(d, (v) => 100 - Math.round(Math.abs(v) * 10));
  const pointerEvents = useTransform(d, (v) => (Math.abs(v) > 2 ? "none" : "auto"));
  const hasLink = project.link && project.link !== "#";

  // Mouse/touch shortcut only: the details panel holds the keyboard and
  // screen-reader controls, so the card itself stays out of the a11y tree.
  const handleClick = () =>
    isActive && hasLink ? window.open(project.link, "_blank", "noopener,noreferrer") : onSelect(index);

  return (
    <m.div
      aria-hidden
      onClick={handleClick}
      style={{ x, y, rotate, rotateX, rotateY: -8, scale, opacity, zIndex, pointerEvents, transformPerspective: 1600 }}
      className="col-start-1 row-start-1 w-[min(84vw,28rem)] sm:w-[min(74vw,36rem)] xl:w-[min(46vw,48rem,85svh)] cursor-pointer will-change-transform"
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-primary transition-shadow duration-500 ${
          isActive
            ? "ring-2 ring-accent/80 shadow-[0_0_70px_-12px_rgba(241,48,36,0.75)]"
            : "ring-1 ring-white/10 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.8)]"
        }`}
      >
        <img
          src={project.path}
          alt={`${project.title} – project by Aniket Dabhi`}
          width={800}
          height={450}
          decoding="async"
          className="w-full h-auto aspect-video object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-3 sm:p-5 bg-linear-to-t from-primary/90 to-transparent text-[11px] sm:text-sm tracking-[0.2em] uppercase">
          <span className="text-accent">{pad(index + 1)}</span>
          <span className="truncate">{project.title}</span>
        </div>
        <m.div style={{ opacity: shade }} className="absolute inset-0 bg-primary pointer-events-none" />
      </div>
    </m.div>
  );
};

const roundButton =
  "grid place-items-center size-10 xl:size-12 rounded-full border border-white/20 hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent focus-visible:outline-none disabled:opacity-30 disabled:pointer-events-none transition-colors duration-300";

// One fixed screen: the wheel, a swipe, arrow keys or the buttons switch projects.
// Only the card wheel moves; the details on the left stay put and swap their text.
const WorkSlider = () => {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  // Spring-smoothed so the wheel glides between cards.
  const position = useSpring(0, { stiffness: 110, damping: 24, mass: 0.7 });

  useEffect(() => {
    if (reduceMotion) position.jump(active);
    else position.set(active);
  }, [active, reduceMotion, position]);

  useEffect(() => {
    const step = (dir) => setActive((a) => clamp(a + dir));

    // One project per gesture: a trackpad flick fires dozens of wheel events with
    // inertia, so after a step the gate stays shut while events keep arriving.
    let lockedUntil = 0;
    let lastStep = 0;
    let acc = 0;
    const onWheel = (e) => {
      const now = performance.now();
      if (now < lockedUntil) {
        if (now - lastStep < 1500) lockedUntil = Math.max(lockedUntil, now + 200);
        return;
      }
      acc += e.deltaY;
      if (Math.abs(acc) < 40) return;
      step(Math.sign(acc));
      acc = 0;
      lastStep = now;
      lockedUntil = now + 600;
    };

    let startY = null;
    const onTouchStart = (e) => (startY = e.touches[0].clientY);
    const onTouchEnd = (e) => {
      if (startY === null) return;
      const dy = startY - e.changedTouches[0].clientY;
      if (Math.abs(dy) > 40) step(Math.sign(dy));
      startY = null;
    };

    const onKey = (e) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") step(1);
      else if (e.key === "ArrowUp" || e.key === "PageUp") step(-1);
      else return;
      e.preventDefault();
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const project = projects[active];
  const hasLink = project.link && project.link !== "#";
  const words = project.title.split(" ");
  const lastWord = words.pop();

  return (
    <section aria-label="Projects" className="h-full touch-none">
      <div className="container mx-auto h-full flex flex-col-reverse xl:flex-row xl:items-center gap-4 sm:gap-6 xl:gap-10 pt-40 sm:pt-44 lg:pt-36 xl:pt-24 pb-28 xl:pb-10">
        <div className="shrink-0 xl:w-[34%] text-center xl:text-left">
          <div className="flex items-center justify-center xl:justify-start gap-4 text-[13px] xl:text-base tracking-[0.2em]">
            <span className="text-accent">{pad(active + 1)}</span>
            <span className="relative h-px w-24 xl:w-28 overflow-hidden bg-white/15" aria-hidden>
              <m.span
                initial={false}
                animate={{ scaleX: last ? active / last : 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 origin-left bg-accent"
              />
            </span>
            <span className="text-white/60">{pad(projects.length)}</span>
          </div>

          <div aria-live="polite" className="min-h-36 sm:min-h-40 xl:min-h-56">
            {/* Opacity only, so the details panel itself never moves. */}
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="mt-3 xl:mt-6 mb-2 xl:mb-5 text-xl sm:text-2xl xl:text-[clamp(2rem,2.75vw,2.75rem)] font-semibold leading-tight">
                  {words.join(" ")} <span className="text-accent">{lastWord}</span>
                </h2>
                {project.description && (
                  <p className="max-w-md xl:max-w-lg mx-auto xl:mx-0 text-[13px] sm:text-sm xl:text-[17px] leading-relaxed line-clamp-3 xl:line-clamp-none">
                    {project.description}
                  </p>
                )}
              </m.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center xl:justify-start gap-3 xl:gap-4 mt-3 xl:mt-8">
            {hasLink && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Live demo of ${project.title} (opens in a new tab)`}
                className="inline-flex items-center gap-x-2 h-10 xl:h-12 px-5 xl:px-7 rounded-full border-2 border-accent text-[13px] xl:text-sm font-semibold tracking-[0.15em] uppercase text-accent hover:bg-accent hover:text-white focus-visible:bg-accent focus-visible:text-white focus-visible:outline-none transition-colors duration-300"
              >
                Live Demo
                <BsArrowUpRight className="text-base" aria-hidden />
              </a>
            )}
            <button type="button" onClick={() => setActive(clamp(active - 1))} disabled={active === 0} aria-label="Previous project" className={roundButton}>
              <BsArrowUp aria-hidden />
            </button>
            <button type="button" onClick={() => setActive(clamp(active + 1))} disabled={active === last} aria-label="Next project" className={roundButton}>
              <BsArrowDown aria-hidden />
            </button>
          </div>
        </div>

        {/* Below xl the wheel sits above the details, so it is clipped (with soft faded
            edges) to keep the outer cards from covering the project text. */}
        <div className="relative flex-1 min-h-0 xl:h-full grid place-items-center overflow-hidden xl:overflow-visible [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)] xl:[mask-image:none]">
          {projects.map((p, i) => (
            <WheelCard key={p.title} project={p} index={i} position={position} isActive={i === active} onSelect={setActive} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSlider;
