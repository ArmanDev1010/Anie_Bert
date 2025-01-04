import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../components";
import Lenis from "@studio-freight/lenis";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const images = [
  {
    src: "1",
    left: "5%",
    top: "60%",
    width: "25vw",
    height: "250px",
  },
  {
    src: "2",
    left: "30%",
    top: "5%",
    width: "15vw",
    height: "200px",
  },
  {
    src: "3",
    left: "40%",
    top: "70%",
    width: "30vw",
    height: "450px",
  },
  {
    src: "4",
    left: "80%",
    top: "30%",
    width: "12vw",
    height: "350px",
  },

  {
    src: "5",
    left: "90%",
    top: "150%",
    width: "12vw",
    height: "300px",
  },
  {
    src: "6",
    left: "1%",
    top: "170%",
    width: "30vw",
    height: "200px",
  },

  {
    src: "7",
    left: "80%",
    top: "200%",
    width: "12vw",
    height: "350px",
  },
  {
    src: "8",
    left: "5%",
    top: "260%",
    width: "32vw",
    height: "250px",
  },
  {
    src: "9",
    left: "10%",
    top: "210%",
    width: "12vw",
    height: "150px",
  },
];

const Services = () => {
  const scrollContainerRef = useRef(null);
  const lenisRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    lenisRef.current = new Lenis({
      wrapper: scrollContainerRef.current,
      content: scrollContainerRef.current.firstChild,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 0, // Disable mouse for Lenis
      smoothTouch: true,
      touchMultiplier: 2,
      infinite: false,
    });

    const handleMouseWheel = (event) => {
      event.preventDefault();
      const delta = event.deltaY;
      lenisRef.current.scrollTo(lenisRef.current.scroll + delta * 5, {
        // Adjust multiplier
        duration: 0.3,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    };

    scrollContainerRef.current.addEventListener("wheel", handleMouseWheel, {
      passive: false,
    });

    // New: Observer to detect which section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(parseInt(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.5 } // Adjust this value to change when the section is considered active
    );

    // New: Observe each section
    document.querySelectorAll(".snap-start").forEach((section, index) => {
      section.dataset.index = index;
      observer.observe(section);
    });

    function raf(time) {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current.destroy();
      scrollContainerRef.current?.removeEventListener(
        "wheel",
        handleMouseWheel
      );
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Navbar fixed_active={true} />
      <div
        className="relative bg-white text-black h-screen overflow-y-scroll snap-y snap-mandatory"
        ref={scrollContainerRef}
      >
        <FixedTitle activeSection={activeSection} />
        <div className="">
          {["interior", "architecture", "commercial"].map((text, key) => (
            <div
              className="h-screen snap-start relative w-full bg-white text-white"
              key={key}
            ></div>
          ))}
        </div>
        <div className="">
          {images.map((img, index) => (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `clamp(0%, ${img.left}, calc(100% - ${img.width}))`,
                top: img.top,
                width: img.width,
                height: img.height,
                backgroundImage: `url(/src/assets/about_images/${img.src}.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                zIndex: 1,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const FixedTitle = ({ activeSection }) => {
  const { t } = useTranslation();

  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    resizeText();

    window.addEventListener("resize", resizeText);

    return () => {
      window.removeEventListener("resize", resizeText);
    };
  }, [activeSection]);

  const resizeText = () => {
    const container = containerRef.current;
    const text = textRef.current;

    if (!container || !text) {
      return;
    }

    const containerWidth = container.offsetWidth;
    let min = 1;
    let max = 2500;

    while (min <= max) {
      const mid = Math.floor((min + max) / 2);
      text.style.fontSize = mid + "px";

      if (text.offsetWidth <= containerWidth) {
        min = mid + 1;
      } else {
        max = mid - 1;
      }
    }

    text.style.fontSize = max - 10 + "px";
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[2] text-[#d9d9d9] w-full text-center mix-blend-difference pointer-events-none">
      <p className="font-sometimestimes text-[3vw]">{activeSection + 1} / 3</p>
      <div
        className="flex w-full items-center overflow-hidden"
        ref={containerRef}
      >
        <motion.h1
          className="font-sometimestimes mt-[1rem] mb-[3rem] mx-auto whitespace-nowrap text-center leading-[1]"
          ref={textRef}
          key={activeSection}
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          exit={{ y: 200 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
        >
          {t(
            `services.${
              ["interior", "architecture", "commercial"][activeSection]
            }`
          )}
        </motion.h1>
      </div>
      <Link
        to={`./${["interior", "architecture", "commercial"][activeSection]}`}
      >
        <p
          className="relative text-[1.3rem] uppercase font-[600] cursor-pointer w-fit !pointer-events-auto
            inline-block pl-4 ml-[1px] text-lg cursor-pointer font-[500] hover:pl-[64px]
            before:content-[''] before:block before:absolute before:top-1/2 before:left-0 before:h-[1px] before:w-[8px] before:-translate-y-1/2 before:bg-white
            after:content-[''] after:block after:absolute after:top-1/2 after:left-[calc(100%+9px)] after:h-[1px] after:w-[56px] after:-translate-y-1/2 after:bg-white
            hover:after:w-[8px] hover:before:w-[56px] before:transition-[width_0.5s_ease] before:duration-[0.5s] after:transition-[width_0.5s_ease] after:duration-[0.5s]"
          style={{
            transition:
              "padding-left .5s ease, right .5s ease, opacity .5s ease",
          }}
        >
          Click to Explore
        </p>
      </Link>
    </div>
  );
};

export default Services;
