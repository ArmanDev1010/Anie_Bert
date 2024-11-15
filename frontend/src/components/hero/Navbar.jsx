import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { AnimatePresence } from "framer-motion";

import Modal from "../Modal";

const Navbar = () => {
  const { t } = useTranslation();

  const [pos, setPos] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const close = () => setShowModal(false);
  const open = () => setShowModal(true);

  if (showModal) {
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
        className={`menu__panel ${
          pos ? "fixed_white" : ""
        } fixed top-0 left-0 w-full h-[150px] flex items-center justify-between z-[5] px-[64px]`}
        style={{ transition: "all .3s ease" }}
      >
        <img
          src="/src/assets/logos/white_logo_text.png"
          alt="logo"
          className="w-[190px]"
        />
        <img
          src="/src/assets/logos/black_logo_text.png"
          alt="logo"
          className="w-[190px] hidden"
        />
        <ul className="flex items-center gap-14">
          {["projects", "about", "contacts"].map((text, key) => (
            <li
              key={key}
              className="text-[18px] font-[500] cursor-pointer translate duration-300 hover:opacity-50"
            >
              {t(`navbar.${text}`)}
            </li>
          ))}
        </ul>
        <button
          onClick={() => (showModal ? close() : open())}
          className="group bg-transparent border-[1px] border-white/50 cursor-pointer px-[58px] py-3 outline-none transition duration-200 hover:bg-white"
        >
          <div className="relative overflow-hidden text-center text-[16px] font-[600]">
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
    </>
  );
};

export default Navbar;
