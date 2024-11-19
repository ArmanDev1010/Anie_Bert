import React, { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

import { PiPlusThin } from "react-icons/pi";
import { useTranslation } from "react-i18next";

const Services = () => {
  return (
    <div className="service px-4 py-14 bg-white text-black">
      <div className="mx-auto max-w-5xl">
        <motion.h1
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75 }}
          className="mb-20 text-4xl font-black uppercase"
        >
          Our Services
        </motion.h1>
        {[
          { title: "Interior Design", number: "1" },
          { title: "Architecture", number: "2" },
          { title: "Remodeling", number: "3" },
          { title: "Commercial Desig", number: "4" },
        ].map((text, key) => (
          <Service title={text.title} number={text.number} key={key} />
        ))}
      </div>
    </div>
  );
};

const Service = ({ title, number }) => {
  const { t } = useTranslation();

  const [active, setActive] = useState(false);

  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : "0px";
  }, [contentRef, active]);

  return (
    <motion.div
      initial={{ y: 48, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.75 }}
      className="group my-[36px] relative border-b border-zinc-800 px-3 pb-9 cursor-pointer"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="w-full flex items-center justify-between">
        <p className="text-3xl py-2">{title}</p>
        <PiPlusThin className="relative z-[2] text-3xl text-gray-900" />
      </div>
      <div className="service__dropdown" ref={contentRef}>
        <div className="mt-10 p-4">
          <p className="w-[400px] mb-8 pointer-events-none">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Voluptatibus esse quae dignissimos ratione accusamus labore
            repudiandae fugit, quasi beatae enim adipisci ab a aspernatur
            commodi pariatur impedit dolores assumenda hic?
          </p>
          <button
            className="relative border-black border-[1px] px-12 py-3 rounded-full font-semibold uppercase 
        transition duration-200 hover:bg-black hover:text-white hover:before:opacity-100 before:transition before:duration-200
        before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 
        before:border-[1px] before:border-black before:w-[110%] before:h-[140%] before:rounded-full before:opacity-0"
          >
            Learn more
          </button>
          <div
            className="absolute z-[1] top-0 right-0 bg-cover bg-center bg-no-repeat w-[350px] h-[calc(100%-36px)] 
            transition-opacity duration-400 opacity-0 group-hover:opacity-100"
            style={{
              backgroundImage: `url(/src/assets/swiper/${number}.jpg)`,
            }}
          ></div>
        </div>
      </div>
    </motion.div>
  );
};

export default Services;
