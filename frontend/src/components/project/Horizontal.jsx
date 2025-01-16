import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ImageSlideshow from "./ImageSlideshow";

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
      <div className="relative group z-[2] bg-red-500 w-full h-[401px] overflow-hidden max-_400:h-[351px]">
        <div className="absolute z-[3] flex gap-[1rem] top-[1rem] left-[1rem] text-sm font-[600] max-_550:text-xs">
          {["type", "year", "area"].map((type) => renderInfo(type, text, t))}
        </div>
        <div className="relative z-[2] bg-gray-500 w-full h-full mb-[0.7rem]">
          <ImageSlideshow
            main_image={text}
            images={text.images.slice(0, 5)}
            defaultImageIndex={0}
          />
        </div>
        <div className="absolute bottom-[7vh] left-[3vw] z-[3] text-white max-w-[350px] max-_900:max-w-[270px] max-_900:max-w-[350px]">
          <h3 className="text-[32px] font-[600] mb-2 max-_900:text-[32px] max-_550:text-[25px] max-_400:text-[6vw]">
            {text.project_address}
          </h3>
          <p
            className="relative text-[13px] uppercase font-[600] cursor-pointer w-fit !pointer-events-auto inline-block pl-4 ml-[1px] cursor-pointer font-[500] group-hover:pl-[64px]
              max-_400:text-[11px]
              before:content-[''] before:block before:absolute before:top-1/2 before:left-0 before:h-[1px] before:w-[8px] before:-translate-y-1/2 before:bg-white
              after:content-[''] after:block after:absolute after:top-1/2 after:left-[calc(100%+9px)] after:h-[1px] after:w-[56px] after:-translate-y-1/2 after:bg-white
              group-hover:after:w-[8px] group-hover:before:w-[56px] before:transition-[width_0.5s_ease] before:duration-[0.5s] after:transition-[width_0.5s_ease] after:duration-[0.5s]"
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

export default Horizontal;
