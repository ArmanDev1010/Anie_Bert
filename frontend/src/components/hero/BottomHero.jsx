import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsArrowRight } from "react-icons/bs";
import Modal from "../Modal";
import { AnimatePresence } from "framer-motion";

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
        <div className="w-full h-[150px] mb-[30px]"></div>
        <div className="flex justify-between gap-24">
          <div className="flex flex-col w-fit relative z-[2]">
            <h1 className="text_white_effect font-articulat desktopBM:text-[140px] text-[max(3vw,8vw)] leading-[0.85] pointer-events-none mb-[30px] pb-8">
              Transform <br className="max-desktopS:hidden"></br> your space
            </h1>
            <div className="flex h-[60px] desktopS:self-center gap-[30px] mb-[35px]">
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
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && <Modal showModal={showModal} handleClose={close} />}
      </AnimatePresence>
    </>
  );
};

export default BottomHero;
