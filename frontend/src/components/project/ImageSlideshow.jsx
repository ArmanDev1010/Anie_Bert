import React, { useState, useEffect, useRef } from "react";

const ImageSlideshow = ({
  name,
  main_image,
  images,
  defaultImageIndex,
  element,
}) => {
  const [activeIndex, setActiveIndex] = useState(defaultImageIndex);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const { left, width } = containerRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const normalizedX = x / width;

      // Update the slide based on cursor position
      const newIndex = Math.floor(normalizedX * (images.length + 1));
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    };

    const handleTouchMove = (e) => {
      if (!containerRef.current) return;

      const { left, width } = containerRef.current.getBoundingClientRect();
      const x = e.touches[0].clientX - left;
      const normalizedX = x / width;

      const newIndex = Math.floor(normalizedX * (images.length + 1));
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    };

    // Reset to default when mouse leaves the container
    const handleMouseLeave = () => {
      setActiveIndex(defaultImageIndex);
    };

    if (containerRef.current) {
      containerRef.current.addEventListener("mousemove", handleMouseMove);
      containerRef.current.addEventListener("touchmove", handleTouchMove);
      containerRef.current.addEventListener("mouseleave", handleMouseLeave);
    }

    // Cleanup function to remove event listeners
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener("mousemove", handleMouseMove);
        containerRef.current.removeEventListener("touchmove", handleTouchMove);
        containerRef.current.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
      }
    };
  }, [activeIndex, images, defaultImageIndex]);

  return (
    <div
      className="slideshow-container relative z-[1] w-full h-full"
      ref={containerRef}
    >
      {images.length > 0 && (
        <div
          className="absolute z-[2] bottom-[16px] left-1/2 -translate-x-1/2 flex justify-center gap-[0.5rem]
        rounded-[1rem] p-[0.375rem]"
          style={{
            backgroundColor: "hsla(0,0%,100%,.1)",
            backdropFilter: "blur(4px)",
          }}
        >
          {[main_image, ...images].map((_, index) => (
            <span
              key={index}
              className={`${
                index === activeIndex ? "!opacity-100 !scale-[2]" : null
              } h-[0.25rem] w-[0.25rem] bg-white opacity-50 rounded-full`}
              style={{
                transition:
                  "opacity .3s cubic-bezier(.24,1,.52,1), transform .3s cubic-bezier(.24,1,.52,1)",
              }}
            />
          ))}
        </div>
      )}
      {[main_image, ...images].map((image, index) => (
        <div
          key={index}
          src={image}
          alt={`Slide ${index}`}
          style={{
            backgroundImage: `url(/assets/projects/${name}/${
              index == 0 ? "main_image" : `images/${image.image}`
            }.jpg)`,
            opacity: index === activeIndex ? 1 : 0,
            transition: "opacity 0.1s ease-in-out",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          className="bg-center bg-cover bg-no-repeat"
        ></div>
      ))}
      {element}
      <div
        className="after:content-[''] after:absolute after:top-0 after:left-0 after:w-[101%] after:h-[101%]
        after:bg-[linear-gradient(0deg,rgba(0,0,0,.63)_0,rgba(0,0,0,.24))] after:z-[1]"
      ></div>
    </div>
  );
};

export default ImageSlideshow;
