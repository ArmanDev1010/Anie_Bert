import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowDown } from "react-icons/io";

const LanguageSwitcherWithArrow = ({ pos, invert_colors, fixed_active }) => {
  const { i18n, t } = useTranslation();

  const [isClick, setIsClick] = useState(false);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    localStorage.setItem("language", newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <div
      className="relative flex items-center"
      onClick={() => setIsClick(!isClick)}
    >
      <select
        value={i18n.language}
        onChange={handleLanguageChange}
        className="appearance-none cursor-pointer w-20 font-[600] uppercase bg-transparent border-[1px] rounded-lg py-1 px-2 border-[#e3e3e3] outline-none"
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
