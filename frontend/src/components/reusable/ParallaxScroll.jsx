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

  console.log(images)

  const images_array = service_page
    ? [
        {
          src: images[0].url,
          y: 0,
        },
        {
          src: images[1].url,
          y: lg,
        },
        {
          src: images[2].url,
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
          src: "8",
          y: md,
        },
      ];

  return (
    <div
      ref={container}
      className="parallax_scroll relative mt-[10vh] min-h-[75vh]"
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
              className="imageContainer absolute"
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${
                    service_page
                      ? `http://localhost:1337/${src}`
                      : `/src/assets/about_images/${src}.jpg`
                  })`,
                }}
              ></div>
            </motion.div>
          );
        })}
      </div>
      {service_page && (
        <div className="pointer-events-none text-[15px] text-gray-600">
          <p className="absolute top-0 left-[64px] w-[300px]">
            {t(`services.${service.toLowerCase()}.parallax_texts.top`)}
          </p>
          <p className="absolute bottom-0 text-right right-[64px] w-[300px]">
            {t(`services.${service.toLowerCase()}.parallax_texts.bottom`)}
          </p>
        </div>
      )}
    </div>
  );
};

export default ParallaxScroll;
