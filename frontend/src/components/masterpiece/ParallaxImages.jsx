import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

const ParallaxImages = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      {[
        { start: -200, end: 200, style: "w-1/3" },
        { start: 200, end: -250, style: "mx-auto w-2/3" },
        { start: -200, end: 200, style: "ml-auto w-1/3" },
        { start: 0, end: -500, style: "ml-24 w-5/12" },
      ].map((text, key) => (
        <ParallaxImg
          src={`/src/assets/scroll/${key + 1}.jpg`}
          key={key}
          start={text.start}
          end={text.end}
          className={text.style}
        />
      ))}
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

export default ParallaxImages;
