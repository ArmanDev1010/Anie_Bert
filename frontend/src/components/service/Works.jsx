import React from "react";
import { motion } from "framer-motion";
import { useQuery, gql } from "@apollo/client";
import { Horizontal } from "../index";
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
  const { t } = useTranslation();

  const { loading, error, data } = useQuery(PROJECTS, {
    variables: { service: service.toLowerCase() },
  });

  if (loading) return <p></p>;
  if (error) return <p>error</p>;

  const projects = data.heroes;

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
          className="horizontal"
        >
          {projects.map((text, key) => (
            <Horizontal text={text} key={key} />
          ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default Works;
