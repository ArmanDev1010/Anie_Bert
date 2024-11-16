import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay } from "swiper/modules";

const SwiperHero = () => {
  return (
    <div>
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={800}
        modules={[Autoplay]}
        className="absolute top-0 z-[0] left-0 w-full h-full"
      >
        {["1", "2", "3", "4"].map((text, key) => (
          <SwiperSlide
            key={key}
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8),rgba(0, 0, 0, 0)),url(/src/assets/swiper/${text}.jpg)`,
            }}
          ></SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwiperHero;
