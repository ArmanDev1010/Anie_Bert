import React, { useLayoutEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Intro = () => {
  const background = useRef(null);
  const introImage = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          scrub: true,
          start: "top",
          end: "+=500px",
        },
      });

      timeline
        .from(background.current, { clipPath: `inset(15%)` })
        .to(introImage.current, { height: "200px" }, 0);
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute top-0 w-full flex justify-center">
      <div
        className="w-full h-[130vh] absolute brightness-[70%]"
        ref={background}
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/src/assets/1.jpg)",
          }}
        ></div>
      </div>
      <div className="flex justify-center reltive mt-[35vh]">
        <div
          ref={introImage}
          data-scroll
          data-scroll-speed="0.3"
          className="brightness-[90%] w-[350px] h-[475px] absolute"
        >
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url(/src/assets/2.jpg)",
            }}
          ></div>
        </div>
        <h1
          data-scroll
          data-scroll-speed="0.7"
          className="font-articulat text-white text-[6.5vw] z-[3] text-center whitespace-nowrap pointer-events-none"
        >
          The World of Anie Bert
        </h1>
      </div>
    </div>
  );
};

export default Intro;
