import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const LanguageSwitcherWithArrow = ({
  pos,
  invert_colors,
  fixed_active,
  menu,
}) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isClick, setIsClick] = useState(false);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    localStorage.setItem("language", newLang);
    i18n.changeLanguage(newLang);

    const currentPath = location.pathname.split("/").slice(2).join("/");
    navigate(`/${newLang}/${currentPath || "home"}`);
  };

  return (
    <div
      className="relative flex items-center w-fit"
      onClick={() => setIsClick(!isClick)}
      style={menu && { fontSize: "22px" }}
    >
      <select
        value={i18n.language}
        onChange={handleLanguageChange}
        className={`appearance-none cursor-pointer ${
          menu ? "w-[90px]" : "w-[74px]"
        } font-[600] uppercase bg-transparent py-1 px-2 outline-none`}
        style={
          pos || invert_colors || fixed_active
            ? { color: "black", borderColor: "black" }
            : null
        }
      >
        {["am", "en", "ru"].map((text, key) => (
          <option value={text} key={key} className="bg-white text-black">
            {text}
          </option>
        ))}
      </select>
      <IoIosArrowDown
        style={isClick ? { transform: "rotate(-90deg)" } : null}
        className={`pointer-events-none transition-transform absolute right-3 ${
          pos || invert_colors || fixed_active ? "text-black" : null
        }`}
      />
    </div>
  );
};

export default LanguageSwitcherWithArrow;
