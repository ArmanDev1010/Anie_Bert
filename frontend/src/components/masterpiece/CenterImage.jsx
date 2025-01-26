import React from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";

const CenterImage = ({ SECTION_HEIGHT, data }) => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const calculateHeight = () => {
    if (window.innerWidth > 1200) return 500;
    if (window.innerWidth > 700) return 300;
    if (window.innerWidth > 500) return 150;
    return 100;
  };

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + calculateHeight()],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + calculateHeight()],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-[100vh] w-full max-_700:h-[75vh]"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: `url(/assets/about_images/main.jpg)`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

export default CenterImage;
