import React from "react";
import {
  About,
  Contact,
  Hero,
  Masterpiece,
  Projects,
  Services,
} from "../components";

const Home = () => {
  return (
    <div className="relative bg-white text-black">
      <Hero />
      <div className="h-screen"></div>
      {/* <Masterpiece />
      <About />
      <Services />
      <Projects />
      <Contact /> */}
    </div>
  );
};

export default Home;
