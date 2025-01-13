import React, { useCallback, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { Autoplay, FreeMode, Thumbs } from "swiper/modules";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SwiperSlides = ({ data }) => {
  const { t, i18n } = useTranslation();

  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperLength, setSwiperLength] = useState(null);
  const [progress, setProgress] = useState(null);
  const [activeId, setActiveId] = useState(null);

  const progressCircle = useRef(null);
  const sliderRef = useRef(null);

  const onAutoplayTimeLeft = useCallback((s, time, progress) => {
    progressCircle.current.style.setProperty(
      "--progress",
      `${(1 - progress) * 100}%`
    );
    setProgress(progress);
  }, []);

  const updateSwiperData = useCallback((swiper) => {
    setSwiperLength(swiper?.slides.length);
    setActiveIndex(swiper?.realIndex || 0);
  }, []);

  useEffect(() => {
    if (data && data.length > activeIndex) {
      setActiveId(data[activeIndex].documentId);
    }
  }, [activeIndex, data]);

  const handleNext = useCallback(() => {
    if (sliderRef.current) {
      sliderRef.current.swiper.slideNext();
    }
  }, []);

  useEffect(() => {
    if (
      activeIndex === undefined ||
      activeIndex === null ||
      isNaN(activeIndex)
    ) {
      setActiveIndex(0);
    }
  }, [activeIndex]);

  return (
    <div className="absolute z-[3] top-0 left-0 w-full h-full">
      <Swiper
        ref={sliderRef}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSlideChange={updateSwiperData}
        speed={900}
        loop={true}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        modules={[Autoplay, FreeMode, Thumbs]}
        className="MySwiper relative w-full h-full"
      >
        {data.map((hero, index) => {
          const nextHero = data[index < data.length - 1 ? index + 1 : 0];
          return (
            <SwiperSlide key={hero.documentId}>
              <div
                className="w-[85%] h-full bg-cover bg-center bg-no-repeat max-_1080:w-full"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(http://localhost:1337/${hero.image.url})`,
                }}
              />
              <div
                className="group cursor-pointer absolute z-[1] top-0 right-0 w-[15%] h-full bg-cover bg-no-repeat bg-center 
                max-_1080:hidden"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(http://localhost:1337/${nextHero.image.url})`,
                }}
                onClick={handleNext}
              >
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{
                    ease: "easeIn",
                    opacity: { delay: 1 },
                  }}
                  variants={{
                    visible: { opacity: 1 },
                    hidden: { opacity: 0 },
                  }}
                  className="absolute left-1/2 bottom-[-20px] max-w-[328px] max-h-[152px] -rotate-90 [transform-origin:left_center]"
                >
                  <p className="mb-3 tracking-[2px] font-[600] max-_1600:text-[14px]">
                    {t("hero.next")}
                  </p>
                  <p
                    className="seethrough_text tracking-[3px] group-hover:text-white text-[48px] font-[700] capitalize leading-[1.2] transform-none
                  max-_1600:text-[40px] max-_1440:text-[36px]"
                  >
                    {nextHero.project_address}
                  </p>
                </motion.div>
              </div>
            </SwiperSlide>
          );
        })}

        <div
          className="absolute top-[50%] left-[35vw] z-[12] -translate-y-1/2 -translate-x-1/2 w-full max-w-[840px] pointer-events-none
        max-_1440:left-[40vw] max-_1280:left-[35vw] max-_1280:max-w-[500px] 
        max-_900:w-full max-_900:max-w-full max-_900:left-0 max-_900:translate-x-0 max-_900:px-[5%]"
        >
          <div className="pointer-events-none overflow-y-hidden mb-3">
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
              animate={progress?.toFixed(1) === "0.2" ? "" : "hidden"}
              className="!font-montserrat text-[64px] mb-3 font-[600] capitalize leading-[1.2] 
              max-_1440:text-[56px] max-_1280:text-[5vw] max-_900:text-[8vw] max-_700:text-[9vw] max-_550:mb-4 max-_550:text-[10vw]"
            >
              {data[activeIndex]?.project_address}
            </motion.div>
          </div>
          <Link
            to={`/${i18n.language}/project/${activeId}`}
            className="w-fit pointer-events-auto"
          >
            <p
              className="relative text-[1.3rem] uppercase font-[600] cursor-pointer w-fit !pointer-events-auto inline-block pl-4 ml-[1px] text-lg cursor-pointer font-[500] hover:pl-[64px]
              max-_1280:text-base max-_550:text-[15px] max-_360:text-[14px]

              before:content-[''] before:block before:absolute before:top-1/2 before:left-0 before:h-[1px] before:w-[8px] before:-translate-y-1/2 before:bg-white
              after:content-[''] after:block after:absolute after:top-1/2 after:left-[calc(100%+9px)] after:h-[1px] after:w-[56px] after:-translate-y-1/2 after:bg-white
              hover:after:w-[8px] hover:before:w-[56px] before:transition-[width_0.5s_ease] before:duration-[0.5s] after:transition-[width_0.5s_ease] after:duration-[0.5s]"
              style={{
                transition:
                  "padding-left .5s ease, right .5s ease, opacity .5s ease",
              }}
            >
              {t("services.page.explore_btn")}
            </p>
          </Link>
        </div>
        <div
          className="absolute right-[216px] top-1/2 -translate-y-1/2 z-[10] flex items-center gap-4 font-semibold pointer-events-none
        max-_1440:right-[150px] max-_1080:right-[80px] max-_900:left-[48px] max-_900:top-[calc(50%-160px)] max-_900:text-[14px]"
        >
          <p>{activeIndex + 1}</p>
          <div className="autoplay-progress w-[250px] h-[1px] bg-[#afb0b2] max-_1080:w-[200px] max-_550:w-[150px]">
            <div
              ref={progressCircle}
              className="h-full bg-white"
              style={{ width: `var(--progress)` }}
            ></div>
          </div>
          <p>{activeIndex + 1 !== swiperLength ? activeIndex + 2 : 1}</p>
        </div>
      </Swiper>
    </div>
  );
};

export default SwiperSlides;
