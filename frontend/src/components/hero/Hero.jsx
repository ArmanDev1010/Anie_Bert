import React from "react";
import { Navbar, BottomHero, SwiperSlides } from "../index";

const Hero = () => {
  return (
    <div className="hero relative h-screen p-[34px]">
      <div className="relative w-full h-full border-2 rounded-[30px] px-[64px] overflow-hidden">
        <Navbar />
        <BottomHero />
        <SwiperSlides />
      </div>
    </div>
  );
};

export default Hero;
