import React, { useState } from "react";
import { Contact, Navbar, ParallaxScroll, Works } from "../components";

import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Modal } from "../components/index";
import { AnimatePresence } from "framer-motion";

const SERVICE = gql`
  query GetServices($service: String!, $locale: I18NLocaleCode) {
    services(filters: { service: { eq: $service } }, locale: $locale) {
      expertise {
        text
      }
      service
      text_images {
        url
      }
      parallax_images {
        url
      }
    }
    fallback: services(filters: { service: { eq: $service } }, locale: "en") {
      expertise {
        text
      }
      text_images {
        url
      }
      parallax_images {
        url
      }
    }
  }
`;

const Service = () => {
  const { i18n } = useTranslation();

  const [showModal, setShowModal] = useState(false);

  const close = () => setShowModal(false);
  const open = () => setShowModal(true);

  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  const { service } = useParams();
  const { loading, error, data } = useQuery(SERVICE, {
    variables: {
      service: service,
      locale: i18n.language === "am" ? "hy" : i18n.language,
    },
  });

  if (loading) return <p></p>;
  if (error) return <p>error</p>;

  let serviceData = data.services[0] || data.fallback[0];

  if (!serviceData) {
    return <p>No data available for this service.</p>;
  }

  return (
    <>
      <div className="bg-white text-black">
        <Navbar invert_colors={true} />
        <div className="w-full h-[120px] mb-[30px]"></div>
        <div className="relative">
          <Text serviceData={serviceData} service={service} />

          <ParallaxScroll
            service={service}
            service_page={true}
            images={serviceData?.parallax_images}
          />
          <Expertise
            data={serviceData?.expertise}
            showModal={showModal}
            close={close}
            open={open}
          />
          <Works service={service} />
          <Contact />
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {showModal && <Modal showModal={showModal} handleClose={close} />}
      </AnimatePresence>
    </>
  );
};

const Text = ({ serviceData, service }) => {
  const { t, i18n } = useTranslation();

  return (
    <div
      className="font-sometimestimes text-[5vw] leading-[1.2] pointer-events-none px-[64px] 
      max-_1440:!text-[7vw] max-_1080:px-[5%] max-_700:!text-[9vw] max-_550:!text-[9vw] max-_700:mb-[60px] max-_550:mb-[70px] max-_400:!text-[10vw]"
      style={i18n !== "en" && { fontSize: "4.5vw" }}
    >
      {["", "", "", ""].map((text, key) => (
        <span key={key} className="">
          <span>
            {t(`services.page.${service.toLowerCase()}.top_text.${key + 1}`)}
          </span>
          <HoverImage src={serviceData?.text_images[key]?.url} />
        </span>
      ))}
    </div>
  );
};

const Expertise = ({ data, showModal, close, open }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-[50px] mb-[70px] px-[64px] max-_700:px-[5%] max-_550:mt-[20px] max-_550:mb-[40px] max-_550:mt-[0]">
      <p
        className="uppercase text-5xl text-secondary font-[600] border-b-[1px] border-b-black pb-5 w-full pointer-events-none
      max-_900:text-4xl max-_550:text-3xl max-_550:text-[7vw] max-_400:text-[8vw]"
      >
        {t("services.page.expertise")}
      </p>
      <div className="flex flex-col items-end mb-[50px] max-_550:mb-[30px]">
        <ul className="w-[70%] pointer-events-none max-_700:w-[80%] max-_550:w-full">
          {data?.map((text, key) => (
            <li
              key={key}
              className="py-4 border-t-[1px] border-t-black flex first:border-t-0 text-lg max-_900:text-base max-_550:text-[15px] max-_400:text-sm"
            >
              <span>0{key + 1}</span>
              <span className="ml-16 max-_550:ml-12 max-_400:ml-6">
                {text.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center">
        <button
          className="group font-sometimestimes text-4xl font-[600] flex gap-2 max-_550:text-3xl"
          onClick={() => (showModal ? close() : open())}
        >
          <span>(</span>
          <div className="relative overflow-hidden">
            <div className="group-hover:translate-y-[-110%] transition duration-300">
              {t("services.page.learn_btn")}
            </div>
            <div className="translate-y-[110%] group-hover:translate-y-[0%] transition duration-300 absolute top-0 bottom-0 left-0 right-0">
              {t("services.page.learn_btn")}
            </div>
          </div>
          <span>)</span>
        </button>
      </div>
    </div>
  );
};

const HoverImage = ({ src }) => {
  return (
    <div
      className="relative inline-block mx-[40px] z-[1] aspect-video w-[7vw] h-[4vw] hover:z-[5] pointer-events-auto 
    max-_1280:mx-[30px] max-_1080:w-[9vw] max-_1080:h-[5vw] max-_550:w-[13vw] max-_550:h-[6vw] max-_400:mx-[20px] 
    max-_400:w-[15vw] max-_400:h-[8vw]"
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[7vw] h-[4vw] hover:w-[280px] hover:h-[208px]
        max-_1080:w-[9vw] max-_1080:h-[5vw] max-_550:w-[13vw] max-_550:h-[6vw] max-_400:w-[15vw] max-_400:h-[8vw]"
        style={{
          transition:
            "width .4s cubic-bezier(.32,.04,.08,1), height .4s cubic-bezier(.32,.04,.08,1)",
        }}
      >
        <div
          className="w-full h-full bg-secondary bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(http://localhost:1337/${src})` }}
        ></div>
      </div>
    </div>
  );
};

export default Service;
