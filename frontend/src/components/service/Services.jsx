import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useTranslation } from "react-i18next";

const SERVICES = gql`
  query GetServices {
    services(sort: "order") {
      service
    }
  }
`;

const services = [
  {
    color: "#000000",
  },
  {
    color: "#8C8C8C",
  },
  {
    color: "#EFE8D3",
  },
];

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

const Services = () => {
  const { t, i18n } = useTranslation();

  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  let xMoveContainer = useRef(null);
  let yMoveContainer = useRef(null);
  let xMoveCursor = useRef(null);
  let yMoveCursor = useRef(null);
  let xMoveCursorLabel = useRef(null);
  let yMoveCursorLabel = useRef(null);

  useEffect(() => {
    //Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });
    //Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    yMoveCursor.current = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });
    //Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });
  });

  const moveItems = (x, y) => {
    xMoveContainer.current(x);
    yMoveContainer.current(y);
    xMoveCursor.current(x);
    yMoveCursor.current(y);
    xMoveCursorLabel.current(x);
    yMoveCursorLabel.current(y);
  };
  const manageModal = (active, index, x, y) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  const { loading, error, data } = useQuery(SERVICES);

  if (loading) return <p></p>;
  if (error) return <p>error</p>;

  return (
    <div
      className="flex items-center px-[200px] pt-[40px] flex-col bg-white text-black max-desktopM:px-[150px]"
      onMouseMove={(e) => {
        moveItems(e.clientX, e.clientY);
      }}
    >
      <div className="w-full flex flex-col items-center justify-center mb-[100px]">
        {data.services?.map((service, index) => {
          return (
            <Link
              to={`/${i18n.language}/services/${service.service}`}
              key={index}
              className="w-full"
            >
              <div
                index={index}
                onMouseEnter={(e) => {
                  manageModal(true, index, e.clientX, e.clientY);
                }}
                onMouseLeave={(e) => {
                  manageModal(false, index, e.clientX, e.clientY);
                }}
                className="group flex w-full justify-between items-center py-[50px] px-[100px] border-t-[1px] border-t-[rgb(201,201,201)] cursor-pointer transition-all duration-200
              last:border-b-[1px] last:border-b-[rgb(201,201,201)] hover:opacity-50 max-desktopM:px-[70px]"
              >
                <h2 className="text-[45px] m-0 font-semibold text-[#222] transition-all duration-[0.4s] group-hover:-translate-x-[10px] max-desktopM:text-[40px]">
                  {t(`services.component.types.${service.service}`)}
                </h2>
                <p className="transition-all duration-[0.4s] font-medium group-hover:translate-x-[10px]">
                  <svg
                    stroke="black"
                    fill="black"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="pointer-events-none relative z-1 rotate-45 text-7xl text-black transition-all duration-[0.4s] ease-out group-hover:rotate-90"
                    height="0.6em"
                    width="0.6em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"></path>
                  </svg>
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <>
        <motion.div
          ref={modalContainer}
          variants={scaleAnimation}
          initial="initial"
          animate={active ? "enter" : "closed"}
          className="h-[350px] w-[400px] fixed top-1/2 left-1/2 bg-white pointer-events-none overflow-hidden z-[3]"
        >
          <div
            style={{ top: index * -100 + "%" }}
            className="h-full w-full relative transition-top duration-[0.5s] ease-[cubic-bezier(0.76,0,0.24,1)]"
          >
            {data.services?.map((service, index) => {
              const { color } = services[index];
              return (
                <div
                  className="h-full w-full flex items-center justify-center"
                  style={{ backgroundColor: color }}
                  key={`modal_${index}`}
                >
                  <img
                    src={`/src/assets/swiper/${index + 1}.jpg`}
                    width={300}
                    height={0}
                    alt="image"
                    className="h-auto"
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
        {["cursor", "cursorLabel"].map((text, key) => (
          <motion.div
            ref={cursor}
            className="w-[80px] h-[80px] rounded-[50%] bg-secondary text-white fixed z-[3] flex items-center justify-center text-[14px] font-medium pointer-events-none"
            variants={scaleAnimation}
            initial="initial"
            key={key}
            animate={active ? "enter" : "closed"}
          >
            {text == "cursorLabel" && t("services.component.view")}
          </motion.div>
        ))}
      </>
    </div>
  );
};

export default Services;
