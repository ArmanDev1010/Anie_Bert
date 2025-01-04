import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxScroll = ({ service_page }) => {
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
          src: "2",
          y: 0,
        },
        {
          src: "5",
          y: lg,
        },
        {
          src: "10",
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
    <div ref={container} className="parallax_scroll mt-[10vh] min-h-[75vh]">
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
                  backgroundImage: `url(/src/assets/about_images/${src}.jpg)`,
                }}
              ></div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ParallaxScroll;
