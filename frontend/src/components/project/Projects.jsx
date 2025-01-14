import React, { useEffect, useRef, useState } from "react";

import { useScroll, useTransform, motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Autoplay } from "swiper/modules";

import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const PROJECTS = gql`
  query GetProjects($locale: I18NLocaleCode) {
    heroes(
      filters: { show_inside_home: { eq: true } }
      sort: "project_order"
      locale: $locale
    ) {
      documentId
      project_address
      type
      year
      area
      image {
        url
      }
      project_thumbnail {
        url
      }
    }
    fallback: heroes(
      filters: { show_inside_home: { eq: true } }
      sort: "project_order"
      locale: "en"
    ) {
      documentId
      project_address
      type
      year
      area
      image {
        url
      }
      project_thumbnail {
        url
      }
    }
  }
`;

const Projects = () => {
  const { t, i18n } = useTranslation();

  const [isDesktop, setIsDesktop] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => setIsDesktop(window.innerWidth));
  }, [window.innerWidth]);

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
    <div className="projects_section relative bg-white text-black">
      <div
        className="max-_1280:mb-12 max-_1280:text-center max-_700:text-left max-_700:px-[5%] max-_550:mb-8"
        style={
          isDesktop > 1280
            ? {
                position: "absolute",
                top: "0",
                left: "64px",
              }
            : {}
        }
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
          className="font-semibold mb-8 uppercase text-6xl max-_700:text-[8vw] max-_700:mb-5 max-_550:text-[9vw]"
        >
          {t("projects.component.title")}
        </motion.p>
        <div className="_1280:hidden w-full flex justify-center max-_700:justify-start max-_550:text-sm">
          <p className="max-w-[400px]">
            We released more than 150 commercial and private projects all around
            the world, providing our clients with custom solutions in stylish,
            functional, and well-thought-out designs.
          </p>
        </div>
      </div>
      <Project data={projects} isDesktop={isDesktop} />
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat opacity-20"
        style={{ backgroundImage: "url(/src/assets/line-grid.png)" }}
      ></div>
    </div>
  );
};

const Project = ({ data, isDesktop }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-75%"]);

  return (
    <div
      ref={targetRef}
      className={`${isDesktop > 1280 ? "vertical" : "horizontal"}`}
    >
      <div>
        <motion.ul style={isDesktop > 1280 && { x }}>
          {data.map((text, key) =>
            isDesktop > 1280 ? (
              <Vertical text={text} key={key} />
            ) : (
              <Horizontal text={text} key={key} />
            )
          )}
          <OtherProjets />
        </motion.ul>
      </div>
    </div>
  );
};

const Horizontal = ({ text }) => {
  const { t, i18n } = useTranslation();

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
    <Link to={`/${i18n.language}/project/${text.documentId}`}>
      <div
        className="relative z-[2] bg-red-500 w-full h-[401px] overflow-hidden bg-cover bg-center bg-no-repeat
        after:content-[''] after:absolute after:top-0 after:left-0 after:w-[101%] after:h-[101%]
        after:bg-[linear-gradient(0deg,rgba(0,0,0,.63)_0,rgba(0,0,0,.24))] after:z-[-1]"
        style={{
          backgroundImage: `url(http://localhost:1337/${
            text.project_thumbnail?.url
              ? text.project_thumbnail?.url
              : text.image?.url
          })`,
        }}
      >
        <div className="absolute flex gap-[1rem] top-[1rem] left-[1rem] text-sm font-[600] max-_550:text-xs">
          {["type", "year", "area"].map((type) => renderInfo(type, text, t))}
        </div>
        <div className="absolute bottom-[4vh] left-[3vw] z-[1] text-white max-w-[270px] max-_900:max-w-[350px]">
          <h3 className="text-[25px] font-[600] mb-2 max-_900:text-[32px] max-_550:text-[25px] max-_400:text-[6vw]">
            {text.project_address}
          </h3>
          <p
            className="relative text-[13px] uppercase font-[600] cursor-pointer w-fit !pointer-events-auto inline-block pl-4 ml-[1px] cursor-pointer font-[500] hover:pl-[64px]
              max-_400:text-[11px]
              before:content-[''] before:block before:absolute before:top-1/2 before:left-0 before:h-[1px] before:w-[8px] before:-translate-y-1/2 before:bg-white
              after:content-[''] after:block after:absolute after:top-1/2 after:left-[calc(100%+9px)] after:h-[1px] after:w-[56px] after:-translate-y-1/2 after:bg-white
              hover:after:w-[8px] hover:before:w-[56px] before:transition-[width_0.5s_ease] before:duration-[0.5s] after:transition-[width_0.5s_ease] after:duration-[0.5s]"
            style={{
              transition:
                "padding-left .5s ease, right .5s ease, opacity .5s ease",
            }}
          >
            {t("services.page.explore_btn")}
          </p>
        </div>
      </div>
    </Link>
  );
};

const Vertical = ({ text }) => {
  const { i18n } = useTranslation();

  return (
    <Link to={`/${i18n.language}/project/${text.documentId}`}>
      <div
        className="group relative z-[2] overflow-hidden text-white transition-[tranform] duartion-[0.3s] bg-cover bg-center bg-no-repeat
        w-[650px] h-[550px] max-_1600:w-[600px] max-_1600:h-[500px]
        after:content-[''] after:absolute after:top-0 after:left-0 after:w-[101%] after:h-[101%] after:bg-[linear-gradient(0deg,rgba(0,0,0,.63)_0,rgba(0,0,0,.24))] after:z-[-1]"
        style={{
          backgroundImage: `url(http://localhost:1337/${
            text.project_thumbnail?.url
              ? text.project_thumbnail?.url
              : text.image?.url
          })`,
        }}
      >
        <div
          className="w-full text-center absolute z-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden text-[2.5vw] font-[600]
        max-_1600:text-[3vw]"
        >
          <div className="group-hover:translate-y-[-110%] transition duration-500">
            {text.project_address}
          </div>
          <div className="translate-y-[110%] group-hover:translate-y-[0%] transition duration-500 absolute top-0 bottom-0 left-0 right-0">
            {text.project_address}
          </div>
        </div>
      </div>
    </Link>
  );
};

const OtherProjets = () => {
  const { t, i18n } = useTranslation();

  return (
    <Link to={`/${i18n.language}/projects`}>
      <div
        className="group relative z-[2] text-white
      w-[650px] h-[550px] max-_1600:w-[600px] max-_1600:h-[500px] max-_1280:w-full max-_1280:h-[401px]"
      >
        <div
          className="w-full text-center absolute z-[2] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden text-[2.5vw] font-[600]
        max-_1600:text-[3vw] max-_900:text-[4.5vw] max-_550:text-[6vw] max-_400:text-[6.5vw]"
        >
          <div className="group-hover:translate-y-[-110%] transition duration-[0.4s]">
            {t("projects.component.see_other")}
          </div>
          <div className="translate-y-[110%] group-hover:translate-y-[0%] transition duration-[0.4s] absolute top-0 bottom-0 left-0 right-0">
            {t("projects.component.see_other")}
          </div>
        </div>
        <Swiper
          slidesPerView={1}
          autoplay={{
            delay: 500,
            disableOnInteraction: true,
          }}
          speed={10}
          loop={true}
          modules={[Autoplay]}
          className="absolute top-0 left-0 w-full h-full"
        >
          {["1", "2", "3", "4"].map((text, key) => (
            <SwiperSlide key={key}>
              <div
                className="bg-[#080808] w-full h-full bg-cover bg-center bg-no-repeat cursor-pointer"
                style={{
                  backgroundImage: `url(/src/assets/swiper/${text}.jpg)`,
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-black to-transparent opacity-60"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Link>
  );
};

export default Projects;
