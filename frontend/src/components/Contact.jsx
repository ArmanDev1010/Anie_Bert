import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoLocationSharp } from "react-icons/io5";
import Modal from "./Modal";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ease: "linear", delayChildren: 1, staggerChildren: 0.15 },
  },
};

const item = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.35 },
  },
};

const Contact = () => {
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
      <div className="bg-white relative w-full pt-[85px] pb-[185px] px-[210px] text-black">
        <div className="pointer-events-none mb-[63px]">
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{
              ease: "easeIn",
              y: { duration: 0.5, delay: 0.4 },
              opacity: { delay: 0.4 },
            }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 60 },
            }}
            className="uppercase text-5xl font-[700] mb-5"
          >
            Contact us
          </motion.p>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{
              ease: "easeIn",
              y: { duration: 0.5, delay: 0.7 },
              opacity: { delay: 0.7 },
            }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 60 },
            }}
            className="max-w-[390px] text-gray-700"
          >
            For cooperation or if you have any questions for us.
            info.aniebert@gmail.com
          </motion.p>
        </div>
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-28 items-center mb-[63px]"
        >
          {["socials", "location", "phone", "email"].map((text, key) => (
            <motion.li key={key} variants={item} className="">
              {text == "socials" ? (
                <ul className="flex gap-5">
                  {["fb", "In", "be", "pi"].map((text, key) => (
                    <li
                      key={key}
                      className="capitalize font-[600] text-[18px] cursor-pointer transition-opacity duration-200 hover:opacity-70"
                    >
                      {text}
                    </li>
                  ))}
                </ul>
              ) : text == "location" ? (
                <div
                  className="rounded-full py-1.5 px-5 border border-white cursor-pointer flex items-center gap-3 font-[500]
                    transition-text duration-300 hover:text-gray-500"
                >
                  <IoLocationSharp className="text-[17px]" />
                  <span className="capitalize">Davit 54 of Sasuntsi</span>
                </div>
              ) : (
                <p className="font-[600] tracking-[1px] text-[15px] cursor-pointer transition-opacity duration-200 hover:opacity-70">
                  {t(`navbar.${text}`)}
                </p>
              )}
            </motion.li>
          ))}
        </motion.ul>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{
            ease: "easeIn",
            y: { duration: 0.5, delay: 1.7 },
            opacity: { delay: 1.7 },
          }}
          variants={{
            visible: { opacity: 1, y: 0 },
            hidden: { opacity: 0, y: 40 },
          }}
        >
          <button
            onClick={() => (showModal ? close() : open())}
            className="group bg-transparent border-[1px] border-black cursor-pointer px-[58px] py-3 outline-none transition duration-200 hover:bg-secondary"
          >
            <div className="pointer-events-none relative overflow-hidden text-center text-[16px] font-[600]">
              <div className="group-hover:translate-y-[-110%] transition duration-300">
                Send us a message
              </div>
              <div className="text-white translate-y-[110%] group-hover:translate-y-[0%] transition duration-300 absolute top-0 bottom-0 left-0 right-0">
                Send us a message
              </div>
            </div>
          </button>
        </motion.div>
        <div className="absolute bottom-1 left-0 w-full h-[60px] flex justify-between items-center px-[64px] pb-[29px]">
          <p className="text-[14px] pointer-events-none">
            © Copyright 2024. All rights reserved
          </p>
          <p className="pointer-events-none">
            Designed by`{" "}
            <a
              href="https://armanmanukyan.am"
              target="_blank"
              className="font-semibold pointer-events-auto transition-opacity duration-200 hover:opacity-70"
            >
              Arman Manukyan
            </a>
          </p>
        </div>
        <div
          className="absolute top-0 left-0 w-full h-full pointer-events-none bg-cover bg-no-repeat opacity-20 z-[0]"
          style={{ backgroundImage: "url(/src/assets/grid-crosshairs.png)" }}
        ></div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && <Modal showModal={showModal} handleClose={close} />}
      </AnimatePresence>
    </>
  );
};

export default Contact;
