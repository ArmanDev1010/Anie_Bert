import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useQuery, gql } from "@apollo/client";
import { Contact, Navbar } from "../components";

import { motion } from "framer-motion";

import { BsArrowLeft } from "react-icons/bs";

const PROJECT = gql`
  query GetProject($documentId: ID!) {
    hero(documentId: $documentId) {
      project_address
      type
      documentId
      location
      year
      area
      image {
        url
      }
      images {
        image {
          url
        }
        category
      }
    }
  }
`;

const Project = () => {
  const { documentId } = useParams();
  const { loading, error, data } = useQuery(PROJECT, {
    variables: { documentId: documentId },
  });

  if (loading) return <p></p>;
  if (error) return <p>error</p>;

  return (
    <div className="relative bg-white text-black">
      <Navbar invert_colors={true} />
      <div className="w-full h-[120px] mb-[30px]"></div>
      <TheProject data={data.hero} images={data.hero.images} />
      <div
        className="absolute top-0 left-0 w-full h-screen bg-cover bg-no-repeat opacity-10"
        style={{ backgroundImage: "url(/src/assets/line-grid.png)" }}
      ></div>
      <Contact />
    </div>
  );
};

const TheProject = ({ data, images }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredItems, setFilteredItems] = useState(images);

  let filters = ["bedroom", "bathroom", "living room", "kitchen"];

  const handleFilterButtonClick = (selectedCategory) => {
    if (selectedFilters.includes(selectedCategory)) {
      let filters = selectedFilters.filter((el) => el !== selectedCategory);
      setSelectedFilters(filters);
    } else {
      setSelectedFilters([selectedCategory]);
    }
  };

  useEffect(() => {
    filterItems();
  }, [selectedFilters]);

  const filterItems = () => {
    if (selectedFilters.length > 0) {
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
    <div className="relative z-[1] px-[64px] mb-[50px]">
      <Link
        to={"/"}
        className="group flex items-center gap-4 mb-14 cursor-pointer w-fit"
      >
        <BsArrowLeft
          className="text-[36px] border-[1px] border-black py-[7px] group-hover:bg-black group-hover:text-white 
      transition duration-300"
        />
        <div className="relative overflow-hidden">
          <div className="group-hover:translate-y-[-110%] transition duration-300">
            Go Back
          </div>
          <div className="translate-y-[110%] group-hover:translate-y-[0%] transition duration-300 absolute top-0 bottom-0 left-0 right-0">
            Go Back
          </div>
        </div>
      </Link>
      <div className="flex justify-between items-end mb-12">
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
          className="pointer-events-none font-articulat text-[max(3vw,5.5vw)] leading-[1.1] pointer-events-none
    max-desktopM:text-[max(3vw,5.2vw)]"
        >
          {data.project_address}
        </motion.p>
        <ul className="text-base text-gray-500 pointer-events-none">
          {["location", "year", "area"].map((text, key) =>
            (text == "location" && data.location) ||
            (text == "year" && data.year) ||
            (text == "area" && data.area) ? (
              <li key={key}>
                <span className="capitalize">{text}</span> :{" "}
                {text == "location"
                  ? data.location
                  : text == "year"
                  ? data.year
                  : data.area}
              </li>
            ) : null
          )}
        </ul>
      </div>
      <div className="flex gap-5 mb-10">
        {filters.map((text, key) => (
          <button
            onClick={() => handleFilterButtonClick(text)}
            key={key}
            className={`group border border-gray-500 py-2 px-5 rounded-[10px] capitalize transition duration-[0.2s] hover:opacity-70 ${
              selectedFilters?.includes(text) ? "bg-thirdly text-white" : ""
            }`}
          >
            {text}
          </button>
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
        className="grid grid-cols-2 gap-3"
      >
        {filteredItems.map((text, key) => (
          <li
            className="bg-gray-500 w-full aspect-[16/16] bg-center bg-cover bg-no-repeat"
            key={key}
            style={{
              backgroundImage: `url(http://localhost:1337/${text.image.url})`,
            }}
          ></li>
        ))}
      </motion.ul>
    </div>
  );
};

export default Project;
