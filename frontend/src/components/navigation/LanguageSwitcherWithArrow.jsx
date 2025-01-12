import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const LanguageSwitcherWithArrow = ({
  pos,
  invert_colors,
  fixed_active,
  showMenu,
}) => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = (newLang) => {
    localStorage.setItem("language", newLang);
    i18n.changeLanguage(newLang);

    const currentPath = location.pathname.split("/").slice(2).join("/");
    navigate(`/${newLang}/${currentPath || "home"}`);
    setSelectedLanguage(newLang);
    setIsOpen(false);
  };

  const textAndBorderColor =
    (pos || invert_colors || fixed_active) && !showMenu ? "black" : "white";

  const languages = ["am", "en", "ru"];

  return (
    <div
      className="relative flex items-center w-fit cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
    >
      <div
        className="text-[17px] font-[600] uppercase bg-transparent py-1 px-2 outline-none 
                   max-_700:w-fit max-_550:text-base"
        style={{ color: textAndBorderColor, borderColor: textAndBorderColor }}
      >
        {selectedLanguage.toUpperCase()}
      </div>
      <IoIosArrowDown
        style={isOpen ? { transform: "rotate(-90deg)" } : {}}
        className={`transition-transform text-${textAndBorderColor} max-_550:hidden`}
      />
      {isOpen && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-10 mt-2 bg-white rounded shadow-lg w-fit">
          {languages.map((lang, index) => (
            <div
              key={index}
              onClick={() => handleLanguageChange(lang)}
              className="py-2 px-4 cursor-pointer text-black font-[600] hover:bg-gray-100"
            >
              {lang.toUpperCase()}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcherWithArrow;
