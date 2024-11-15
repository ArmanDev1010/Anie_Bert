import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { AnimatePresence } from "framer-motion";

import { Modal, Menu } from "../index";

const Navbar = () => {
  const { t } = useTranslation();

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
      if (scrolled >= 30) {
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
          pos ? "fixed_white" : ""
        } fixed top-0 left-0 w-full h-[150px] flex items-center justify-between z-[11] px-[64px]`}
        style={{ transition: "all .3s ease" }}
      >
        <img
          src="/src/assets/logos/white_logo_text.png"
          alt="logo"
          className="w-[210px]"
        />
        <img
          src="/src/assets/logos/black_logo_text.png"
          alt="logo"
          className="w-[210px] hidden"
        />
        <ul className="max-desktopS:hidden flex items-center gap-14">
          {["projects", "about", "services", "contacts"].map((text, key) => (
            <li
              key={key}
              className="text-[18px] font-[500] cursor-pointer translate duration-300 hover:opacity-50"
            >
              {t(`navbar.${text}`)}
            </li>
          ))}
        </ul>
        <div
          className={`menu_btn ${
            showMenu ? "menu_btn_clicked" : ""
          } cursor-pointer relative p-10 desktopS:hidden`}
          onClick={() => setShowMenu(!showMenu)}
        ></div>
        <button
          onClick={() => (showModal ? close() : open())}
          className="group bg-transparent border-[1px] border-white/50 cursor-pointer px-[58px] py-3 outline-none transition duration-200 hover:bg-white"
        >
          <div className="pointer-events-none relative overflow-hidden text-center text-[16px] font-[600]">
            <div className="group-hover:translate-y-[-110%] transition duration-300">
              {t(`navbar.request`)}
            </div>
            <div className="text-black translate-y-[110%] group-hover:translate-y-[0%] transition duration-300 absolute top-0 bottom-0 left-0 right-0">
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
