import React, { useCallback, useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/thumbs";

// import required modules
import { Autoplay, FreeMode, Thumbs } from "swiper/modules";
import { useTranslation } from "react-i18next";

import { GoArrowDown } from "react-icons/go";

import { motion } from "framer-motion";

import { TiltCard } from "../index";

const SwiperSlides = () => {
  const { t } = useTranslation();

  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [progress, setProgress] = useState(null);

  if (activeIndex == undefined || activeIndex == null || activeIndex == NaN) {
    setActiveIndex(0);
  }

  const progressCircle = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty(
      "--progress",
      `${(1 - progress) * 100}%`
    );
    setProgress(progress);
  };

  return (
    <div className="absolute z-[3] top-0 left-0 w-full h-full">
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSwiper={setSwiper}
        onSlideChange={() => setActiveIndex(swiper?.realIndex)}
        speed={900}
        loop={true}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        modules={[Autoplay, FreeMode, Thumbs]}
        className="MySwiper relative w-full h-full"
      >
        {["1", "2", "3", "4"].map((text, key) => (
          <SwiperSlide key={key}>
            <div
              className="w-full h-full bg-center bg-no-repeat bg-cover"
              style={{
                backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.5)),url(/src/assets/swiper/${text}.jpg)`,
              }}
            ></div>
          </SwiperSlide>
        ))}
        <div className="absolute bottom-16 right-16 z-[4] max-desktopM:bottom-10 w-[500px]">
          {["room", "type"].map((text, key) => (
            <div
              key={key}
              className={`${
                text == "room" ? "text-5xl max-desktopM:text-4xl" : "text-3xl"
              } pointer-events-none capitalize overflow-hidden text-right`}
            >
              {text == "room" ? (
                <motion.div
                  key={activeIndex}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  transition={{
                    ease: "easeIn",
                    y: { duration: 0.5, delay: 0.3 },
                    opacity: { delay: 0.5 },
                  }}
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: 60 },
                  }}
                  animate={
                    progress?.toFixed(1) == "0.2" ? "visisble" : "hidden"
                  }
                  className="mb-5 font-medium italic"
                >
                  {t(`hero.swiper.${activeIndex + 1}.room`)}
                </motion.div>
              ) : (
                <div className="text-gray-200">
                  {t(`hero.swiper.${activeIndex + 1}.type`)}
                </div>
              )}
            </div>
          ))}
          <div className="w-fit relative">
            <TiltCard
              element={
                <div
                  className="bg-black rounded-full text-4xl p-[24px] w-fit cursor-pointer 
                group transition duration-200 ease hover:bg-white"
                >
                  <div className="relative overflow-hidden">
                    <div className="group-hover:translate-y-[-110%] transition duration-300">
                      <GoArrowDown className="rotate-[-135deg]" />
                    </div>
                    <div className="text-black translate-y-[110%] group-hover:translate-y-[0%] transition duration-300 absolute top-0 bottom-0 left-0 right-0">
                      <GoArrowDown className="rotate-[-135deg]" />
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        </div>
        <div className="absolute right-[216px] top-1/2 -translate-y-1/2 z-[10] flex items-center gap-4 font-semibold pointer-events-none">
          <p>{activeIndex + 1}</p>
          <div className="autoplay-progress w-[250px] h-[1px] bg-[#afb0b2]">
            <div ref={progressCircle} className="h-full bg-white"></div>
          </div>
          <p>{activeIndex + 1 !== 4 ? activeIndex + 2 : 1}</p>
        </div>
      </Swiper>
    </div>
  );
};

export default SwiperSlides;
