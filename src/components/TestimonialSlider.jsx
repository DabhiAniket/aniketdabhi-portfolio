"use client";

import { FaQuoteLeft } from "react-icons/fa";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonialData = [
  {
    image: "/a-logo.webp",
    name: "Clean Code",
    position: "Quality",
    message:
      "I prefer writing code that is clean, readable and easy to maintain. A good codebase should be simple for another developer to understand, extend and work with without unnecessary complexity.",
  },
  {
    image: "/a-logo.webp",
    name: "Problem Solving",
    position: "Mindset",
    message:
      "I like breaking complex requirements into smaller, practical problems and solving them step by step. I focus on understanding the actual requirement first and then building a solution that is reliable and easy to maintain.",
  },
  {
    image: "/a-logo.webp",
    name: "Performance",
    position: "Focus",
    message:
      "I pay attention to application performance from both frontend and backend sides. Optimizing API responses, database queries, rendering and unnecessary processing helps create a smoother experience for users.",
  },
  {
    image: "/a-logo.webp",
    name: "Continuous Learning",
    position: "Growth",
    message:
      "Web development keeps evolving, so I regularly explore new tools, technologies and better development practices. I enjoy learning through real projects and applying what I learn to solve practical problems.",
  },
];

const TestimonialSlider = () => {
  return (
    <Swiper
      navigation
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={900}
      loop={true}
      grabCursor
      modules={[Navigation, Pagination, Autoplay]}
      className="testimonial-swiper pb-12! overflow-hidden"
    >
      {testimonialData.map((person, i) => (
        <SwiperSlide key={i}>
          <div className="flex flex-col items-center md:flex-row gap-x-8 gap-y-4 h-full px-2 sm:px-16 py-4">
            <div className="w-full max-w-75 flex flex-col xl:justify-center items-center relative mx-auto xl:mx-0">
              <div className="flex flex-col justify-center text-center">
                <div className="mb-2 mx-auto">
                  <img
                    src={person.image}
                    width={100}
                    height={100}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-20 h-20 sm:w-25 sm:h-25"
                  />
                </div>

                <div className="text-lg">{person.name}</div>

                <div className="text-[12px] uppercase font-extralight tracking-widest">
                  {person.position}
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center before:w-px xl:before:bg-white/20 xl:before:absolute xl:before:left-0 xl:before:h-50 relative xl:pl-20">
              <div className="mb-4">
                <FaQuoteLeft
                  className="text-4xl xl:text-6xl text-white/20 mx-auto md:mx-0"
                  aria-hidden
                />
              </div>

              <div className="text-[15px] sm:text-base xl:text-lg text-center md:text-left">
                {person.message}
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialSlider;
