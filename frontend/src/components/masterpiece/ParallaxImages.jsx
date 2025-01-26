import React, { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTranslation } from "react-i18next";

const ParallaxImages = ({ data }) => {
  const { t } = useTranslation();

  const calculateHeight = (num) => {
    if (window.innerWidth > 1200) return num;
    return num + 1;
  };

  const calculateStartEnd = (num) => {
    if (window.innerWidth > 1200) return num;
    return num + 1;
  };

  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      {[
        {
          start: calculateStartEnd(-200),
          end: 200,
          style: "w-1/3",
        },
        {
          start: calculateStartEnd(200),
          end: -250,
          style: "mx-auto w-2/4",
        },
        {
          start: calculateStartEnd(-200),
          end: 200,
          style: "ml-auto w-1/3",
        },
        {
          start: calculateStartEnd(-100),
          end: -500,
          style: "ml-24 w-5/12",
        },
      ].map((text, key) => (
        <ParallaxImg
          src={`/assets/about_images/${key + 1}.jpg`}
          key={key}
          start={text.start}
          end={text.end}
          className={text.style}
        />
      ))}
      <div className="!font-montserrat">
        {[
          { top: 70, left: 7 },
          { top: 60, right: 10 },
          { top: 80, right: 5 },
        ].map((text, key) => (
          <div
            key={key}
            className="absolute text-2xl max-w-[350px] pointer-events-none max-_700:hidden"
            style={
              text.left
                ? {
                    top: `${calculateHeight(text.top)}%`,
                    left: `${text.left}%`,
                  }
                : {
                    top: `${calculateHeight(text.top)}%`,
                    right: `${text.right}%`,
                    textAlign: "right",
                  }
            }
          >
            {t(`masterpiece.${key + 1}`)}
          </div>
        ))}
      </div>
    </div>
  );
};

const ParallaxImg = ({ className, src, start, end }) => {
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
      className={className}
      ref={ref}
      style={{ transform, opacity }}
    />
  );
};

export default ParallaxImages;
