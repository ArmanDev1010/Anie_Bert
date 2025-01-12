import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { RequestBtn, Socials } from "../";

const Menu = ({
  showMenu,
  handleClose,
  toggleModal,
  invert_colors,
  isScrolled,
}) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isActive = (path) => {
    return (
      (location.pathname === "/" && path === "home") ||
      location.pathname.split("/")[2] === path
    );
  };

  return (
    <div className="menu w-full h-full fixed top-0 left-0 z-[9]">
      <motion.div
        className="relative w-full h-full z-[1] flex flex-col justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ul
          className="absolute left-[211px] top-[calc(50%+10px)] -translate-y-1/2 flex flex-col gap-[34px] max-_1080:text-center 
        max-_1080:items-center max-_1080:gap-[25px] max-_1080:left-1/2 max-_1080:-translate-x-1/2 max-_1080:top-1/2 max-_550:w-full"
        >
          {["home", "projects", "about", "services", "contacts"].map(
            (text, index) => (
              <Link
                key={index}
                to={text === "home" ? "/" : `/${i18n.language}/${text}`}
              >
                <li
                  className={`text-[32px] font-[600] cursor-pointer translate duration-300 hover:opacity-50 ${
                    isActive(text) ? "text-white" : "text-gray-400"
                  } max-_1080:text-[28px] max-_700:text-[25px] max-_400:text-[22px]`}
                >
                  {t(`navbar.${text}`)}
                </li>
              </Link>
            )
          )}
          <RequestBtn
            menu={true}
            toggleModal={toggleModal}
            showMenu={showMenu}
            invert_colors={invert_colors}
            isScrolled={isScrolled}
          />
        </ul>

        <ul
          className="flex gap-28 items-center px-[64px] pb-[40px]
        max-_1080:!px-[5%] max-_900:justify-between max-_900:gap-0 max-_900:pb-[25px] max-_550:pb-[15px]"
        >
          <li className="max-_1080:hidden">
            <Socials />
          </li>
          <li>
            <div
              className="rounded-full py-1.5 px-5 border border-white cursor-pointer flex items-center gap-3 
            text-[17px] font-[500] capitalize transition-bg duration-300 hover:bg-white/50 max-_700:text-[15px] max-_550:text-[13px]"
            >
              <IoLocationSharp className="max-_550:hidden" />
              <span>{t(`navbar.location`)}</span>
            </div>
          </li>
          <li className="!font-montserrat flex gap-x-28 text-[15px] max-_900:flex-col max-_900:gap-y-3 max-_900:text-right max-_700:text-[14px] max-_550:text-[12px]">
            <p className="font-[600] tracking-[1px] cursor-pointer transition-opacity duration-200 hover:opacity-70">
              {t(`navbar.phone`)}
            </p>
            <p className="font-[600] tracking-[1px] cursor-pointer transition-opacity duration-200 hover:opacity-70">
              {t(`navbar.email`)}
            </p>
          </li>
        </ul>
      </motion.div>

      {/* Background overlay */}
      <motion.div
        className="w-full h-full absolute top-0 left-0 bg-[rgba(26,27,32,.98)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      />

      {/* Close button */}
      <motion.div
        className="request__close absolute top-[17px] right-[18px] w-[61px] h-[61px] p-5 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      />
    </div>
  );
};

export default Menu;
