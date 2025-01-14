import React from "react";

import { motion } from "framer-motion";

import { RoundedButton } from "..";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  const { t, i18n } = useTranslation();

  const phrase = t("about.component.phrase");

  return (
    <div
      className="px-[64px] mt-[100px] mb-[60px] flex justify-center 
    max-_900:mb-[36px] max-_900:mt-[64px] max-_700:px-[5%]"
    >
      <div className="max-w-[1400px] flex gap-[80px] relative max-_900:flex-col max-_550:gap-[60px] max-_400:gap-[50px]">
        <p
          className="m-0 text-[clamp(1.55em,2.3vw,2em)] gap-[8px] leading-[1.45] font-semibold pointer-events-none w-[70%]
        max-_900:w-full max-_900:text-secondary max-_550:text-[5vw] max-_400:text-[6vw]"
        >
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
        <div className="relative w-[30%] flex flex-col items-end gap-[70px] max-_900:w-full max-_900:flex-row max-_550:flex-col max-_550:gap-0">
          <div className="w-full flex max-_900:self-start">
            <motion.p
              initial="closed"
              whileInView="open"
              viewport={{ once: true }}
              variants={opacity}
              className="text-[18px] font-medium pointer-events-none max-w-[14em] max-_550:text-base"
            >
              {t("about.component.paragraph")}
            </motion.p>
          </div>
          <div data-scroll data-scroll-speed={0.1}>
            <Link to={`/${i18n.language}/about`}>
              <RoundedButton
                className="w-[180px] h-[180px] bg-[#222] text-white rounded-[50%] relative flex items-center justify-center cursor-pointer
              max-_550:w-[144px] max-_550:h-[144px]"
              >
                <p className="m-0 text-lg font-medium relative z-[1]">
                  {t("about.component.about_btn")}
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
