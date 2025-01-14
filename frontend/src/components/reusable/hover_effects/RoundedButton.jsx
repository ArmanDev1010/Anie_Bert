import React, { useEffect, useRef } from "react";

import gsap from "gsap";
import Magnetic from "./Magnetic";

const RoundedButton = ({ children, ...attributes }) => {
  const circle = useRef(null);
  let timeline = useRef(null);
  let timeoutId = null;
  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(
        circle.current,
        { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" },
        "enter"
      )
      .to(
        circle.current,
        { top: "-150%", width: "125%", duration: 0.25 },
        "exit"
      );
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeline.current.tweenFromTo("enter", "exit");
  };

  const manageMouseLeave = () => {
    timeoutId = setTimeout(() => {
      timeline.current.play();
    }, 300);
  };

  return (
    <Magnetic>
      <div
        className="rounded-[3em] border-[1px_solid_rgb(136,136,136)] cursor-pointer relative flex items-center justify-center py-[15px] px-[60px]"
        style={{ overflow: "hidden" }}
        onMouseEnter={() => {
          manageMouseEnter();
        }}
        onMouseLeave={() => {
          manageMouseLeave();
        }}
        {...attributes}
      >
        {children}
        <div
          ref={circle}
          className="bg-[#36454f] w-full h-[150%] absolute rounded-[50%] top-[100%]"
        ></div>
      </div>
    </Magnetic>
  );
};

export default RoundedButton;
