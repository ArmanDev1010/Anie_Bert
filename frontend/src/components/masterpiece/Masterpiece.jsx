import React, { useEffect, useState } from "react";

import { CenterImage, ParallaxImages } from "../index";

const SECTION_HEIGHT = 1700;

import { useQuery, gql } from "@apollo/client";

const SCROLL = gql`
  query GetHeros {
    scrolls {
      main_image {
        url
      }
      images {
        url
      }
    }
  }
`;

const Masterpiece = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setIsDesktop(window.innerWidth));
  }, [window.innerWidth]);

  const calculateHeight = () => {
    if (isDesktop > 1000) return "100vh";
    return "85vh";
  };

  const { loading, error, data } = useQuery(SCROLL);

  if (loading) return <p></p>;
  if (error) return <p>error</p>;

  return (
    <div className="relative bg-thirdly text-white max-_900:hidden">
      <div
        style={{
          height: `calc(${SECTION_HEIGHT}px + ${calculateHeight()})`,
        }}
        className="relative w-full"
      >
        <CenterImage
          SECTION_HEIGHT={SECTION_HEIGHT}
          data={data?.scrolls[0].main_image.url}
        />

        <ParallaxImages data={data?.scrolls[0].images} />

        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-thirdly/0 to-secondary" />
      </div>
    </div>
  );
};

export default Masterpiece;
