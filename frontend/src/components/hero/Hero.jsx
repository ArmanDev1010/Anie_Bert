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

  // Add projects from the current locale first
  if (currentLocaleData?.projects) {
    heroes.push(
      ...Object.values(currentLocaleData.projects)
        .filter((project) => project.is_hero)
        .map((project) => ({
          ...project,
          image: { url: project.image },
        }))
    );
  }

  // Then add English projects not already in the heroes array
  if (englishLocaleData?.projects) {
    Object.values(englishLocaleData.projects)
      .filter(
        (project) =>
          project.is_hero && !heroes.some((h) => h.name === project.name)
      ) // Check for uniqueness by name
      .forEach((project) => {
        heroes.push({
          ...project,
          image: { url: project.image },
        });
      });
  }

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
