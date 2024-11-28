import React from "react";
import { Navbar, BottomHero, SwiperSlides } from "../index";

import { useQuery, gql } from "@apollo/client";

const HEROES = gql`
  query GetHeros {
    heroes {
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
  const { loading, error, data } = useQuery(HEROES);

  if (loading) return <p></p>;
  if (error) return <p>error</p>;

  return (
    <div className="hero relative h-screen text-white">
      <div className="relative w-full h-full px-[64px] overflow-hidden">
        <Navbar />
        <BottomHero />
        <SwiperSlides data={data?.heroes} />
      </div>
    </div>
  );
};

export default Hero;
