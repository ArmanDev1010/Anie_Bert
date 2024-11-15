import React, { useCallback, useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Autoplay, Navigation, Thumbs, FreeMode } from "swiper/modules";

import { SwiperBtn } from "../../";

const SwiperHero = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
        freeMode={true}
        watchSlidesProgress={true}
        speed={700}
        modules={[Navigation, Thumbs]}
        className="absolute top-1/2 right-24 -translate-y-1/2 w-[700px] h-[500px] z-[1]"
      >
        {["1", "2", "3", "4"].map((text, key) => (
          <SwiperSlide
            key={key}
            className="w-full bg-gray-700 cursor-pointer bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(/src/assets/swiper/${text}.jpg)` }}
          ></SwiperSlide>
        ))}
      </Swiper>
      <div className="relative w-[700px] -left-[300px]">
        <Swiper
          slidesPerView={"3"}
          spaceBetween={30}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          speed={1000}
          ref={sliderRef}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[Autoplay, FreeMode, Thumbs]}
          className="relative pt-4"
        >
          {["1", "2", "3", "4"].map((text, key) => (
            <SwiperSlide
              key={key}
              className="h-[200px] bg-gray-700 cursor-pointer transition-translate duration-300 ease hover:-translate-y-4"
            >
              <img
                src={`/src/assets/swiper/${text}.jpg`}
                className="gray_filter w-full h-full object-cover"
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div
          className="w-[115%] absolute z-[1] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none  
      flex justify-between"
        >
          <SwiperBtn handle={handlePrev} current="prev" />
          <SwiperBtn handle={handleNext} current="next" />
        </div>
      </div>
    </div>
  );
};

export default SwiperHero;
