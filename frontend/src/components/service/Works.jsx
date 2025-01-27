import React from "react";
import { motion } from "framer-motion";
import useLocaleData from "../useLocaleData";
import { Horizontal } from "../index";
import { useTranslation } from "react-i18next";

const Works = ({ service }) => {
  const { t, i18n } = useTranslation();

  const { data: currentLocaleData, error: currentLocaleError } = useLocaleData(
    i18n.language
  );
  const { data: englishLocaleData } = useLocaleData("en");

  if (currentLocaleError) return <p>Error loading data for current locale</p>;
  if (!currentLocaleData && !englishLocaleData) return <p></p>;

  const projects = [];
  const currentLocaleProjects = currentLocaleData?.projects || {};
  const englishLocaleProjects = englishLocaleData?.projects || {};

  Object.keys(englishLocaleProjects).forEach((name) => {
    const project = {
      ...englishLocaleProjects[name],
      ...(currentLocaleProjects[name] || {}),
    };
    if (project.type == service) {
      projects.push(project);
    }
  });

  Object.keys(currentLocaleProjects).forEach((name) => {
    if (
      !englishLocaleProjects[name] &&
      currentLocaleProjects[name].type == service
    ) {
      projects.push(currentLocaleProjects[name]);
    }
  });

  if (!projects.length) {
    return <p></p>;
  }

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
