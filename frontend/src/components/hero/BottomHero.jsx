import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";
import { AnimatePresence } from "framer-motion";
import ThumbsGallery from "./ThumbsGallery";
import { BsArrowRight } from "react-icons/bs";

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
      <div className="w-full h-screen relative">
        <div className="w-full h-[130px] max-desktopM:h-[110px]"></div>
        <div className="w-full h-[calc(100%-170px)] flex gap-8 max-desktopM:h-[calc(100%-150px)]">
          <div className="w-[75%] h-full relative z-[2] rounded-[25px] overflow-hidden bg-white">
            <ThumbsGallery showModal={showModal} close={close} open={open} />
            <div className="absolute z-[5] top-[30%] -translate-[35%] left-12">
              <h1
                className="pointer-events-none font-articulat mb-[35px] text-[75px] max-desktopM:text-[65px] 
        leading-[1.2] pointer-events-none"
              >
                Transform your space
              </h1>
              <div className="flex h-[60px] gap-[30px] mb-[60px]">
                {["start", "learn"].map((text, key) => (
                  <button
                    key={key}
                    onClick={() =>
                      text == "start" ? (showModal ? close() : open()) : null
                    }
                    className="group bg-transparent text-center text-[19px] font-[600] px-[35px] py-3 rounded-full 
              flex items-center gap-3 overflow-hidden border-[2px] border-[#e3e3e3] transition-shadow duration-300 hover:shadow-[0_0_80px_rgba(255,255,255,.10)]"
                    style={
                      text == "start"
                        ? { background: "white", color: "black" }
                        : { background: "black", color: "white" }
                    }
                  >
                    <div className="relative overflow-hidden font-[600]">
                      <div className="group-hover:translate-y-[-110%] transition duration-300">
                        {t(`hero.buttons.${text}`)}
                      </div>
                      <div className="translate-y-[110%] group-hover:translate-y-[0%] transition duration-300 absolute top-0 bottom-0 left-0 right-0">
                        {t(`hero.buttons.${text}`)}
                      </div>
                    </div>
                    <div className="relative overflow-hidden text-center text-[24px]">
                      <div className="group-hover:translate-x-[110%] transition duration-300">
                        <BsArrowRight />
                      </div>
                      <div className="-translate-x-[110%] group-hover:translate-x-[0%] transition duration-300 absolute top-0 bottom-0 left-0 right-0">
                        <BsArrowRight />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[25%] h-full bg-white rounded-[25px]"></div>
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && <Modal showModal={showModal} handleClose={close} />}
      </AnimatePresence>
    </>
  );
};

export default BottomHero;
