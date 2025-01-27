import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useLocaleData from "../components/useLocaleData";

import { Contact, Navbar } from "../components";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { IoLocationSharp } from "react-icons/io5";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TfiRulerAlt2 } from "react-icons/tfi";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ease: "linear", delayChildren: 1.2, staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.35 } },
};

const Project = () => {
  const { i18n } = useTranslation();

  const { name } = useParams();

  const { data: currentLocaleData, error: currentLocaleError } = useLocaleData(
    i18n.language
  );
  const { data: englishLocaleData } = useLocaleData("en");

  if (currentLocaleError) return <p>Error loading data for current locale</p>;
  if (!currentLocaleData && !englishLocaleData) return <p></p>;

  let project = {
    ...(englishLocaleData?.projects || {})[name],
    ...(currentLocaleData?.projects || {})[name],
  };

  if (!project) {
    return <p>No data available for this project.</p>;
  }

  return (
    <div className="relative bg-white text-black">
      <Navbar />
      <TopSection name={name} data={project} />
      <Images
        name={name}
        data={project}
        images={
          project?.images?.length > 0
            ? project.images
            : englishLocaleData?.projects[name]?.images || []
        }
      />
      <div
        className="absolute top-0 left-0 w-full h-screen bg-cover bg-no-repeat opacity-10"
        style={{ backgroundImage: "url(/src/assets/line-grid.png)" }}
      ></div>
      <Contact />
    </div>
  );
};

const TopSection = ({ name, data }) => {
  const renderInfo = (type, text) => {
    const IconComponent = {
      location: IoLocationSharp,
      year: FaRegCalendarAlt,
      area: TfiRulerAlt2,
    }[type];

    const value = {
      location: text.location,
      year: text.year,
      area: text.area,
    }[type];

    if (value !== undefined) {
      return (
        <motion.li
          key={type}
          variants={item}
          className="flex items-center gap-[13px] text-white _700:uppercase max-_700:text-[14px]"
        >
          <IconComponent className="text-[17px] opacity-70 max-_700:text-base" />
          {value}
        </motion.li>
      );
    }
    return null;
  };

  return (
    <div
      className="relative z-[0] w-full mb-10 bg-secondary text-white bg-cover bg-center bg-no-repeat
      max-_700:h-screen max-_700:min-h-[524px] max-_700:p-[107px_0_42px_0] max-_700:flex max-_700:justify-end
      before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[linear-gradient(180deg,rgba(0,0,0,.34)_0,rgba(0,0,0,.6))] before:z-[-1]"
      style={{
        backgroundImage: `url(/assets/projects/${name}/main_image.jpg)`,
      }}
    >
      <div
        className="flex [flex-flow:row_wrap] min-h-screen relative pt-[206px] pb-[40px] pl-[40px] 
      max-_900:pt-[249px] max-_900:pb-[50px] max-_700:[flex-flow:column] 
      max-_700:p-[0_20px] max-_700:mt-auto max-_700:min-h-[unset]"
      >
        <motion.h3
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
          className="ml-[157px] mb-[19px] w-full text-[42px] font-[600] 
          max-_900:ml-[50px] max-_900:mb-[12px] max-_700:ml-0 max-_700:max-w-[250px] max-_700:mb-[16px] max-_700:text-[32px]"
        >
          {data.project_address}
        </motion.h3>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            ease: "easeIn",
            y: { duration: 0.5, delay: 0.8 },
            opacity: { delay: 0.8 },
          }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 60 },
          }}
          className="ml-[157px] mb-[11px] max-w-[510px] text-[15px] max-_900:ml-[50px] max-_700:ml-0 max-_700:text-[14px]"
        >
          {data.paragraph}
        </motion.p>
        <motion.ul
          variants={container}
          initial={"hidden"}
          whileInView="visible"
          viewport={{ once: true }}
          className="ml-[157px] mt-[64px] w-full flex items-start gap-[36px] text-sm font-[600]
          max-_900:ml-[50px] max-_900:mb-[15px] max-_900:mt-0 max-_900:pt-[22px] 
          max-_700:[flex-flow:row_wrap] max-_700:mt-[33px] max-_700:m-0 max-_700:p-0 max-_700:max-w-[170px]"
        >
          {["location", "year", "area"].map((type) => renderInfo(type, data))}
        </motion.ul>
      </div>
    </div>
  );
};

const Images = ({ name, images }) => {
  const { t } = useTranslation();

  const [selectedFilters, setSelectedFilters] = useState(["all"]);
  const [filteredItems, setFilteredItems] = useState(images);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const filtered_arr = images.filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.category === value.category)
    );
    setItems(filtered_arr.map((a) => a.category));
  }, [images]);

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
  }, [images, selectedFilters]);

  const filterItems = () => {
    if (selectedFilters.length > 0 && selectedFilters[0] !== "all") {
      let tempItems = selectedFilters.map((selectedCategory) => {
        let temp = images.filter(
          (images) => images.category === selectedCategory
        );
        return temp;
      });
      setFilteredItems(tempItems.flat());
    } else {
      setFilteredItems([...images]);
    }
  };

  return (
    <div className="relative z-[1] px-[64px] mb-[50px] max-_900:px-[5%]">
      <div className="flex gap-5 mb-10 flex-wrap">
        {["all", ...filters].map((text, key) => (
          <div key={key}>
            {text !== "" ? (
              <button
                onClick={() => handleFilterButtonClick(text)}
                className={`group text-lg border border-gray-500 py-2 px-5 capitalize transition duration-[0.2s] hover:opacity-70 
              max-_900:text-base max-_550:text-[15px] max-_550:px-4 max-_550:py-[6px] ${
                selectedFilters?.includes(text) ? "bg-thirdly text-white" : ""
              }`}
              >
                {t(`projects.page.category.${text}`)}
              </button>
            ) : null}
          </div>
        ))}
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
        className="grid grid-cols-2 gap-3 max-_700:grid-cols-1"
      >
        {filteredItems?.map((text, key) => (
          <li
            className="bg-gray-500 w-full aspect-[16/16] bg-center bg-cover bg-no-repeat"
            key={key}
            style={{
              backgroundImage: `url(/assets/projects/${name}/images/${text.image}.jpg)`,
            }}
          ></li>
        ))}
      </motion.ul>
    </div>
  );
};

export default Project;
