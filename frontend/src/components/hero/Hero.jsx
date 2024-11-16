import React from "react";
import { Navbar, BottomHero } from "../index";

const Hero = () => {
  return (
    <div className="hero relative px-[64px]">
      <div className="relative z-[1]">
        <Navbar />
        <BottomHero />
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat opacity-20"
        style={{ backgroundImage: "url(/src/assets/bg_cover_horizon.png)" }}
      ></div>
      {/* <div className="z-[2] pointer-events-none bg-[linear-gradient(#03060400,#000000_67%)] h-[10vh] absolute inset-[auto_0%_0%]"></div> */}
    </div>
  );
};

export default Hero;
