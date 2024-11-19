import React, { useEffect, useState, useRef } from "react";
// import { AnimatePresence, motion, useAnimation } from "framer-motion";
// import { mix, distance, wrap } from "@popmotion/popcorn";
// import {
//   colors,
//   center,
//   generateSize,
//   useAnimationLoop,
// } from "./imagetrailutils";
// import { useTranslation } from "react-i18next";
// import Modal from "../Modal";

import { useAnimate, motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";

const Random = () => {
  const [showModal, setShowModal] = useState(false);

  const close = () => setShowModal(false);
  const open = () => setShowModal(true);

  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  return (
    <div className="random relative h-[720px] w-full bg-[#080808] max-desktopM:h-[650px]">
      <div className="">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3] overflow-y-hidden">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{
              ease: "easeIn",
              y: { duration: 0.5, delay: 1 },
            }}
            variants={{
              visible: { y: 0 },
              hidden: { y: 110 },
            }}
            className="social__tag font-articulat cursor-pointer w-fit text-center hover:text-white max-desktopM:!text-[5.5vw]"
          >
            @aniebert_design
          </motion.h1>
        </div>
        <div className="absolute top-0 left-0 h-full w-full z-[3] pointer-events-none">
          <div className="absolute top-[70px] left-[120px] max-w-[400px] z-[3] pointer-events-none max-desktopM:left-[64px] max-desktopM:top-[40px]">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{
                ease: "easeIn",
                y: { duration: 0.3, delay: 0.3 },
                opacity: { delay: 0.3 },
              }}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 30 },
              }}
              className="text-[24px] font-[700] mb-4 capitalize"
            >
              Crafting inspiring residential & commercial spaces
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{
                ease: "easeIn",
                y: { duration: 0.5, delay: 0.5 },
                opacity: { delay: 0.5 },
              }}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 30 },
              }}
              className="text-[15px] opacity-70"
            >
              We design every project as a one-off
            </motion.p>
          </div>
          <div className="absolute bottom-[70px] right-[120px] max-w-[400px] pointer-events-none z-[3] max-desktopM:right-[64px] max-desktopM:bottom-[40px]">
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{
                ease: "easeIn",
                y: { duration: 0.3, delay: 0.3 },
                opacity: { delay: 0.3 },
              }}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 30 },
              }}
              className="text-[15px] opacity-70 cursor-default mb-7"
            >
              Fill out the form below if you want to order the project, ask for
              prices, or get an offer. Our team will contact you as soon as
              possible to clarify all the details.
            </motion.p>
            <motion.button
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{
                ease: "easeIn",
                y: { duration: 0.5, delay: 0.5 },
                opacity: { delay: 0.5 },
              }}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 30 },
              }}
              className="group pointer-events-auto"
              onClick={() => (showModal ? close() : open())}
            >
              <div className="bg-transparent border-[1px] cursor-pointer min-w-[220px] py-3 transition duration-200 group-hover:bg-white">
                <div className="relative overflow-hidden text-center text-[16px] font-[600]">
                  <div className="group-hover:translate-y-[-110%] transition duration-300">
                    Get in touch
                  </div>
                  <div className="text-black translate-y-[110%] group-hover:translate-y-[0%] transition duration-300 absolute top-0 bottom-0 left-0 right-0">
                    Get in touch
                  </div>
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
      <MouseImageTrail
        renderImageBuffer={220}
        images={[
          "/src/assets/trail/1.jpg",
          "/src/assets/trail/2.jpg",
          "/src/assets/trail/3.jpg",
          "/src/assets/trail/4.jpg",
          "/src/assets/trail/5.jpg",
          "/src/assets/trail/6.jpg",
          "/src/assets/trail/7.jpg",
          "/src/assets/trail/8.jpg",
          "/src/assets/trail/9.jpg",
          "/src/assets/trail/10.jpg",
          "/src/assets/trail/11.jpg",
          "/src/assets/trail/12.jpg",
          "/src/assets/trail/13.jpg",
        ]}
      >
      </MouseImageTrail>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && <Modal showModal={showModal} handleClose={close} />}
      </AnimatePresence>
    </div>
  );
};

const MouseImageTrail = ({ images, renderImageBuffer }) => {
  const [scope, animate] = useAnimate();

  const lastRenderPosition = useRef({ x: 0, y: 0 });
  const imageRenderCount = useRef(0);

  const handleMouseMove = (e) => {
    const target = e.target;

    const rect = target.getBoundingClientRect();

    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const distance = calculateDistance(
      clientX,
      clientY,
      lastRenderPosition.current.x,
      lastRenderPosition.current.y
    );

    if (distance >= renderImageBuffer) {
      lastRenderPosition.current.x = clientX;
      lastRenderPosition.current.y = clientY;

      renderNextImage();
    }
  };

  const calculateDistance = (x1, y1, x2, y2) => {
    const deltaX = x2 - x1;
    const deltaY = y2 - y1;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    return distance;
  };

  const renderNextImage = () => {
    const imageIndex = imageRenderCount.current % images.length;
    const selector = `[data-mouse-move-index="${imageIndex}"]`;

    const el = document.querySelector(selector);

    el.style.top = `${lastRenderPosition.current.y}px`;
    el.style.left = `${lastRenderPosition.current.x}px`;
    el.style.zIndex = imageRenderCount.current.toString();

    animate(
      selector,
      {
        opacity: [0, 1],
        transform: [
          `translate(-50%, -25%) 
          }`,
          `translate(-50%, -50%)`,
        ],
      },
      { type: "ease", damping: 20, stiffness: 200 }
    );

    animate(
      selector,
      {
        opacity: [1, 0],
      },
      { ease: "easeOut", duration: 0.5, delay: 0.5 }
    );

    imageRenderCount.current = imageRenderCount.current + 1;
  };

  return (
    <div
      ref={scope}
      className="relative overflow-hidden h-full"
      onMouseMove={(e) => handleMouseMove(e)}
    >
      {images.map((img, index) => (
        <div
          className="pointer-events-none absolute left-0 top-0 w-[250px] h-[312px] opacity-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${img})` }}
          key={index}
          data-mouse-move-index={index}
        />
      ))}
    </div>
  );
};

export default Random;
