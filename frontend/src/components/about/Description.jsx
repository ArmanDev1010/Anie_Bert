import React, { useLayoutEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

const phrases = [
  "Anie Bert is an architecture and interior",
  "design studio founded by Anie Bert in 2021",
  "Completing 15+ residential and commercial projects",
  "The studio focuses on creating functional",
  "aesthetically pleasing spaces.",
];

const Description = () => {
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
          start: "0px bottom",
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
