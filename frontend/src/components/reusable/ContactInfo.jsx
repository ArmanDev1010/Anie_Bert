import React from "react";
import Socials from "./Socials";
import { IoLocationSharp } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const ContactInfo = ({ hero }) => {
  const { t } = useTranslation();

  const if_hero =
    hero && "absolute bottom-0 left-0 z-[3] w-[85%] max-_1080:w-full";

  return (
    <ul
      className={`${if_hero} flex gap-28 items-center px-[64px] pb-[40px]
  max-_1080:!px-[5%] max-_900:justify-between max-_900:gap-0 max-_900:pb-[25px] max-_550:pb-[15px]`}
    >
      <li className={`${hero && "max-_1440:hidden"} max-_1080:hidden`}>
        <Socials />
      </li>
      <li>
        <Link to="https://maps.app.goo.gl/ZcfcTCohGbfCG16D9">
          <div
            className="rounded-full py-1.5 px-5 border border-white cursor-pointer flex items-center gap-3 
      text-[17px] font-[600] capitalize transition-bg duration-300 hover:bg-white/50 max-_700:text-[15px] max-_550:text-[13px] max-_400:text-[11px]"
          >
            <IoLocationSharp className="max-_550:hidden" />
            <span>{t(`navbar.location`)}</span>
          </div>
        </Link>
      </li>
      <li className="!font-montserrat flex gap-x-28 text-[16px] max-_900:flex-col max-_900:gap-y-3 max-_900:text-right max-_700:text-[14px] max-_550:text-[12px]">
        {["phone", "email"].map((text, key) => (
          <Link
            to={
              text == "phone"
                ? "tel:+374 55 550123"
                : "mailto:info@aniebert.com"
            }
            key={key}
          >
            <p className="font-[600] tracking-[1px] cursor-pointer transition-opacity duration-200 hover:opacity-70">
              {t(`navbar.${text}`)}
            </p>
          </Link>
        ))}
      </li>
    </ul>
  );
};

export default ContactInfo;
