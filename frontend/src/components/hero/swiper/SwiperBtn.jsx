import React from "react";
import { BsArrowRight } from "react-icons/bs";

const SwiperBtn = ({ handle, current }) => {
  return (
    <div
      className="glassy_bg group w-[5.5rem] h-[3rem] border-[2px] border-white rounded-full flex justify-center items-center 
      pointer-events-auto cursor-pointer"
      onClick={handle}
    >
      <div
        className="relative overflow-hidden text-center text-[30px]"
        style={current == "prev" ? { transform: "rotate(180deg)" } : null}
      >
        <div className="group-hover:translate-x-[110%] transition duration-300">
          <BsArrowRight />
        </div>
        <div className="-translate-x-[110%] group-hover:translate-x-[0%] transition duration-300 absolute top-0 bottom-0 left-0 right-0">
          <BsArrowRight />
        </div>
      </div>
    </div>
  );
};

export default SwiperBtn;
