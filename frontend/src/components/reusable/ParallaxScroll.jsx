import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";

const ParallaxScroll = ({ service, service_page, images }) => {
  const { t } = useTranslation();

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const md = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const lg = useTransform(scrollYProgress, [0, 1], [0, -250]);

  const images_array = service_page
    ? [
        {
          src: images && images[0]?.url,
          y: 0,
        },
        {
          src: images && images[1]?.url,
          y: lg,
        },
        {
          src: images && images[2]?.url,
          y: md,
        },
      ]
    : [
        {
          src: "1",
          y: 0,
        },
        {
          src: "4",
          y: lg,
        },
        {
          src: "5",
          y: md,
        },
      ];

  return (
    <div
      ref={container}
      className="parallax_scroll relative mt-[10vh] min-h-[75vh] max-_700:mt-0 max-_550:min-h-[55vh]"
    >
      <div
        className={`flex w-full justify-center relative mt-[5vh] ${
          service_page && "service_page"
        }`}
      >
        {images_array.map(({ src, y }, key) => {
          return (
            <motion.div
              style={{ y }}
              key={key}
              className="about_imageContainer absolute"
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat bg-secondary"
                style={{
                  backgroundImage: `url(${
                    service_page
                      ? `http://localhost:1337/${src}`
                      : `/assets/about_images/${src}.jpg`
                  })`,
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
