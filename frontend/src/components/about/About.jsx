import React from "react";

import { motion } from "framer-motion";

import { RoundedButton } from "..";
import { Link } from "react-router-dom";

const slideUp = {
  initial: {
    y: "100%",
  },
  open: (i) => ({
    y: "0%",
    transition: { duration: 0.5, delay: 0.01 * i },
  }),
  closed: {
    y: "100%",
    transition: { duration: 0.5 },
  },
};

const opacity = {
  initial: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  closed: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};

const About = () => {
  const phrase =
    "Anie Bert is an architecture and interior design studio founded by Anie Bert in 2021. We have been engaged in residential and commercial design projects for over 3 years. Completing 15+ residential and commercial projects.";

  return (
    <div className="px-[200px] mt-[100px] mb-[120px] flex justify-center max-desktopM:mb-[80px] max-desktopM:px-[150px]">
      <div className="max-w-[1400px] flex gap-[80px] relative">
        <p className="m-0 text-[28px] gap-[8px] leading-[1.3] font-semibold pointer-events-none w-1/2">
          {phrase.split(" ").map((word, index) => {
            return (
              <span
                key={index}
                className="relative overflow-hidden inline-flex"
              >
                <motion.span
                  initial="closed"
                  whileInView="open"
                  viewport={{ once: true }}
                  variants={slideUp}
                  custom={index}
                  key={index}
                  className="mr-[10px]"
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>
        <div className="w-1/2 flex flex-col items-end gap-[70px]">
          <div className="w-full flex justify-end text-right">
            <motion.p
              initial="closed"
              whileInView="open"
              viewport={{ once: true }}
              variants={opacity}
              className="text-[18px] w-full font-medium pointer-events-none w-[500px]"
            >
              Your home should tell the story of who you are, and be a
              collection of what you love.
            </motion.p>
          </div>
          <div data-scroll data-scroll-speed={0.1}>
            <Link to={"/about"}>
              <RoundedButton className="w-[180px] h-[180px] bg-[#222] text-white rounded-[50%] relative flex items-center justify-center cursor-pointer">
                <p className="m-0 text-lg font-medium relative z-[1]">
                  About us
                </p>
              </RoundedButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
