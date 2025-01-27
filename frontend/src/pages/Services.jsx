import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "../components";
import Lenis from "@studio-freight/lenis";
import { Link } from "react-router-dom";

import useLocaleData from "../components/useLocaleData";

import { useTranslation } from "react-i18next";

const Services = () => {
  const { i18n } = useTranslation();

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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(parseInt(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.5 }
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
  });

  const { data: currentLocaleData, error: currentLocaleError } = useLocaleData(
    i18n.language
  );
  const { data: englishLocaleData } = useLocaleData("en");

  if (currentLocaleError) return <p>Error loading data for current locale</p>;
  if (!currentLocaleData && !englishLocaleData) return <p></p>;

  const services = [];
  const currentLocaleServices = currentLocaleData?.services || {};
  const englishLocaleServices = englishLocaleData?.services || {};

  Object.keys(englishLocaleServices).forEach((service_) => {
    const service = {
      ...englishLocaleServices[service_],
      ...(currentLocaleServices[service_] || {}),
    };
    services.push(service);
  });

  Object.keys(currentLocaleServices).forEach((service) => {
    if (!englishLocaleServices[service] && currentLocaleServices[service]) {
      services.push(currentLocaleServices[service]);
    }
  });

  services.sort((a, b) => a.order - b.order);

  if (!services.length) {
    return <p>No data available for this service.</p>;
  }

  return (
    <>
      <Navbar fixed_active={true} />
      <div
        className="relative bg-white text-black h-screen overflow-y-scroll snap-y snap-mandatory"
        ref={scrollContainerRef}
      >
        <FixedTitle services={services} activeSection={activeSection} />
        <div className="">
          {services.map((text, key) => (
            <div
              className="h-screen snap-start relative w-full bg-white text-white"
              key={key}
            >
              <div
                className="absolute top-0 left-0 bg-secondary w-full h-full z-[1] bg-cover bg-center bg-no-repeat overflow-hidden
                after:content-[''] after:absolute after:top-0 after:left-0 after:w-[101%] after:h-[101%]
        after:bg-[linear-gradient(0deg,rgba(0,0,0,.63)_0,rgba(0,0,0,.24))] after:z-[-1]"
                style={{
                  backgroundImage: `url(/assets/services/${text.service}/main.jpg)`,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const FixedTitle = ({ services, activeSection }) => {
  const { t, i18n } = useTranslation();

  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      resizeText();

      window.addEventListener("resize", resizeText);

      return () => {
        window.removeEventListener("resize", resizeText);
      };
    }, 10);
  }, [activeSection, i18n.language]);

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

    text.style.fontSize = max - (window.innerWidth > 700 ? 15 : 5) + "px";
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[2] text-white w-full text-center pointer-events-none">
      <p className="font-sometimestimes text-[3vw] max-_700:text-[4vw] max-_550:text-[5vw]">
        {activeSection + 1} / {services.length}
      </p>
      <div
        className="flex w-full items-center overflow-hidden"
        ref={containerRef}
      >
        <motion.h1
          className="!font-montserrat font-[600] mt-[1rem] mb-[3rem] mx-auto whitespace-nowrap text-center leading-[1] 
          max-_700:mb-[2rem] max-_550:mb-[1rem] max-_550:mt-[10px]"
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
          {t(`services.page.types.${services[activeSection].service}`)}
        </motion.h1>
      </div>
      <Link to={`./${services[activeSection].service}`}>
        <p
          className="relative text-[1.4rem] uppercase font-[600] cursor-pointer w-fit !pointer-events-auto
            inline-block pl-0 ml-[1px] text-lg cursor-pointer font-[500] hover:pl-[64px]
            max-_700:text-base max-_550:text-[14px]
            before:content-[''] before:block before:absolute before:top-1/2 before:left-0 before:h-[1px] before:w-[8px] before:-translate-y-1/2 before:bg-white before:-left-4
            after:content-[''] after:block after:absolute after:top-1/2 after:left-[calc(100%+9px)] after:h-[1px] after:w-[56px] after:-translate-y-1/2 after:bg-white
            hover:after:w-[8px] hover:before:w-[56px] before:transition-[width_0.5s_ease] before:duration-[0.5s] after:transition-[width_0.5s_ease] after:duration-[0.5s]"
          style={{
            transition:
              "padding-left .5s ease, right .5s ease, opacity .5s ease",
          }}
        >
          {t("services.page.explore_btn")}
        </p>
      </Link>
    </div>
  );
};

export default Services;
