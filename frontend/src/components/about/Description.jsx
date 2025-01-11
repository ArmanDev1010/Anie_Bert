import React, { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

const Description = () => {
  const { t } = useTranslation();

  const phrases = ["", "", "", "", ""].map((text, key) => {
    return t(`about.page.description.${key + 1}`);
  });

  return (
    <div className="relative text-black text-[2.7vw] font-articulat uppercase my-[50px] ml-[5vw]">
      {phrases.map((phrase, index) => {
        return <Phrase key={index}>{phrase}</Phrase>;
      })}
    </div>
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
          start: "400px bottom",
          end: "bottom+=400px bottom",
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
