import React from "react";
import {
  Contact,
  Description,
  Intro,
  Navbar,
  Team,
  ZoomParallax,
} from "../components";

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

const About = () => {
  const { loading, error, data } = useQuery(SCROLL);

  if (loading) return <p></p>;
  if (error) return <p>error</p>;

  return (
    <div className="about relative bg-white text-black">
      <Navbar invert_colors={true} />
      <Intro />
      <div className="h-[130vh]"></div>
      <Description />
      <Team />
      <Contact />
    </div>
  );
};

export default About;
