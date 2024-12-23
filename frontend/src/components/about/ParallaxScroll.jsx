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

  const images = [
    {
      src: "",
      y: 0,
    },
    {
      src: "",
      y: lg,
    },
    {
      src: "",
      y: md,
    },
  ];

  return (
    <div ref={container} className="parallax_scroll mt-[10vh] min-h-[75vh]">
      <div className="flex w-full justify-center relative mt-[5vh]">
        {images.map(({ src, y }, i) => {
          return (
            <motion.div
              style={{ y }}
              key={`i_${i}`}
              className="imageContainer absolute"
            >
              <div
                className="w-full h-full bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url(/src/assets/1.jpg)" }}
              ></div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ParallaxScroll;
