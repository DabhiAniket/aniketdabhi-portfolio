"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AnimatePresence, animate, m, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

import {
  HiHome,
  HiUser,
  HiViewColumns,
  HiRectangleGroup,
  HiChatBubbleBottomCenterText,
  HiEnvelope,
} from "react-icons/hi2";

export const navData = [
  { name: "home", label: "Home", path: "/", Icon: HiHome },
  { name: "about", label: "About Aniket Dabhi", path: "/about", Icon: HiUser },
  { name: "services", label: "Services", path: "/services", Icon: HiRectangleGroup },
  { name: "work", label: "Portfolio projects", path: "/work", Icon: HiViewColumns },
  {
    name: "testimonials",
    label: "Development approach",
    path: "/testimonials",
    Icon: HiChatBubbleBottomCenterText,
  },
  {
    name: "contact",
    label: "Contact",
    path: "/contact",
    Icon: HiEnvelope,
  },
];

// Bar geometry (px). The active icon rides in a ball that sits in a smooth dip cut
// into the bar's leading edge (top edge of the bottom bar, left edge of the desktop
// side pill); on navigation the ball lifts out, the dip flattens, the ball arcs to
// the new item and the dip opens again under it.
const THICK = 64; // bar height (bottom bar) or width (side pill)
const BALL = 48;
const DIP_W = 44; // half-length of the dip
const DIP_D = 26; // depth of the dip
const LIFT = 24; // how far the ball jumps out between items
const MOVE = { duration: 0.6, ease: [0.65, 0, 0.35, 1] };

// Outline of a bar of length `len` whose leading edge dips smoothly at `c`.
// `a` runs along the bar, `b` across it; vertical swaps the axes, which mirrors
// the shape, so the corner arcs flip their sweep direction.
const barPath = (len, c, depth, k, vertical) => {
  const p = (a, b) => (vertical ? `${b} ${a}` : `${a} ${b}`);
  const arc = (a, b) => `A${k} ${k} 0 0 ${vertical ? 0 : 1} ${p(a, b)}`;
  const l = Math.max(k, c - DIP_W);
  const r = Math.min(len - k, c + DIP_W);
  return [
    `M${p(0, k)} ${arc(k, 0)} L${p(l, 0)}`,
    `C${p(l + (c - l) * 0.5, 0)} ${p(c - (c - l) * 0.55, depth)} ${p(c, depth)}`,
    `C${p(c + (r - c) * 0.55, depth)} ${p(r - (r - c) * 0.5, 0)} ${p(r, 0)}`,
    `L${p(len - k, 0)} ${arc(len, k)} L${p(len, THICK - k)} ${arc(len - k, THICK)}`,
    `L${p(k, THICK)} ${arc(0, THICK - k)} Z`,
  ].join(" ");
};

const NavBar = ({ pathname, vertical = false }) => {
  const reduceMotion = useReducedMotion();
  const active = Math.max(0, navData.findIndex((link) => link.path === pathname));
  const ActiveIcon = navData[active].Icon;
  const corner = vertical ? THICK / 2 : 24;

  const barRef = useRef(null);
  const itemRefs = useRef([]);
  const [centers, setCenters] = useState([]);
  const length = useMotionValue(0);
  const at = useMotionValue(0);
  const lift = useMotionValue(0);
  const depth = useMotionValue(DIP_D);
  const d = useTransform([length, at, depth], ([len, c, dp]) => (len ? barPath(len, c, dp, corner, vertical) : ""));
  const ballAlong = useTransform(at, (c) => c - BALL / 2);

  // Item centres come from the real layout, so they follow any bar size.
  useLayoutEffect(() => {
    const el = barRef.current;
    const measure = () => {
      length.set(vertical ? el.offsetHeight : el.offsetWidth);
      setCenters(
        itemRefs.current.map((a) => (vertical ? a.offsetTop + a.offsetHeight / 2 : a.offsetLeft + a.offsetWidth / 2)),
      );
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [length, vertical]);

  const shown = useRef(null);
  useEffect(() => {
    if (!centers.length) return;
    const to = centers[active];
    // First paint, a resize, or reduced motion: just place the ball.
    if (shown.current === null || shown.current === active || reduceMotion) {
      shown.current = active;
      at.jump(to);
      return;
    }
    shown.current = active;
    // null = start from the current value, so a quick second click never jumps.
    const runs = [
      animate(at, to, MOVE),
      animate(lift, [null, -LIFT, 0], { duration: MOVE.duration, times: [0, 0.45, 1], ease: ["easeOut", "easeIn"] }),
      animate(depth, [null, 0, 0, DIP_D], { duration: MOVE.duration, times: [0, 0.25, 0.7, 1] }),
    ];
    return () => runs.forEach((run) => run.stop());
  }, [active, centers, reduceMotion, at, lift, depth]);

  const rest = DIP_D - BALL - 6; // ball sits in the dip, half outside the bar
  const ballStyle = vertical
    ? { y: ballAlong, x: lift, top: 0, left: rest }
    : { x: ballAlong, y: lift, left: 0, top: rest };
  const fillId = `nav-bar-fill-${vertical ? "v" : "h"}`;

  return (
    <div className={vertical ? "hidden xl:block" : "xl:hidden px-3 sm:px-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]"}>
      <div
        ref={barRef}
        className={vertical ? "relative" : "relative mx-auto max-w-md"}
        style={vertical ? { width: THICK } : { height: THICK }}
      >
        <svg className="absolute inset-0 size-full overflow-visible drop-shadow-[0_14px_30px_rgba(0,0,0,0.5)]" aria-hidden>
          <defs>
            <linearGradient id={fillId} x1="0" y1="0" x2={vertical ? 1 : 0} y2={vertical ? 0 : 1}>
              <stop offset="0" stopColor="#2b2052" />
              <stop offset="1" stopColor="#16112d" />
            </linearGradient>
          </defs>
          <m.path d={d} fill={`url(#${fillId})`} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
        </svg>

        {/* The floating ball with the active icon. */}
        <m.div
          aria-hidden
          style={{ ...ballStyle, width: BALL, height: BALL }}
          className={`absolute z-20 grid place-items-center rounded-full bg-linear-to-br from-[#ff5a3c] via-accent to-[#a3124f] text-white text-[22px] shadow-[0_10px_24px_-6px_rgba(241,48,36,0.75),inset_0_1px_0_rgba(255,255,255,0.35)] pointer-events-none ${
            centers.length ? "" : "opacity-0"
          }`}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <m.span
              key={active}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.4, type: "spring", stiffness: 420, damping: 18 } }}
              exit={{ scale: 0, opacity: 0, transition: { duration: 0.15 } }}
            >
              <ActiveIcon />
            </m.span>
          </AnimatePresence>
        </m.div>

        <div className={`relative z-10 flex size-full ${vertical ? "flex-col py-6" : "items-center px-2"}`}>
          {navData.map((link, i) => (
            <Link
              key={link.path}
              ref={(el) => (itemRefs.current[i] = el)}
              to={link.path}
              aria-current={i === active ? "page" : undefined}
              className={`group relative grid place-items-center rounded-2xl text-white/60 hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 transition-colors duration-300 ${
                vertical ? "w-full h-[clamp(2.75rem,calc((100dvh-200px)/6),3.5rem)] text-xl" : "flex-1 h-full text-[22px] sm:text-2xl"
              }`}
            >
              {/* Desktop hover label, kept clear of the ball that pops out on the left. */}
              {vertical && (
                <span aria-hidden className="absolute right-full top-1/2 -translate-y-1/2 mr-10 hidden group-hover:flex">
                  <span className="bg-white relative flex text-primary items-center p-1.5 rounded-[3px]">
                    <span className="text-[12px] leading-none font-semibold capitalize">{link.name}</span>
                    <span className="border-solid border-l-white border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute -right-2" />
                  </span>
                </span>
              )}

              {/* The active item's icon sinks away: it is shown in the ball instead. */}
              <span
                aria-hidden
                className={`transition-[opacity,transform] duration-300 group-active:scale-90 ${
                  i === active
                    ? `opacity-0 scale-50 ${vertical ? "translate-x-3" : "translate-y-3"}`
                    : `opacity-100 ${vertical ? "group-hover:scale-115" : ""}`
                }`}
              >
                <link.Icon />
              </span>
              <span className="sr-only">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const Nav = () => {
  const pathname = useLocation().pathname;

  return (
    <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-50 xl:inset-x-auto xl:top-0 xl:right-[2%] xl:w-16 xl:max-w-md xl:h-screen xl:flex xl:flex-col xl:items-center xl:justify-center xl:gap-y-4">
      <NavBar pathname={pathname} />
      <NavBar pathname={pathname} vertical />
    </nav>
  );
};

export default Nav;
