import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

import {
  Modal,
  Menu,
  LanguageSwitcherWithArrow,
  MenuBtn,
  RequestBtn,
} from "../index";

const Navbar = ({ invert_colors, fixed_active }) => {
  const { t, i18n } = useTranslation();

  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(document.scrollingElement.scrollTop >= 5);
    };

    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showModal || showMenu ? "hidden" : "visible";
  }, [showModal, showMenu]);

  const toggleModal = () => setShowModal(!showModal);

  const navClasses = `navbar menu__panel fixed !text-white top-0 left-0 px-[64px] w-full h-[120px] flex items-center justify-between z-[10] max-_1080:!px-[5%] max-_550:h-[100px]`;
  const navStyle = { transition: "all .3s ease" };

  // Determine if fixed or inverted colors should be applied
  const shouldApplyFixedOrInverted = (isScrolled || fixed_active) && !showMenu;
  const shouldApplyInvertColor = invert_colors && !showMenu && !isScrolled;

  return (
    <>
      <div
        className={`${navClasses} ${
          shouldApplyFixedOrInverted ? "fixed_white" : ""
        } ${shouldApplyInvertColor ? "invert_color" : ""}`}
        style={navStyle}
      >
        {/* Logo */}
        <Link to="/">
          {["white", "black"].map((color, index) => (
            <img
              key={index}
              src={`/src/assets/logos/${color}_logo_text.png`}
              alt="logo"
              className={`w-[210px] ${
                color === "black" ? "hidden" : ""
              } cursor-pointer max-_1600:w-[190px] max-_550:w-[170px]`}
            />
          ))}
        </Link>

        {/* Desktop Navigation */}
        <ul className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center gap-14 max-_1440:hidden">
          {["projects", "about", "services", "contacts"].map((item, index) => (
            <Link key={index} to={`/${i18n.language}/${item}`}>
              <li className="text-[18px] font-[600] cursor-pointer translate duration-300 hover:opacity-50 max-_1600:text-[17px]">
                {t(`navbar.${item}`)}
              </li>
            </Link>
          ))}
          <LanguageSwitcherWithArrow
            pos={isScrolled}
            invert_colors={invert_colors}
            fixed_active={fixed_active}
            showMenu={showMenu}
          />
        </ul>

        {/* Menu Button */}
        <MenuBtn
          pos={isScrolled}
          setShowMenu={setShowMenu}
          showMenu={showMenu}
          center={true}
        />

        {/* Mobile Navigation */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-7 _1440:hidden max-_550:gap-4">
            <LanguageSwitcherWithArrow
              pos={isScrolled}
              invert_colors={invert_colors}
              fixed_active={fixed_active}
              showMenu={showMenu}
            />
            <MenuBtn
              pos={isScrolled}
              setShowMenu={setShowMenu}
              showMenu={showMenu}
            />
          </div>

          {/* Request Button */}
          <RequestBtn
            toggleModal={toggleModal}
            showMenu={showMenu}
            invert_colors={invert_colors}
            isScrolled={isScrolled}
          />
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && (
          <Modal
            key="modal"
            showModal={showModal}
            handleClose={toggleModal}
            setShowMenu={setShowMenu}
          />
        )}
        {showMenu && (
          <Menu
            key="menu"
            showModal={showMenu}
            handleClose={toggleModal}
            toggleModal={toggleModal}
            showMenu={showMenu}
            invert_colors={invert_colors}
            isScrolled={isScrolled}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
