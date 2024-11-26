import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Modal from "../reusable/Modal";
import { AnimatePresence } from "framer-motion";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { motion } from "framer-motion";

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
      <div className="absolute bottom-10 left-[64px] z-[4]">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            ease: "easeIn",
            y: { duration: 0.5, delay: 1.2 },
            opacity: { delay: 1.2 },
          }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 60 },
          }}
          className="pointer-events-none font-articulat text-[max(3vw,5.5vw)] leading-[1.1] pointer-events-none mb-10
        max-desktopM:text-[max(3vw,5.3vw)] max-desktopM:mb-8"
        >
          Building Visions & <br></br>Creating Reality
        </motion.h1>
        <motion.button
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            ease: "easeIn",
            y: { duration: 0.5, delay: 1.5 },
            opacity: { delay: 1.5 },
          }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 60 },
          }}
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
        </motion.button>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && <Modal showModal={showModal} handleClose={close} />}
      </AnimatePresence>
    </>
  );
};

export default BottomHero;
