import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsArrowRight } from "react-icons/bs";
import Modal from "../Modal";
import { AnimatePresence } from "framer-motion";
import SwiperHero from "./swiper/SwiperHero";

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
      <div className="w-full h-screen relative px-[64px]">
        <div className="w-full h-[150px] mb-[40px]"></div>
        <div className="flex flex-col w-fit relative z-[2]">
          <h1 className="text_white_effect font-articulat text-[max(3vw,9vw)] leading-[0.8] pointer-events-none mb-[40px] pb-8">
            Transform <br></br> your space
          </h1>
          <div className="flex h-[60px] self-center gap-[40px] mb-[50px]">
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
        <SwiperHero />
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && <Modal showModal={showModal} handleClose={close} />}
      </AnimatePresence>
    </>
  );
};

export default BottomHero;
