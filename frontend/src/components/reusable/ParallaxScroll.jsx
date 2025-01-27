import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";

const ParallaxScroll = ({ service, service_page }) => {
  const { t } = useTranslation();

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const numbers = shuffleArray([1, 2, 3, 4, 5, 6]);

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const md = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const lg = useTransform(scrollYProgress, [0, 1], [0, -250]);

  const images_array = [
    {
      y: 0,
    },
    {
      y: lg,
    },
    {
      y: md,
    },
  ];

  return (
    <div
      ref={container}
      className="parallax_scroll relative mt-[10vh] min-h-[75vh] max-_700:mt-0 max-_550:min-h-[55vh]"
    >
      <div className="flex w-full justify-center relative mt-[5vh]">
        {images_array.map(({ y }, key) => {
          return (
            <motion.div
              style={{ y }}
              key={key}
              className="about_imageContainer absolute"
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat bg-secondary"
                style={{
                  backgroundImage: `url(/assets/about_images/${numbers[key]}.jpg)`,
                }}
              ></div>
            </motion.div>
          );
        })}
      </div>
      {service_page && (
        <div className="pointer-events-none text-[16px] text-gray-600 max-_1280:hidden">
          <p className="absolute top-0 left-[64px] w-[320px]">
            {t(`services.page.${service.toLowerCase()}.parallax_texts.top`)}
          </p>
          <p className="absolute bottom-0 text-right right-[64px] w-[320px]">
            {t(`services.page.${service.toLowerCase()}.parallax_texts.bottom`)}
          </p>
        </div>
      )}
    </div>
  );
};

export default ParallaxScroll;
