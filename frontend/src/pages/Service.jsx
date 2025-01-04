import React from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components";

const Service = () => {
  const { service } = useParams();

  return (
    <div className="bg-white text-black">
      <Navbar invert_colors={true} />
      <div className="w-full h-[120px] mb-[30px]"></div>
      <div className="px-[64px]">
        <div className="font-sometimestimes text-[80px] leading-[1.2] pointer-events-none">
          We design
          <HoverImage num={1} />
          interiors equipped
          <HoverImage num={2} />
          to transform any space
          <HoverImage num={3} />
          into a functional and beautiful environment.
          <HoverImage num={4} />
        </div>
      </div>
      <div className="h-screen"></div>
    </div>
  );
};

const HoverImage = ({ num }) => {
  return (
    <div className="relative inline-block mx-[40px] z-[1] w-[120px] h-[53px] hover:z-[5] pointer-events-auto">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[53px] hover:w-[280px] hover:h-[208px]"
        style={{
          transition:
            "width .4s cubic-bezier(.32,.04,.08,1), height .4s cubic-bezier(.32,.04,.08,1), border-width .4s cubic-bezier(.32,.04,.08,1)",
        }}
      >
        <img
          src={`/src/assets/swiper/${num}.jpg`}
          className="w-full h-full bg-secondary object-fit"
        />
      </div>
    </div>
  );
};

export default Service;
