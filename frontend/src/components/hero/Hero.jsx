import React from "react";
import { Navbar, BottomHero, SwiperSlides } from "../index";

const Hero = () => {
  return (
    <div className="hero relative h-screen">
      <div className="relative w-full h-full border-2 px-[64px] overflow-hidden">
        <Navbar />
        <BottomHero />
        <SwiperSlides />
      </div>
    </div>
  );
};

export default Hero;
