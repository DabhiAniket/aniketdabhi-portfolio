"use client";

import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

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

const Nav = () => {
  const pathname = useLocation().pathname;

  return (
    <nav aria-label="Main navigation" className="flex flex-col items-center xl:justify-center gap-y-4 fixed h-max bottom-0 mt-auto xl:right-[2%] z-50 top-0 w-full xl:w-16 xl:max-w-md xl:h-screen">
      <div className="nav-safe xl:pb-8 flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-10 px-4 sm:px-16 md:px-40 xl:px-0 h-auto min-h-20 xl:h-max py-4 xl:py-8 bg-white/10 backdrop-blur-xs text-[26px] sm:text-3xl xl:text-xl xl:rounded-full">
        {navData.map((link, i) => (
          <Link
            className={`${
              link.path === pathname ? "text-accent" : ""
            } relative flex items-center justify-center group hover:text-accent transition-colors duration-300 p-2 xl:p-0 -m-2 xl:m-0`}
            to={link.path}
            key={i}
            aria-current={link.path === pathname ? "page" : undefined}
          >
            <div
              aria-hidden="true"
              className="absolute pr-14 right-0 hidden xl:group-hover:flex"
            >
              <div className="bg-white relative flex text-primary items-center p-1.5 rounded-[3px]">
                <div className="text-[12px] leading-none font-semibold capitalize">
                  {link.name}
                </div>

                <div
                  className="border-solid border-l-white border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute -right-2"
                  aria-hidden
                />
              </div>
            </div>

            <div>
              <link.Icon aria-hidden />
            </div>
            <span className="sr-only">{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
