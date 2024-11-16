import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

const ThumbsGallery = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        speed={900}
        loop={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[Autoplay, FreeMode, Thumbs]}
        className="absolute z-[1] top-0 left-0 w-full h-[80%]"
      >
        {["1", "2", "3", "4"].map((text, key) => (
          <SwiperSlide
            key={key}
            className="w-full h-full bg-center bg-no-repeat bg-cover"
            style={{
              backgroundImage: `
            linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(/src/assets/swiper/${text}.jpg)`,
            }}
          ></SwiperSlide>
        ))}
      </Swiper>
      <div className="w-full h-[80%]"></div>
      <div className="relative z-[2] !w-full !h-[20%]">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={0}
          slidesPerView={3}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Navigation, Thumbs]}
          className="mySwiper w-full h-full bg-black cursor-pointer"
        >
          {["1", "2", "3", "4"].map((text, key) => (
            <SwiperSlide key={key}>
              <div
                className="bg-center bg-no-repeat bg-cover w-full h-full absolute top-0 left-0"
                style={{
                  backgroundImage: `url(/src/assets/swiper/${text}.jpg)`,
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ThumbsGallery;
