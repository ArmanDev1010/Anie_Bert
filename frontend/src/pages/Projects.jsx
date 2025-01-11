import React, { useEffect, useState } from "react";
import { Navbar, Contact, ImageSlideshow } from "../components";
import { motion } from "framer-motion";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PROJECTS = gql`
  query GetProjects {
    heroes {
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

const Projects = () => {
  const { loading, error, data } = useQuery(PROJECTS);

  if (loading) return <p></p>;
  if (error) return <p>error</p>;

  return (
    <div className="relative bg-white text-black">
      <Navbar invert_colors={true} />
      <div className="w-full h-[120px] mb-[30px]"></div>
      <ProjectsSection projects={data.heroes} />
      <Contact />
    </div>
  );
};

const ProjectsSection = ({ projects }) => {
  const { t, i18n } = useTranslation();

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
  }, [selectedFilters]);

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
    <div className="relative projects mb-[70px]">
      <div className="pt-[20px] pb-10 px-[64px] border-b border-secondary mb-10">
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
          className="pointer-events-none font-articulat text-secondary uppercase text-[max(3vw,5.5vw)] leading-[1.1] 
        pointer-events-none mb-[50px] max-desktopM:text-[max(3vw,5.2vw)]"
        >
          {t("projects.page.title")}
        </motion.p>
        <div className="flex items-center justify-between">
          <div className="flex gap-5">
            {["all", ...filters].map((text, key) => (
              <button
                onClick={() => handleFilterButtonClick(text)}
                key={key}
                className={`group border border-gray-500 text-lg py-2 px-5 rounded-[10px] capitalize transition duration-[0.2s] hover:opacity-70 ${
                  selectedFilters?.includes(text) ? "bg-thirdly text-white" : ""
                }`}
              >
                {t(`projects.page.types.${text}`)}
              </button>
            ))}
          </div>
          <p className="text-xl italic pointer-events-none">
            ({filteredItems.length}) {t("projects.page.title")}
          </p>
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
        className="grid grid-cols-2 gap-[3.25rem_1rem] px-[64px]"
      >
        {filteredItems.map((text, key) => (
          <Link to={`/${i18n.language}/project/${text.documentId}`} key={key}>
            <li className="w-full">
              <div className="relative bg-gray-500 w-full h-[576px] mb-[0.7rem]">
                <ImageSlideshow
                  main_image={text}
                  images={text.images.slice(0, 5)}
                  defaultImageIndex={0}
                  element={
                    <>
                      <div className="tb_gradient"></div>
                      <div className="absolute flex gap-[1rem] top-[1rem] left-[1rem] text-sm font-[600]">
                        {["type", "year"].map((type, key) =>
                          (type == "year" && text.year !== null) ||
                          (type == "type" && text.type !== null) ? (
                            <div
                              className="rounded-[4px] text-white p-[0.4rem_0.5rem_0.3rem] uppercase"
                              style={{
                                backgroundColor: "hsla(0,0%,100%,.1)",
                                backdropFilter: "blur(4px)",
                              }}
                              key={key}
                            >
                              {type == "type"
                                ? t(`projects.page.types.${text.type}`)
                                : text.year}
                            </div>
                          ) : null
                        )}
                      </div>
                    </>
                  }
                />
              </div>
              <p className="font-articulat text-[3.5rem] font-[500] text-secondary tracking-[1px]">
                {text.project_address}
              </p>
            </li>
          </Link>
        ))}
      </motion.ul>
    </div>
  );
};

export default Projects;
