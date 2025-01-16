import React, { useEffect, useState } from "react";
import { Navbar, Contact, ImageSlideshow, Horizontal } from "../components";
import { motion } from "framer-motion";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PROJECTS = gql`
  query GetProjects($locale: I18NLocaleCode) {
    heroes(locale: $locale) {
      documentId
      project_address
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
    fallback: heroes(locale: "en") {
      documentId
      project_address
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

const Projects = () => {
  const { i18n } = useTranslation();

  const { loading, error, data } = useQuery(PROJECTS, {
    variables: {
      locale: i18n.language === "am" ? "hy" : i18n.language,
    },
  });

  if (loading) return <p></p>;
  if (error) return <p>error</p>;

  const projects = [...(data.heroes || []), ...(data.fallback || [])].reduce(
    (acc, current) => {
      if (!acc.find((hero) => hero.documentId === current.documentId)) {
        acc.push(current);
      }
      return acc;
    },
    []
  );

  if (!projects.length) {
    return <p>No data available for this service.</p>;
  }

  return (
    <div className="relative bg-white text-black">
      <Navbar invert_colors={true} />
      <div className="w-full h-[120px] mb-[30px]"></div>
      <ProjectsSection projects={projects} />
      <Contact />
    </div>
  );
};

const ProjectsSection = ({ projects }) => {
  const { t } = useTranslation();

  const [selectedFilters, setSelectedFilters] = useState(["all"]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState(projects);

  useEffect(() => {
    const filtered_arr = projects.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.type === value.type)
    );
    setItems(filtered_arr.map((a) => a.type));
  }, []);

  let filters = items;

  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      setSelectedFilters(["all"]);
    } else {
      setSelectedFilters([selectedCategory]);
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters, projects]);

  const filterItems = () => {
    if (selectedFilters.length > 0 && selectedFilters[0] !== "all") {
      let tempItems = selectedFilters.map((selectedCategory) => {
        let temp = projects.filter(
          (images) => images.type === selectedCategory
        );
        return temp;
      });
      setFilteredItems(tempItems.flat());
    } else {
      setFilteredItems([...projects]);
    }
  };

  return (
    <div className="relative projects mb-[70px] max-_700:mb-[50px] max-_550:mb-[20px]">
      <div
        className="relative pt-[20px] pb-10 px-[64px] border-b border-secondary mb-10 
      max-_1080:px-[5%] max-_550:pt-[5px] max-_550:pb-8"
      >
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
          className="font-articulat text-secondary uppercase text-[max(3vw,5vw)] mb-[40px] leading-[1.1] pointer-events-none
          max-_1440:text-7xl max-_1440:mb-[30px] max-_550:text-[14vw]"
        >
          {t("projects.page.title")}
        </motion.p>
        <div className="flex items-center justify-between">
          <div className="flex gap-5 flex-wrap max-_550:gap-3">
            {["all", ...filters].map((text, key) => (
              <button
                onClick={() => handleFilterButtonClick(text)}
                key={key}
                className={`group border border-gray-500 text-lg py-2 px-5 rounded-[10px] capitalize transition duration-[0.2s] hover:opacity-70
                  max-_700:text-base max-_550:text-[15px] ${
                    selectedFilters?.includes(text)
                      ? "bg-thirdly text-white"
                      : ""
                  }`}
              >
                {t(`projects.page.types.${text}`)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <motion.ul
        key={selectedFilters}
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
        {filteredItems.map((text, key) => (
          <Horizontal text={text} key={key} />
        ))}
      </motion.ul>
    </div>
  );
};

export default Projects;
