import React from "react";
import { ContactInfo, Navbar, SwiperSlides } from "../index";
import { useTranslation } from "react-i18next";
import useLocaleData from "../useLocaleData";

const Hero = () => {
  const { i18n } = useTranslation();

  const { data: currentLocaleData, error: currentLocaleError } = useLocaleData(
    i18n.language
  );
  const { data: englishLocaleData } = useLocaleData("en");

  if (currentLocaleError) return <p>Error loading data for current locale</p>;
  if (!currentLocaleData && !englishLocaleData) return <p></p>;

  const heroes = [];
  const currentLocaleProjects = currentLocaleData?.projects || {};
  const englishLocaleProjects = englishLocaleData?.projects || {};

  Object.keys(englishLocaleProjects).forEach((name) => {
    const project = {
      ...englishLocaleProjects[name],
      ...(currentLocaleProjects[name] || {}),
    };
    if (project.is_hero) {
      heroes.push(project);
    }
  });

  Object.keys(currentLocaleProjects).forEach((name) => {
    if (!englishLocaleProjects[name] && currentLocaleProjects[name]) {
      heroes.push(currentLocaleProjects[name]);
    }
  });

  heroes.sort((a, b) => a.hero_order - b.hero_order);

  if (!heroes.length) {
    return <p>No data available for this service.</p>;
  }

  return (
    <div className="hero relative h-screen text-white">
      <div className="relative w-full h-full px-[64px] overflow-hidden">
        <Navbar />
        <SwiperSlides data={heroes} />
        <ContactInfo hero={true} />
      </div>
    </div>
  );
};

export default Hero;
