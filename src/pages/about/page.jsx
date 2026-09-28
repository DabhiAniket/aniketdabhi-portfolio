"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CountUpModule from "react-countup";
const CountUp = CountUpModule.default || CountUpModule;
import { aboutData } from "@/data/portfolio";
import Circles from "@/components/Circles";
import Decoration from "@/components/Decoration";
import { fadeIn } from "@/variants";

const About = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="relative min-h-screen bg-primary/30 pt-40 sm:pt-44 pb-32 lg:pt-36 xl:pt-32 xl:pb-16 text-center xl:text-left flex flex-col justify-center">
      <Circles />
      <Decoration
        src="/user.webp"
        width={520}
        height={520}
        delay="1s"
        className="hidden min-[360px]:block top-37.5 right-2 w-14 sm:top-36 sm:right-8 sm:w-24 lg:top-28 lg:w-20 xl:top-auto xl:right-[14%] xl:bottom-14 xl:w-60"
      />

      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="hidden xl:flex absolute bottom-0 -left-92.5"
      >
        {/* <Avatar /> */}
      </motion.div>

      <div className="relative z-10 container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6">
        <div className="flex-1 flex flex-col justify-center">
          <motion.h1
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2"
          >
            About <span className="text-accent">Me.</span>
          </motion.h1>
          <motion.p
            variants={fadeIn("right", 0.4)}
            initial="hidden"
            animate="show"
            className="w-full xl:max-w-[95%] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0"
          >
            I'm Aniket Dabhi, a Full-Stack Software Developer with experience
            working across frontend development, backend systems, APIs and
            databases.
            <br />
            <br />
            I enjoy building applications that are not only visually clean, but
            also reliable and practical in real-world environments. My
            day-to-day work involves technologies such as React.js, Node.js,
            Laravel, Python FastAPI, MongoDB, MySQL and PostgreSQL.
            <br />
            <br />
            I've worked on production systems, full-stack applications, REST
            APIs and microservices, where performance, maintainability and
            security matter. I also enjoy learning new technologies and solving
            problems that require both technical thinking and practical
            implementation.
            <br />
            <br />
            Outside of writing code, I like exploring better ways to structure
            applications, improve performance and turn ideas into working
            products.
          </motion.p>

          <motion.div
            variants={fadeIn("right", 0.6)}
            initial="hidden"
            animate="show"
            className="flex w-full max-w-sm md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8"
          >
            <div className="grid grid-cols-2 gap-y-6 md:flex flex-1 xl:gap-x-6">
              <div className="relative flex-1 after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={3} duration={3} />
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-25 mx-auto xl:mx-0">
                  Years of experience.
                </div>
              </div>

              <div className="relative flex-1 md:after:w-px md:after:h-full md:after:bg-white/10 md:after:absolute md:after:top-0 md:after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={5} duration={3} />+
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-25 mx-auto xl:mx-0">
                  Satisfied employers.
                </div>
              </div>

              <div className="relative flex-1 after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={10} duration={3} />+
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-25 mx-auto xl:mx-0">
                  Finished projects.
                </div>
              </div>

              <div className="relative flex-1">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={2} duration={3} />
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-25 mx-auto xl:mx-0">
                  Winning awards.
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={fadeIn("left", 0.4)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="flex flex-col w-full xl:max-w-[48%] min-h-40 xl:h-120 mt-8 xl:mt-0"
        >
          <div role="tablist" className="flex flex-wrap justify-center xl:justify-start gap-x-4 gap-y-3 xl:gap-x-8 mx-auto xl:mx-0 mb-4">
            {aboutData.map((item, itemI) => (
              <div
                key={itemI}
                className={`${
                  index === itemI &&
                  "text-accent after:w-full after:bg-accent after:transition-all after:duration-300"
                } cursor-pointer capitalize xl:text-lg relative transition-colors duration-300 hover:text-accent after:w-8 after:h-0.5 after:bg-white after:absolute after:-bottom-1 after:left-0`}
                onClick={() => setIndex(itemI)}
                onKeyDown={(e) =>
                  (e.key === "Enter" || e.key === " ") && setIndex(itemI)
                }
                role="tab"
                tabIndex={0}
                aria-selected={index === itemI}
              >
                {item.title}
              </div>
            ))}
          </div>

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="py-2 xl:py-6 flex flex-col gap-y-4 xl:gap-y-4 items-center xl:items-start"
          >
            {aboutData[index].info.map((item, itemI) => (
              <div
                key={itemI}
                className="flex-1 flex flex-col md:flex-row max-w-max gap-x-2 items-center text-center text-white/60"
              >
                <div className="font-light mb-2 md:mb-0">{item.title}</div>
                <div className="hidden md:flex">-</div>
                <div>{item.stage}</div>

                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                  {item.icons?.map((icon, iconI) => (
                    <div key={iconI} className="text-2xl text-white">
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
