import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { AnimatePresence } from "framer-motion";

import { Modal, Menu, LanguageSwitcherWithArrow } from "../index";
import { Link } from "react-router-dom";

const Navbar = ({ invert_colors, fixed_active }) => {
  const { t, i18n } = useTranslation();

  const [pos, setPos] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const close = () => setShowModal(false);
  const open = () => setShowModal(true);

  if (showModal || showMenu) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  useEffect(() => {
    document.addEventListener("scroll", (e) => {
      let scrolled = document.scrollingElement.scrollTop;
      if (scrolled >= 5) {
        setPos(true);
      } else {
        setPos(false);
      }
    });
  }, []);

  return (
    <>
      <div
        className={`navbar menu__panel ${
          (pos && !showMenu) || (fixed_active && !showMenu) ? "fixed_white" : ""
        } ${
          invert_colors && !showMenu && !pos ? "invert_color" : ""
        } fixed !text-white top-0 left-0 px-[64px] w-full h-[120px] flex items-center justify-between z-[10]`}
        style={{ transition: "all .3s ease" }}
      >
        <Link to={"/"}>
          {["white", "black"].map((text, key) => (
            <img
              src={`/src/assets/logos/${text}_logo_text.png`}
              alt="logo"
              key={key}
              className={`w-[210px] ${
                text == "black" ? "hidden" : ""
              } cursor-pointer max-desktopM:w-[190px]`}
            />
          ))}
        </Link>
        <ul className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-desktopS:hidden flex items-center gap-14">
          {["projects", "about", "services", "contacts"].map((text, key) => (
            <Link to={`/${i18n.language}/${text}`} key={key}>
              <li className="text-[18px] font-[600] max-desktopM:text-[17px] cursor-pointer translate duration-300 hover:opacity-50">
                {t(`navbar.${text}`)}
              </li>
            </Link>
          ))}
          <LanguageSwitcherWithArrow
            pos={pos}
            invert_colors={invert_colors}
            fixed_active={fixed_active}
          />
        </ul>
        <div
          className={`menu_btn ${showMenu ? "menu_btn_clicked" : ""} ${
            pos ? "menu_btn_fixed" : ""
          } cursor-pointer relative p-10 desktopS:hidden`}
          onClick={() => setShowMenu(!showMenu)}
        ></div>
        <button
          onClick={() => (showModal ? close() : open())}
          className={`group ${
            showMenu && invert_colors && !pos ? "text-white" : ""
          } border-[1px] border-white/50 cursor-pointer px-[58px] py-3 outline-none transition duration-200 hover:bg-secondary`}
        >
          <div className="pointer-events-none relative overflow-hidden text-center text-[16px] font-[600]">
            <div className="group-hover:translate-y-[-110%] transition duration-300">
              {t(`navbar.request`)}
            </div>
            <div className="translate-y-[110%] group-hover:translate-y-[0%] transition duration-300 absolute top-0 bottom-0 left-0 right-0">
              {t(`navbar.request`)}
            </div>
          </div>
        </button>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && <Modal showModal={showModal} handleClose={close} />}
      </AnimatePresence>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showMenu && <Menu showModal={showMenu} handleClose={close} />}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
