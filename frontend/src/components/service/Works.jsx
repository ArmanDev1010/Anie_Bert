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

  const cleanText = (e) => {
    return e.replace(/_/g, " ");
  };

  return (
    <div className="">
      <div className="w-full h-[1px] bg-[#1e1e1e]/20 mb-10"></div>
      <div className="relative px-[64px] mb-[50px]">
        <div className="flex justify-between items-end mb-10">
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
            className="pointer-events-none font-articulat text-secondary uppercase text-[max(3vw,4.5vw)] leading-[1.1] pointer-events-none"
          >
            {t("services.page.works")}
          </motion.p>
          <p className="text-xl italic pointer-events-none">
            ({projects.length}) {t("services.page.projects")}
          </p>
        </div>

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
          className="grid grid-cols-2 gap-[3.25rem_1rem]"
        >
          {projects.map((text, key) => (
            <Link to={`/project/${text.documentId}`} key={key}>
              <li className="w-full">
                <div className="relative bg-gray-500 w-full h-[576px] mb-[0.7rem]">
                  <ImageSlideshow
                    main_image={text}
                    images={text.images.slice(0, 5)}
                    defaultImageIndex={0}
                  />
                </div>
                <p className="font-articulat text-[3.5vw] font-[500] text-secondary tracking-[1px]">
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
