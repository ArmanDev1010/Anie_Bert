import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoLocationSharp } from "react-icons/io5";
import { Modal, Socials } from "./";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

const Contact = ({ is_contact_page }) => {
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
      <div
        className="bg-white relative w-full pt-[85px] pb-[185px] px-[210px] text-black"
        style={
          is_contact_page && {
            background: "transparent",
            color: "white",
            height: "100%",
          }
        }
      >
        <div
          className="pointer-events-none mb-[63px]"
          style={is_contact_page && { marginBottom: "100px" }}
        >
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
            className="uppercase text-5xl font-[700] mb-10"
          >
            {t("contact.title")}
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
            className="max-w-[400px] text-secondary leading-[1.7] pointer-events-auto"
            style={
              is_contact_page && {
                color: "white",
                maxWidth: "500px",
                letterSpacing: "1px",
                lineHeight: "1.7",
              }
            }
          >
            {t("contact.paragraph")}
            <Link
              to={"mailto:info@aniebert.com"}
              className="text-secondary font-[600]"
              style={
                is_contact_page && {
                  color: "white",
                }
              }
            >
              {" "}
              {t("navbar.email")}
            </Link>
          </motion.p>
        </div>
        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex gap-28 items-center mb-[63px]"
          style={is_contact_page && { marginBottom: "100px" }}
        >
          {["socials", "location", "phone", "email"].map((text, key) => (
            <motion.li key={key} variants={item} className="">
              {text == "socials" ? (
                <Socials />
              ) : text == "location" ? (
                <Link to={"https://maps.app.goo.gl/ZcfcTCohGbfCG16D9"}>
                  <div
                    className="rounded-full py-1.5 px-5 border border-white cursor-pointer flex items-center gap-3 font-[500]
                    transition-text duration-300 hover:text-gray-500"
                  >
                    <IoLocationSharp className="text-[17px]" />
                    <span className="capitalize">{t("navbar.location")}</span>
                  </div>
                </Link>
              ) : (
                <Link
                  to={
                    text == "phone"
                      ? "tel:+374 55 550123"
                      : "mailto:info@aniebert.com"
                  }
                >
                  <p className="!font-montserrat font-[600] tracking-[1px] text-[15px] cursor-pointer transition-opacity duration-200 hover:opacity-70">
                    {t(`navbar.${text}`)}
                  </p>
                </Link>
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
            style={
              is_contact_page && {
                borderColor: "white",
                background: "white",
                color: "black",
              }
            }
          >
            <div className="pointer-events-none relative overflow-hidden text-center text-[16px] font-[600]">
              <div className="group-hover:translate-y-[-110%] transition duration-300">
                {is_contact_page
                  ? t("contact.intouch_btn")
                  : t("contact.message_btn")}
              </div>
              <div
                className="text-white translate-y-[110%] group-hover:translate-y-[0%] transition duration-300 absolute top-0 bottom-0 left-0 right-0"
                style={is_contact_page && { color: "black" }}
              >
                {is_contact_page
                  ? t("contact.intouch_btn")
                  : t("contact.message_btn")}
              </div>
            </div>
          </button>
        </motion.div>
        <div className="!font-montserrat absolute bottom-1 left-0 w-full h-[60px] flex justify-between items-center px-[64px] pb-[29px]">
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
