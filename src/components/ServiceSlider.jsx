"use client";

import { m } from "framer-motion";
import {
  RxArrowTopRight,
} from "react-icons/rx";

import { servicesData as serviceData } from "@/data/portfolio";
import { reveal, trackSpotlight } from "@/lib/motion";

const ServiceSlider = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {serviceData.map((item, i) => (
        <m.div
          key={i}
          {...reveal(0.1 + (i % 2) * 0.1)}
          onPointerMove={trackSpotlight}
          className="spotlight relative bg-[rgba(65,47,123,0.15)] h-full rounded-lg px-6 py-8 flex flex-col text-left group cursor-pointer ring-1 ring-white/5 hover:ring-accent/30 hover:bg-[rgba(89,65,169,0.15)] hover:-translate-y-1 transition-[background-color,transform,box-shadow] duration-300 hover:shadow-[0_18px_40px_-20px_rgba(241,48,36,0.5)]"
        >
          <div className="text-4xl text-accent mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 origin-left">{item.icon}</div>

          <div className="mb-8">
            <div className="mb-2 text-lg">{item.title}</div>
            <p className="md:max-w-87.5 leading-normal">{item.description}</p>
          </div>

          <div className="text-3xl">
            <RxArrowTopRight
              className="group-hover:rotate-45 group-hover:text-accent transition-all duration-300"
              aria-hidden
            />
          </div>
        </m.div>
      ))}
    </div>
  );
};

export default ServiceSlider;
