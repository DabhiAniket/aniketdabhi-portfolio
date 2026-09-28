"use client";

import {
  RxArrowTopRight,
} from "react-icons/rx";

import { servicesData as serviceData } from "@/data/portfolio";

const ServiceSlider = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {serviceData.map((item, i) => (
        <div
          key={i}
          className="bg-[rgba(65,47,123,0.15)] h-max rounded-lg px-6 py-8 flex flex-col text-left group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] hover:-translate-y-1 transition-[background-color,transform] duration-300"
        >
          <div className="text-4xl text-accent mb-4">{item.icon}</div>

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
        </div>
      ))}
    </div>
  );
};

export default ServiceSlider;
