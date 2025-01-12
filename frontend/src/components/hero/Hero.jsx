import React from "react";
import { Navbar, BottomHero, SwiperSlides } from "../index";

import { useQuery, gql } from "@apollo/client";
import { useTranslation } from "react-i18next";

const HEROES = gql`
  query GetHeroes($locale: I18NLocaleCode) {
    heroes(
      filters: { is_hero: { eq: true } }
      sort: "hero_order"
      locale: $locale
    ) {
      project_address
      type
      documentId
      image {
        url
      }
    }
    fallback: heroes(
      filters: { is_hero: { eq: true } }
      sort: "hero_order"
      locale: "en"
    ) {
      project_address
      type
      documentId
      image {
        url
      }
    }
  }
`;

const Hero = () => {
  const { i18n } = useTranslation();

  const { loading, error, data } = useQuery(HEROES, {
    variables: {
      locale: i18n.language === "am" ? "hy" : i18n.language,
    },
  });

  if (loading) return <p></p>;
  if (error) return <p>error</p>;

  const heroes = [...(data.heroes || []), ...(data.fallback || [])].reduce(
    (acc, current) => {
      if (!acc.find((hero) => hero.documentId === current.documentId)) {
        acc.push(current);
      }
      return acc;
    },
    []
  );

  if (!heroes.length) {
    return <p>No data available for this service.</p>;
  }

  return (
    <div className="hero relative h-screen text-white">
      <div className="relative w-full h-full px-[64px] overflow-hidden">
        <Navbar />
        <BottomHero />
        <SwiperSlides data={heroes} />
      </div>
    </div>
  );
};

export default Hero;
