import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ContactInfo, Modal } from "./";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
        className="bg-white relative w-full pt-[85px] pb-[185px] px-[210px] text-black max-_1440:px-[10%] max-_900:mb-10 max-_700:px-[5%]"
        style={
          is_contact_page && {
            background: "#222",
            color: "white",
            minHeight: "100%",
            paddingTop: "50px",
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
            className="uppercase text-5xl font-[700] mb-10 max-_550:text-4xl"
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
              className="text-secondary font-[600] max-_550:text-[15px]"
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
        <ContactInfo is_contact_page={is_contact_page} contact={true} />
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
        <div
          className="!font-montserrat absolute bottom-1 left-0 w-full h-[60px] flex justify-between items-center px-[64px] pb-[29px] 
        max-_900:px-[10%] max-_900:flex-col max-_900:gap-5"
        >
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
          style={{
            backgroundImage: `url(/src/assets/patterns/${
              is_contact_page ? "grid-crosshairs_white" : "grid-crosshairs"
            }.png)`,
          }}
        ></div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && <Modal showModal={showModal} handleClose={close} />}
      </AnimatePresence>
    </>
  );
};

export default Contact;
