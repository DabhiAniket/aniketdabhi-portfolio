"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CountUpModule from "react-countup";
const CountUp = CountUpModule.default || CountUpModule;
import { aboutData } from "@/data/portfolio";
import { personalData } from "@/data/portfolio";
import Circles from "@/components/Circles";
import Avatar from "@/components/Avatar";
import { fadeIn } from "@/variants";

const About = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="h-full bg-primary/30 py-32 text-center xl:text-left">
      <Circles />

      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="hidden xl:flex absolute bottom-0 -left-92.5"
      >
        {/* <Avatar /> */}
      </motion.div>

      <div className="container mx-auto h-full flex flex-col items-center xl:flex-row gap-x-6">
        <div className="flex-1 flex flex-col justify-center">
          <motion.h2
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="h2"
          >
            About <span className="text-accent">Me.</span>
          </motion.h2>
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
            className="hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8"
          >
            <div className="flex flex-1 xl:gap-x-6">
              <div className="relative flex-1 after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={3} duration={3} />
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-25">
                  Years of experience.
                </div>
              </div>

              <div className="relative flex-1 after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={5} duration={3} />+
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-25">
                  Satisfied employers.
                </div>
              </div>

              <div className="relative flex-1 after:w-px after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={10} duration={3} />+
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-25">
                  Finished projects.
                </div>
              </div>

              <div className="relative flex-1">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  <CountUp start={0} end={2} duration={3} />
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-25">
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
          className="flex flex-col w-full xl:max-w-[48%] h-120"
        >
          <div className="flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4">
            {aboutData.map((item, itemI) => (
              <div
                key={itemI}
                className={`${
                  index === itemI &&
                  "text-accent after:w-full after:bg-accent after:transition-all after:duration-300"
                } cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-0.5 after:bg-white after:absolute after:-bottom-1 after:left-0`}
                onClick={() => setIndex(itemI)}
              >
                {item.title}
              </div>
            ))}
          </div>

          <div className="py-2 xl:py-6 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start">
            {aboutData[index].info.map((item, itemI) => (
              <div
                key={itemI}
                className="flex-1 flex flex-col md:flex-row max-w-max gap-x-2 items-center text-center text-white/60"
              >
                <div className="font-light mb-2 md:mb-0">{item.title}</div>
                <div className="hidden md:flex">-</div>
                <div>{item.stage}</div>

                <div className="flex gap-x-4">
                  {item.icons?.map((icon, iconI) => (
                    <div key={iconI} className="text-2xl text-white">
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
