import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxScroll = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const sm = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const md = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const lg = useTransform(scrollYProgress, [0, 1], [0, -250]);

  return (
    <div ref={container} className="parallax_scroll mt-[10vh] min-h-[75vh]">
      <div className="flex w-full justify-center relative mt-[5vh]">
        {[
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
        ].map(({ src, y }, key) => {
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
