import React, { useRef } from "react";

import { useScroll, useTransform, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Autoplay } from "swiper/modules";

const Projects = () => {
  return (
    <div className="relative bg-white text-black">
      <div className="absolute w-fit top-14 left-[64px] font-semibold uppercase text-7xl text-left max-desktopM:relative max-desktopM:text-6xl">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            ease: "easeIn",
            y: { duration: 0.5, delay: 0.5 },
            opacity: { delay: 0.5 },
          }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 60 },
          }}
        >
          Our Projects
        </motion.p>
      </div>
      <Project />
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat opacity-20"
        style={{ backgroundImage: "url(/src/assets/line-grid.png)" }}
      ></div>
    </div>
  );
};

const Project = () => {
  const { t } = useTranslation();

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-75%"]);

  return (
    <div ref={targetRef} className="relative z-[3] h-[300vh]">
      <div className="sticky top-0 flex h-[100vh] items-center overflow-hidden pt-[80px]">
        <motion.ul style={{ x }} className="flex gap-8">
          {["1", "2", "3", "4", "5", "swiper"].map((text, key) => (
            <div
              className="group bg-[#080808] relative w-[650px] h-[550px] overflow-hidden cursor-pointer 
              bg-cover bg-center bg-no-repeat text-white transition duration-300 hover:-translate-y-5 max-desktopM:w-[400px] max-desktopM:h-[500px]"
              key={key}
              style={
                text !== "swiper"
                  ? {
                      backgroundImage: `url(/src/assets/projects/${text}.jpg)`,
                    }
                  : null
              }
            >
              {text !== "swiper" ? (
                <>
                  <div
                    className="text-[2.5vw] absolute w-full z-[1] text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  font-semibold capitalize mb-4 overflow-hidden"
                  >
                    <div className="group-hover:translate-y-[-110%] transition duration-500">
                      {t(`projects.${text}`)}
                    </div>
                    <div className="translate-y-[110%] group-hover:translate-y-[0%] transition duration-500 absolute top-0 bottom-0 left-0 right-0">
                      {t(`projects.${text}`)}
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-80"></div>
                </>
              ) : (
                <>
                  <Swiper
                    slidesPerView={1}
                    autoplay={{
                      delay: 500,
                      disableOnInteraction: true,
                    }}
                    speed={10}
                    loop={true}
                    modules={[Autoplay]}
                    className="relative w-full h-full"
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
                    className="text-[2.5vw] absolute font-semibold text-center  overflow-hidden pointer-events-none text-white overflow-hidden 
                    top-1/2 left-1/2 z-[1] -translate-y-1/2 -translate-x-1/2 w-full"
                  >
                    <div className="group-hover:translate-y-[-110%] transition duration-300">
                      See other projects
                    </div>
                    <div className="translate-y-[110%] group-hover:translate-y-[0%] transition duration-300 absolute top-0 bottom-0 left-0 right-0">
                      See other projects
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default Projects;
