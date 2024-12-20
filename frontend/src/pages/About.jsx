import React, { useRef } from "react";
import { Contact, Navbar } from "../components";
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
      <Navbar invert_colors={true} />
      <div className="w-full h-[120px] mb-[30px]"></div>
      <ZoomParallax
        other_images={data?.scrolls[1].images}
        main_image={data?.scrolls[1].main_image.url}
      />
      <Contact />
    </div>
  );
};

const ZoomParallax = ({ other_images, main_image }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: main_image,
      scale: scale4,
    },
    {
      src: other_images[1].url,
      scale: scale5,
    },
    {
      src: other_images[2].url,
      scale: scale6,
    },
    {
      src: other_images[3].url,
      scale: scale5,
    },
    {
      src: other_images[4].url,
      scale: scale6,
    },
    {
      src: other_images[0].url,
      scale: scale8,
    },
    {
      src: other_images[5].url,
      scale: scale9,
    },
  ];

  return (
    <div ref={container} className="zoom__parallax h-[300vh] relative">
      <div className="sticky overflow-hidden top-0 h-screen">
        {pictures.map(({ src, scale }, index) => {
          return (
            <motion.div
              key={index}
              style={{ scale }}
              className="el w-full h-full top-0 absolute flex items-center justify-center"
            >
              <div
                className="imageContainer relative w-[25vw] h-[25vh] bg-blue-500 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(http://localhost:1337/${src})` }}
              ></div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default About;
