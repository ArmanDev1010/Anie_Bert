import React from "react";
import {
  Contact,
  Description,
  Navbar,
  ParallaxScroll,
  SmoothParallax,
  Team,
} from "../components";

const About = () => {
  return (
    <div className="about relative bg-white">
      <Navbar />
      <SmoothParallax />
      <Description />
      <ParallaxScroll />
      <Team />
      <Contact />
    </div>
  );
};

export default About;
