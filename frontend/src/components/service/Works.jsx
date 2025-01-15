import React from "react";
import { motion } from "framer-motion";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { ImageSlideshow } from "../index";
import { useTranslation } from "react-i18next";

const PROJECTS = gql`
  query GetProjects($service: String!) {
    heroes(filters: { type: { eq: $service } }) {
      project_address
      documentId
      image {
        url
      }
      type
      year
      area
      images {
        image {
          url
        }
      }
    }
  }
`;

const Works = ({ service }) => {
  const { t, i18n } = useTranslation();

  const { loading, error, data } = useQuery(PROJECTS, {
    variables: { service: service.toLowerCase() },
  });

  if (loading) return <p></p>;
  if (error) return <p>error</p>;

  const projects = data.heroes;

  const renderInfo = (type, text, t) => {
    const value = {
      type: text.type ? t(`projects.page.types.${text.type}`) : null,
      year: text.year,
      area: text.area,
    }[type];
    if (value !== null) {
      return (
        <div
          key={type}
          className="rounded-[4px] text-white p-[0.4rem_0.5rem_0.3rem] uppercase"
          style={{
            backgroundColor: "hsla(0,0%,100%,.1)",
            backdropFilter: "blur(4px)",
          }}
        >
          {value}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="">
      <div className="w-full h-[1px] bg-[#1e1e1e]/20 mb-10"></div>
      <div className="relative px-[64px] mb-[50px] max-_900:px-[5%] max-_550:mb-[20px]">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            ease: "easeIn",
            y: { duration: 0.5, delay: 0.5 },
            opacity: { delay: 0.5 },
          }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 60 },
          }}
          className="font-articulat mb-10 pointer-events-none text-secondary uppercase text-7xl leading-[1.1] pointer-events-none
            max-_900:text-6xl max-_700:text-5xl max-_700:mb-8 max-_400:text-[12vw]"
        >
          {t("services.page.works")}
        </motion.p>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            ease: "easeIn",
            y: { duration: 0.5, delay: 0.7 },
            opacity: { delay: 0.7 },
          }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 60 },
          }}
          className="grid grid-cols-2 gap-[3.25rem_1rem] max-_700:grid-cols-1 max-_700:gap-y-[2rem] max-_400:gap-y-[1.5rem]"
        >
          {projects.map((text, key) => (
            <Link to={`/${i18n.language}/project/${text.documentId}`} key={key}>
              <li className="relative w-full overflow-hidden">
                <div className="absolute z-[3] flex gap-[1rem] top-[1rem] left-[1rem] text-sm font-[600] max-_550:text-xs">
                  {["type", "year", "area"].map((type) =>
                    renderInfo(type, text, t)
                  )}
                </div>
                <div className="relative bg-gray-500 w-full h-[576px] mb-[0.7rem] max-_1080:h-[401px] max-_550:h-[301px] max-_400:h-[201px] max-_400:mb-[0.4rem]">
                  <ImageSlideshow
                    main_image={text}
                    images={text.images.slice(0, 5)}
                    defaultImageIndex={0}
                  />
                </div>
                <p className="font-articulat text-[3.5vw] font-[500] text-secondary tracking-[1px] max-_700:text-4xl max-_550:text-[7vw]">
                  {text.project_address}
                </p>
              </li>
            </Link>
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default Works;
