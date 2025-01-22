import React from "react";
import Socials from "./Socials";
import { IoLocationSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Animation Variants
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { ease: "linear", delayChildren: 1, staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.35 } },
};

const ContactInfo = ({ hero, is_contact_page, contact, menu }) => {
  const { t } = useTranslation();

  const getContainerClasses = () => {
    let classes = "flex gap-28 pb-[40px] items-center";
    if (hero)
      classes +=
        " absolute bottom-0 left-0 z-[3] w-[85%] px-[64px] max-_1080:!px-[5%] max-_1080:w-full max-_900:justify-between max-_900:gap-0 max-_900:pb-[25px] max-_550:pb-[15px]";
    if (contact)
      classes +=
        " px-0 mb-10 flex-wrap gap-y-10 max-_1280:gap-x-16 max-_700:flex-col max-_700:items-start";
    if (menu)
      classes +=
        " px-[64px] max-_1080:!px-[5%] max-_900:justify-between max-_900:gap-0 max-_900:pb-[25px] max-_550:pb-[15px]";
    return classes;
  };

  const getLocationClasses = () => {
    let classes =
      "rounded-full py-1.5 px-5 border border-white cursor-pointer flex items-center gap-3 text-[17px] font-[600] capitalize transition-bg duration-300 hover:bg-white/50";
    if (contact && !is_contact_page) classes += " !border-secondary";
    else if (!contact && !is_contact_page)
      classes +=
        "max-_700:text-[15px] max-_550:text-[13px] max-_400:text-[11px]";
    return classes;
  };

  const getTextClasses = (isContact) => {
    return `!font-montserrat text-[16px] ${
      !isContact && "max-_700:text-[14px] max-_550:text-[12px]"
    }`;
  };

  // Render contact items
  const renderContactItem = (text, key) => (
    <motion.li key={key} variants={item} className={getTextClasses(contact)}>
      <Link
        to={
          text === "phone" ? "tel:+374 55 550123" : "mailto:info@aniebert.com"
        }
      >
        <p className="font-[600] tracking-[1px] cursor-pointer transition-opacity duration-200 hover:opacity-70">
          {t(`navbar.${text}`)}
        </p>
      </Link>
    </motion.li>
  );

  return (
    <motion.ul
      variants={container}
      initial={!menu ? "hidden" : "visisble"}
      whileInView="visible"
      viewport={{ once: true }}
      style={is_contact_page && { marginBottom: "100px" }}
      className={getContainerClasses()}
    >
      <motion.li
        variants={item}
        className={`${hero && "max-_1440:hidden"} ${
          !contact && "max-_1080:hidden"
        }`}
      >
        <Socials />
      </motion.li>
      <motion.li variants={item}>
        <Link to="https://maps.app.goo.gl/ZcfcTCohGbfCG16D9">
          <div className={getLocationClasses()}>
            <IoLocationSharp
              className={`${menu || hero ? "max-_550:hidden" : ""}`}
            />
            <span>{t(`navbar.location`)}</span>
          </div>
        </Link>
      </motion.li>
      {!contact ? (
        <div className="flex gap-x-28 max-_900:flex-col max-_900:gap-y-3 max-_900:text-right">
          {["phone", "email"].map(renderContactItem)}
        </div>
      ) : (
        ["phone", "email"].map(renderContactItem)
      )}
    </motion.ul>
  );
};

export default ContactInfo;
