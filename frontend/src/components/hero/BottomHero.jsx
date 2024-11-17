import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import { AnimatePresence } from "framer-motion";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const BottomHero = () => {
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);

  const close = () => setShowModal(false);
  const open = () => setShowModal(true);

  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  return (
    <>
      <div className="absolute bottom-10 left-10 z-[4]">
        <h1
          className="text_white_effect pointer-events-none font-articulat text-[max(3vw,7.5vw)] leading-[1] pointer-events-none pb-8
        max-desktopM:text-[max(3vw,7vw)]"
        >
          Transform <br></br> your space
        </h1>
        <button
          className="group relative w-fit bg-transparent transition-shadow duration-300 hover:shadow-[0_0_80px_rgba(255,255,255,.10)]"
          onClick={() => (showModal ? close() : open())}
        >
          <div className="relative overflow-hidden border-[2px] border-white bg-inherit rounded-full px-12 text-lg font-semibold">
            <div className="group-hover:translate-y-[-110%] transition duration-300 py-4">
              {t(`hero.buttons.start`)}
            </div>
            <div className="translate-y-[110%] bg-white text-black py-4 group-hover:translate-y-[0%] transition duration-300 absolute top-0 bottom-0 left-0 right-0">
              {t(`hero.buttons.start`)}
            </div>
          </div>
          <div className="absolute top-0 -right-10 w-20 h-full">
            <div className="absolute top-1/2 left-[50%] -translate-y-1/2 text-black text-[27px] overflow-hidden">
              <div className="group-hover:translate-x-[110%] transition duration-300">
                <MdOutlineKeyboardArrowRight />
              </div>
              <div className="-translate-x-[110%] group-hover:translate-x-[0%] transition duration-300 absolute top-0 bottom-0 left-0 right-0">
                <MdOutlineKeyboardArrowRight />
              </div>
            </div>
            <img src="/src/assets/subtract.png" className="w-full h-full" />
          </div>
        </button>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && <Modal showModal={showModal} handleClose={close} />}
      </AnimatePresence>
    </>
  );
};

export default BottomHero;
