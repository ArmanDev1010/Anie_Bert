import React from "react";
import {
  About,
  Contact,
  CursorFollow,
  Hero,
  Masterpiece,
  Projects,
  Services,
} from "../components";

const Home = () => {

  return (
    <div className="relative bg-white text-black">
      <CursorFollow />
      <Hero />
      <Masterpiece />
      <About />
      <Services />
      <Projects />
      <Contact />
    </div>
  );
};

export default Home;
