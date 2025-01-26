import React, { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

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

const Description = () => {
  const { t } = useTranslation();

  const phrases = ["", "", "", "", ""].map((text, key) => {
    return t(`about.page.descriptions.${key + 1}`);
  });

  const phrase = t("about.page.description");

  return (
    <>
      <div className="relative text-black text-[2.7vw] font-articulat uppercase my-[50px] ml-[5vw] max-_1080:hidden">
        {phrases.map((phrase, index) => {
          return <Phrase key={index}>{phrase}</Phrase>;
        })}
      </div>
      <div className="_1080:hidden px-[5%] my-[50px] max-_550:my-[40px] max-_550:mb-[50px]">
        <p
          className="m-0 text-secondary text-[clamp(1.55em,4vw,2em)] gap-[8px] leading-[1.45] w-full font-semibold pointer-events-none
        max-_550:text-[5vw] max-_400:text-[5.5vw]"
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
      </div>
    </>
  );
};

const Phrase = ({ children }) => {
  const text = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(text.current, {
        scrollTrigger: {
          trigger: text.current,
          scrub: true,
          start: "0px bottom",
          end: "bottom+=200px bottom",
        },
        opacity: 0,
        left: "-200px",
        ease: "power3.Out",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <p ref={text} className="m-0 relative pointer-events-none">
      {children}
    </p>
  );
};

export default Description;
