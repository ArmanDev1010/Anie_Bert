import React, { useRef } from "react";
import { Contact, Description, Intro, Navbar } from "../components";
import { useScroll, useTransform, motion } from "framer-motion";

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
    <div className="relative bg-white text-black">
      <Intro />
      <Description />
      <div className="h-screen"></div>
    </div>
  );
};

export default About;
