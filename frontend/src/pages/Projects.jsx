import React from "react";
import { Navbar, Contact } from "../components";
import { useSpring, motion } from "framer-motion";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const PROJECTS = gql`
  query GetProjects {
    heroes {
      project_address
      documentId
      image {
        url
      }
    }
  }
`;

const Projects = () => {
  const { loading, error, data } = useQuery(PROJECTS);

  if (loading) return <p></p>;
  if (error) return <p>error</p>;

  return (
    <div className="relative bg-white text-black">
      <Navbar invert_colors={true} />
      <div className="w-full h-[120px] mb-[30px]"></div>
      <ScrollImages data={data.heroes} />
      <Contact />
    </div>
  );
};

const ScrollImages = ({ data }) => {
  const spring = {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  };

  const mousePosition = {
    x: useSpring(0, spring),
    y: useSpring(0, spring),
  };

  const mouseMove = (e) => {
    const { clientX, clientY } = e;
    const targetX = clientX - (window.innerWidth / 2) * 0.25;
    const targetY = clientY - (window.innerWidth / 2) * 0.3;
    mousePosition.x.set(targetX);
    mousePosition.y.set(targetY);
  };

  return (
    <div onMouseMove={mouseMove} className="">
      {data.map((text, key) => {
        return (
          <Link key={key} to={`../project/${text.documentId}`}>
            <Gallery mousePosition={mousePosition} text={text} />
          </Link>
        );
      })}
    </div>
  );
};

const Gallery = ({ mousePosition, text }) => {
  const { x, y } = mousePosition;

  return (
    <div className="relative group [clip-path:polygon(0_0,0_100%,100%_100%,_100%_0)]">
      <div className="w-full h-full relative flex flex-col">
        <div
          className="w-full h-[700px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(http://localhost:1337/${text.image.url})`,
          }}
        />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] text-7xl text-black overflow-hidden">
        <div className="group-hover:translate-y-[-110%] transition duration-500">
          {text.project_address}
        </div>
        <div className="translate-y-[110%] group-hover:translate-y-[0%] transition duration-500 absolute top-0 bottom-0 left-0 right-0">
          {text.project_address}
        </div>
      </div>
      <motion.div
        className="h-[30vw] w-[25vw] fixed top-0 rounded-[1.5vw] overflow-hidden"
        style={{ x, y }}
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(http://localhost:1337/${text.image.url})`,
          }}
        ></div>
      </motion.div>
    </div>
  );
};

export default Projects;
