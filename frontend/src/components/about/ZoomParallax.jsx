import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const ZoomParallax = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  return (
    <div ref={container} className="h-[300vh] relative">
      <div className="sticky overflow-hidden top-0 h-screen">
        {[
          {
            src: "",
            scale: scale4,
          },
          {
            src: "",
            scale: scale5,
          },
          {
            src: "",
            scale: scale6,
          },
          {
            src: "",
            scale: scale5,
          },
          {
            src: "",
            scale: scale6,
          },
          {
            src: "",
            scale: scale8,
          },
          {
            src: "",
            scale: scale9,
          },
        ].map(({ src, scale }, index) => {
          return (
            <motion.div
              key={index}
              style={{ scale }}
              className="zoom_el w-full h-full top-0 absolute flex items-center justify-center"
            >
              <div className="imageContainer relative w-[25vw] h-[25vh]">
                <div
                  style={{ backgroundImage: "url(/src/assets/1.jpg)" }}
                  className="w-full h-full bg-cover bg-center bg-no-repeat"
                ></div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ZoomParallax;
