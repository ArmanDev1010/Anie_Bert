import React from "react";
import { useTranslation } from "react-i18next";

const RequestBtn = ({
  menu,
  toggleModal,
  showMenu,
  invert_colors,
  isScrolled,
}) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={toggleModal}
      className={`group ${
        showMenu && invert_colors && !isScrolled ? "text-white" : ""
      } ${
        menu ? "_1080:hidden" : "max-_1080:hidden"
      } max-w-[300px] border-[1px] border-white/50 cursor-pointer px-[58px] py-3 outline-none transition duration-200 hover:bg-secondary`}
    >
      <div className="pointer-events-none relative overflow-hidden text-center text-[16px] font-[600]">
        <div className="group-hover:translate-y-[-110%] transition duration-300">
          {t(`navbar.request`)}
        </div>
        <div className="translate-y-[110%] group-hover:translate-y-[0%] transition duration-300 absolute top-0 bottom-0 left-0 right-0">
          {t(`navbar.request`)}
        </div>
      </div>
    </button>
  );
};

export default RequestBtn;
