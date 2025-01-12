import React from "react";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import { IoLocationSharp } from "react-icons/io5";

import { LanguageSwitcherWithArrow, Socials } from "../";

const Menu = ({ handleClose }) => {
  let location = useLocation();
  const { t, i18n } = useTranslation();

  return (
    <div className="menu w-full h-full fixed top-0 left-0 z-[9]">
      <motion.div
        className="relative w-full h-full z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ul className="absolute left-[211px] top-[calc(50%+10px)] -translate-y-1/2 flex flex-col gap-[34px]">
          {["home", "projects", "about", "services", "contacts"].map(
            (text, key) => (
              <Link to={text == "home" ? "/" : `/${i18n.language}/${text}`} key={key}>
                <li
                  className={`${
                    location.pathname.split("/")[1] == text ||
                    (location.pathname == "/" && text == "home")
                      ? "text-white"
                      : "text-gray-500"
                  } text-[32px] font-[600] cursor-pointer translate duration-300 hover:opacity-50`}
                >
                  {t(`navbar.${text}`)}
                </li>
              </Link>
            )
          )}
          <LanguageSwitcherWithArrow menu={true} />
        </ul>
        <div className="absolute left-[64px] bottom-[37px] z-[2] text-white">
          <ul className="flex gap-28 items-center">
            {["socials", "location", "phone", "email"].map((text, key) => (
              <li key={key} className="">
                {text == "socials" ? (
                  <Socials />
                ) : text == "location" ? (
                  <div
                    className="rounded-full py-1.5 px-5 border border-white cursor-pointer flex items-center gap-3 font-[500]
                    transition-bg duration-300 hover:bg-white/50"
                  >
                    <IoLocationSharp className="text-[17px]" />
                    <span className="capitalize">{t(`navbar.${text}`)}</span>
                  </div>
                ) : (
                  <p className="font-[600] tracking-[1px] text-[15px] cursor-pointer transition-opacity duration-200 hover:opacity-70">
                    {t(`navbar.${text}`)}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
      <motion.div
        className="w-full h-full absolute top-0 left-0 bg-[rgba(26,27,32,.98)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      ></motion.div>
      <motion.div
        className="request__close absolute top-[17px] right-[18px] w-[61px] h-[61px] p-5 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      ></motion.div>
    </div>
  );
};

export default Menu;
