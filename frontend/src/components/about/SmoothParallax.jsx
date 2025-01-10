import React, { useEffect, useRef, useState } from "react";
import { useTransform, useScroll, motion } from "framer-motion";
import { useQuery, gql } from "@apollo/client";

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
];

const SmoothParallax = () => {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);

    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative smooth_parallax overflow-hidden">
      <div
        ref={gallery}
        className="h-[175vh] bg-secondary relative flex gap-[2vw] p-[2vw] overflow-hidden"
      >
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>
      <h1
        className="font-articulat text-white text-[6vw] z-[3] text-center whitespace-nowrap pointer-events-none uppercase 
        absolute top-[25%] left-1/2 -translate-x-1/2 -translate-y-[25%]"
      >
        The World of Anie Bert
      </h1>
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
    </div>
  );
};

const Column = ({ images, y }) => {
  return (
    <motion.div
      className="column relative h-full w-[25%] min-w-[250px] flex flex-col gap-[2vw]"
      style={{ y }}
    >
      {images.map((src, i) => {
        return (
          <div
            key={i}
            className="h-full w-full relative rounded-[1vw] overflow-hidden"
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat bg-white"
              style={{ backgroundImage: `url(/src/assets/about_images/${src})` }}
            />
          </div>
        );
      })}
    </motion.div>
  );
};

export default SmoothParallax;
