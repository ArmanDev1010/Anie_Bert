import React, { useCallback, useEffect, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/thumbs";

// import required modules
import { Autoplay, FreeMode, Thumbs } from "swiper/modules";

import { motion } from "framer-motion";

import { TiltCard } from "../index";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SwiperSlides = ({ data }) => {
  const { t, i18n } = useTranslation();

  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [swiperLength, setSwiperLength] = useState(null);
  const [progress, setProgress] = useState(null);
  const [activeId, setActiveId] = useState(null);

  if (activeIndex == undefined || activeIndex == null || isNaN(activeIndex)) {
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

  const swiperData = (swiper) => {
    setSwiperLength(swiper?.slides.length);
    setActiveIndex(swiper?.realIndex);
  };

  useEffect(() => {
    setActiveId(data[activeIndex].documentId);
  }, [activeIndex]);

  return (
    <div className="absolute z-[3] top-0 left-0 w-full h-full">
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSwiper={setSwiper}
        onSlideChange={() => swiperData(swiper)}
        speed={900}
        loop={true}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        modules={[Autoplay, FreeMode, Thumbs]}
        className="MySwiper relative w-full h-full"
      >
        {data.map((hero, key) => (
          <SwiperSlide key={key}>
            <div
              className="w-full h-full bg-center bg-no-repeat bg-cover"
              style={{
                backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.3),rgba(0, 0, 0, 0.5)),url(http://localhost:1337/${hero.image.url})`,
              }}
            ></div>
          </SwiperSlide>
        ))}
        <div className="absolute bottom-16 right-[64px] z-[4] max-desktopM:bottom-10 w-[450px]">
          {["room", "type"].map((text, key) => (
            <div
              key={key}
              className={`${
                text == "room" ? "text-6xl max-desktopM:text-5xl" : "text-3xl"
              } pointer-events-none overflow-hidden text-right`}
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
                  className="!font-montserrat mb-3 font-medium italic capitalize leading-[1.2]"
                >
                  {data[activeIndex]?.project_address}
                </motion.div>
              ) : (
                <motion.div
                  key={activeIndex}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  transition={{
                    ease: "easeIn",
                    y: { duration: 0.4, delay: 0.7 },
                    opacity: { delay: 0.7 },
                  }}
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: 35 },
                  }}
                  animate={
                    progress?.toFixed(1) == "0.3" ? "visisble" : "hidden"
                  }
                  className="text-gray-200"
                >
                  {t(`hero.types.${data[activeIndex]?.type}`)}
                </motion.div>
              )}
            </div>
          ))}
          <Link to={`/${i18n.language}/project/${activeId}`}>
            <div className="w-fit relative">
              <TiltCard
                element={
                  <div
                    className="bg-secondary rounded-full text-4xl p-[24px] w-fit cursor-pointer 
                group transition duration-200 ease hover:bg-white"
                  >
                    <div className="relative overflow-hidden">
                      <div className="group-hover:translate-y-[-110%] transition duration-300">
                        <svg
                          stroke="white"
                          fill="white"
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          className="pointer-events-none relative z-10 rotate-45 text-7xl text-black transition-all duration-700 ease-out group-hover:rotate-90"
                          height="0.6em"
                          width="0.6em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path fill="none" d="M0 0h24v24H0V0z"></path>
                          <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
                        </svg>
                      </div>
                      <div className="text-secondary translate-y-[110%] group-hover:translate-y-[0%] transition duration-300 absolute top-0 bottom-0 left-0 right-0">
                        <svg
                          stroke="black"
                          fill="black"
                          strokeWidth="0"
                          viewBox="0 0 24 24"
                          className="pointer-events-none relative z-10 rotate-45 text-7xl text-black transition-all duration-700 ease-out group-hover:rotate-90"
                          height="0.6em"
                          width="0.6em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path fill="none" d="M0 0h24v24H0V0z"></path>
                          <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                }
              />
            </div>
          </Link>
        </div>
        <div className="absolute right-[216px] top-1/2 -translate-y-1/2 z-[10] flex items-center gap-4 font-semibold pointer-events-none">
          <p>{activeIndex + 1}</p>
          <div className="autoplay-progress w-[250px] h-[1px] bg-[#afb0b2]">
            <div ref={progressCircle} className="h-full bg-white"></div>
          </div>
          <p>{activeIndex + 1 !== swiperLength ? activeIndex + 2 : 1}</p>
        </div>
      </Swiper>
    </div>
  );
};

export default SwiperSlides;
