import React from "react";
import { useTranslation } from "react-i18next";
import { IoLocationSharp } from "react-icons/io5";

const Contact = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white relative w-full pt-[85px] pb-[185px] px-[210px] text-black">
      <div className="pointer-events-none mb-[63px]">
        <p className="uppercase text-5xl font-[700] mb-5">Contact us</p>
        <p className="max-w-[390px] text-gray-700">
          For cooperation or if you have any questions for us.
          info.aniebert@gmail.com
        </p>
      </div>
      <ul className="flex gap-28 items-center mb-[63px]">
        {["socials", "location", "phone", "email"].map((text, key) => (
          <li key={key} className="">
            {text == "socials" ? (
              <ul className="flex gap-5">
                {["fb", "In", "be", "pi"].map((text, key) => (
                  <li
                    key={key}
                    className="capitalize font-[600] text-[18px] cursor-pointer transition-opacity duration-200 hover:opacity-70"
                  >
                    {text}
                  </li>
                ))}
              </ul>
            ) : text == "location" ? (
              <div
                className="rounded-full py-1.5 px-5 border border-white cursor-pointer flex items-center gap-3 font-[500]
                    transition-text duration-300 hover:text-gray-500"
              >
                <IoLocationSharp className="text-[17px]" />
                <span className="capitalize">Davit 54 of Sasuntsi</span>
              </div>
            ) : (
              <p className="font-[600] tracking-[1px] text-[15px] cursor-pointer transition-opacity duration-200 hover:opacity-70">
                {t(`navbar.${text}`)}
              </p>
            )}
          </li>
        ))}
      </ul>
      <button
        onClick={() => (showModal ? close() : open())}
        className="group bg-transparent border-[1px] border-black cursor-pointer px-[58px] py-3 outline-none transition duration-200 hover:bg-black"
      >
        <div className="pointer-events-none relative overflow-hidden text-center text-[16px] font-[600]">
          <div className="group-hover:translate-y-[-110%] transition duration-300">
            Send us a message
          </div>
          <div className="text-white translate-y-[110%] group-hover:translate-y-[0%] transition duration-300 absolute top-0 bottom-0 left-0 right-0">
            Send us a message
          </div>
        </div>
      </button>
      <div className="absolute bottom-1 left-0 w-full h-[60px] flex justify-between items-center px-[64px] pb-[29px]">
        <p className="text-[14px] pointer-events-none">
          © Copyright 2024. All rights reserved
        </p>
        <p className="cursor-pointer">
          Designed by <span className="font-semibold">Arman Manukyan</span>
        </p>
      </div>
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none bg-cover bg-no-repeat opacity-20 z-[0]"
        style={{ backgroundImage: "url(/src/assets/grid-crosshairs.png)" }}
      ></div>
    </div>
  );
};

export default Contact;
