import React from "react";

const MenuBtn = ({ pos, setShowMenu, showMenu, center }) => {
  const baseClasses = "menu_btn cursor-pointer relative w-10 h-14";

  const clickedClass = showMenu ? "menu_btn_clicked" : "";
  const positionClass = pos ? "menu_btn_fixed" : "";

  const centerClasses = center
    ? "!absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 _1440:hidden max-_700:hidden"
    : "_700:hidden";

  return (
    <div
      className={`${baseClasses} ${clickedClass} ${positionClass} ${centerClasses}`}
      onClick={() => setShowMenu(!showMenu)}
    ></div>
  );
};

export default MenuBtn;
