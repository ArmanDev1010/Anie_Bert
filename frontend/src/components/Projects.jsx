import React, { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Autoplay } from "swiper/modules";
import TiltCard from "./TiltCard";

const Projects = () => {
  const { t } = useTranslation();

  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div className="projects relative  bg-white text-black px-[64px] py-14">
      <div className="relative z-[1] mb-8 pt-0 w-[75%] flex justify-between gap-10">
        <div className="">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ ease: "easeIn", x: { duration: 0.4 } }}
            variants={{
              visible: { opacity: 1, x: 0 },
              hidden: { opacity: 0, x: -100 },
            }}
            className="text-[65px] font-[700] uppercase pointer-events-none mb-3 max-desktopM:text-[59px]"
          >
            Our Projects
          </motion.h2>
          <p className="w-[35rem] text-[#78787d] text-[17px]">
            We released more than 20+ commercial and private projects all around
            Armenia, providing our clients with custom solutions in stylish,
            functional, and well-thought-out designs.
          </p>
        </div>
        <div className="self-end flex gap-6">
          {["prev", "next"].map((text, key) => (
            <div
              className="group cursor-pointer w-[5.5rem] h-[5.5rem] border border-secondary opacity-100
              transition-bg duration-300 hover:bg-black rounded-[50vw] justify-center items-center flex bg-white"
              onClick={text == "prev" ? handlePrev : handleNext}
              key={key}
            >
              <div className="relative overflow-hidden">
                <div className="group-hover:translate-y-[-110%] transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 48 48"
                    fill="none"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                    role="img"
                    className="!w-[48px] !h-[48px]"
                  >
                    <path
                      d={
                        text == "next"
                          ? "M32.3501 26.0001H8.00006V22.0001H32.3501L21.1501 10.8001L24.0001 8.00012L40.0001 24.0001L24.0001 40.0001L21.1501 37.2001L32.3501 26.0001Z"
                          : "M15.6501 22.0001L40.0001 22.0001L40.0001 26.0001L15.6501 26.0001L26.8501 37.2001L24.0001 40.0001L8.00006 24.0001L24.0001 8.00013L26.8501 10.8001L15.6501 22.0001Z"
                      }
                      fill="black"
                    ></path>
                  </svg>
                </div>
                <div className="translate-y-[110%] group-hover:translate-y-[0%] transition duration-300 absolute top-0 bottom-0 left-0 right-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    viewBox="0 0 48 48"
                    fill="none"
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                    role="img"
                    className="!w-[48px] !h-[48px]"
                  >
                    <path
                      d={
                        text == "next"
                          ? "M32.3501 26.0001H8.00006V22.0001H32.3501L21.1501 10.8001L24.0001 8.00012L40.0001 24.0001L24.0001 40.0001L21.1501 37.2001L32.3501 26.0001Z"
                          : "M15.6501 22.0001L40.0001 22.0001L40.0001 26.0001L15.6501 26.0001L26.8501 37.2001L24.0001 40.0001L8.00006 24.0001L24.0001 8.00013L26.8501 10.8001L15.6501 22.0001Z"
                      }
                      fill="white"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-[1980px] w-full flex gap-[25px] h-[550px] max-desktopM:h-[500px]">
        <div className="w-[75%]">
          <Swiper
            slidesPerView={3}
            autoplay={{
              delay: 2000,
              disableOnInteraction: true,
            }}
            centeredSlides={false}
            spaceBetween={30}
            loop={true}
            speed={600}
            ref={sliderRef}
            modules={[Autoplay]}
            className="relative w-full h-full cursor-grab py-2 px-2"
          >
            {["1", "2", "3", "4"].map((text, key) => (
              <SwiperSlide key={key} className="bg-black">
                <TiltCard
                  element={
                    <div
                      className="group bg-[#080808] w-full h-full bg-cover bg-center bg-no-repeat cursor-pointer text-white overflow-hidden"
                      style={{
                        backgroundImage: `url(/src/assets/projects/${text}.jpg)`,
                      }}
                    >
                      <div className="absolute bottom-0 z-[1] px-7 pb-5 w-full translate-y-[110%] group-hover:translate-y-[0%] transition duration-300">
                        <p className="text-3xl font-semibold capitalize mb-4 max-desktopM:text-2xl">
                          {t(`projects.${text}.title`)}
                        </p>
                        <div className="flex justify-between text-gray-300">
                          <p>{t(`projects.${text}.project`)}</p>
                          <p>{t(`projects.${text}.area`)}</p>
                        </div>
                      </div>
                      <div className=""></div>
                      <div
                        className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-0 
              group-hover:opacity-80 transition-opacity duration-300"
                      ></div>
                    </div>
                  }
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="group relative w-[25%] overflow-hidden">
          <Swiper
            slidesPerView={1}
            autoplay={{
              delay: 500,
              disableOnInteraction: true,
            }}
            speed={10}
            loop={true}
            modules={[Autoplay]}
            className="relative w-full h-full py-2"
          >
            {["1", "2", "3", "4"].map((text, key) => (
              <SwiperSlide key={key}>
                <div
                  className="bg-[#080808] w-full h-full bg-cover bg-center bg-no-repeat cursor-pointer"
                  style={{
                    backgroundImage: `url(/src/assets/swiper/${text}.jpg)`,
                  }}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-black to-transparent opacity-60"></div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="absolute overflow-hidden pointer-events-none text-white overflow-hidden max-desktopM:text-2xl
          top-1/2 left-1/2 z-[1] -translate-y-1/2 -translate-x-1/2 w-full text-center text-3xl font-semibold"
          >
            <div className="group-hover:translate-y-[-110%] transition duration-300">
              See other projects
            </div>
            <div className="translate-y-[110%] group-hover:translate-y-[0%] transition duration-300 absolute top-0 bottom-0 left-0 right-0">
              See other projects
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat opacity-20"
        style={{ backgroundImage: "url(/src/assets/line-grid.png)" }}
      ></div>
    </div>
  );
};

export default Projects;
