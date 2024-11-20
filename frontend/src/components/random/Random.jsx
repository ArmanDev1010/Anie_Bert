import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { mix, distance, wrap } from "@popmotion/popcorn";
import {
  colors,
  center,
  generateSize,
  useAnimationLoop,
} from "./imagetrailutils";
import { useTranslation } from "react-i18next";
import Modal from "../Modal";

const ImagePlaceholder = ({ position, color }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (!position) return;
    const { xOrigin, x, yOrigin, y } = position;
    controls.start({
      x: [xOrigin, x, x],
      y: [yOrigin, y, y],
      opacity: [1, 1, 0],
      scale: [1, 1, 0.2],
      transition: {
        duration: 0.8,
        ease: ["easeOut"],
        times: [0, 0.7, 1],
      },
    });
  }, [position]);

  const style = position ? position.style : {};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={controls}
      transformTemplate={center}
      style={{
        backgroundImage: `url(/src/assets/trail/${color}.jpg)`,
        ...style,
      }}
      className="w-[250px] h-[312px] absolute top-0 left-0 bg-cover bg-center bg-no-repeat"
    />
  );
};

const Random = ({ codename, distanceThreshold = 140 }) => {
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);

  const close = () => setShowModal(false);
  const open = () => setShowModal(true);

  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  const mouseInfo = useRef({
    now: { x: 0, y: 0 },
    prev: { x: 0, y: 0 },
    prevImage: { x: 0, y: 0 },
  }).current;

  const imagePositions = useRef([]);

  const [index, setIndex] = useState(0);

  useAnimationLoop(() => {
    const mouseDistance = distance(mouseInfo.now, mouseInfo.prevImage);

    mouseInfo.prev = {
      x: mix(mouseInfo.prev.x || mouseInfo.now.x, mouseInfo.now.x, 0.1),
      y: mix(mouseInfo.prev.y || mouseInfo.now.y, mouseInfo.now.y, 0.1),
    };

    if (mouseDistance > distanceThreshold) {
      const newIndex = index + 1;
      const imageIndex = wrap(0, colors.length - 1, newIndex);

      imagePositions.current[imageIndex] = {
        xOrigin: mouseInfo.prev.x,
        yOrigin: mouseInfo.prev.y,
        x: mouseInfo.now.x,
        y: mouseInfo.now.y,
        style: {
          ...generateSize(),
          zIndex: imageIndex,
        },
      };

      mouseInfo.prevImage = mouseInfo.now;

      setIndex(newIndex);
    }
  });

  function relativeCoords(e) {
    const target = e.target;

    // Get the bounding rectangle of target
    const rect = target.getBoundingClientRect();

    // Mouse position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseInfo.now = {
      x: e.pageX,
      y: y,
    };
  }

  return (
    <>
      <div className="random relative overflow-hidden relative w-full h-[720px] text-white bg-[#080808] max-desktopM:h-[600px]">
        <div
          className="w-full h-full relative z-[2]"
          onMouseMove={(e) => relativeCoords(e)}
        >
          {colors.map((color, i) => (
            <ImagePlaceholder
              position={imagePositions.current[i]}
              color={color}
              key={color}
              codename={codename}
            />
          ))}
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3] overflow-y-hidden">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{
              ease: "easeIn",
              y: { duration: 0.5, delay: 0.4 },
              opacity: { delay: 0.5 },
            }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 60 },
            }}
            className="social__tag font-articulat cursor-pointer w-fit text-center hover:text-white max-desktopM:!text-[4.2vw]"
          >
            @aniebert_design
          </motion.h1>
        </div>
        <div className="absolute top-0 left-0 h-full w-full pointer-events-non">
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
          <div className="absolute bottom-[70px] right-[120px] max-w-[400px] !pointer-events-auto z-[3] max-desktopM:right-[64px] max-desktopM:bottom-[40px]">
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
              className="group"
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
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat opacity-20 z-[0]"
          style={{ backgroundImage: "url(/src/assets/square-grid.png)" }}
        ></div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && <Modal showModal={showModal} handleClose={close} />}
      </AnimatePresence>
    </>
  );
};

export default Random;
