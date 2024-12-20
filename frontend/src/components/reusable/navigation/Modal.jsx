import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

const Modal = ({ handleClose }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const [isClick, setIsClick] = useState(false);
  const [isOptionClick, setIsOptionClick] = useState(false);
  const [checkmarkChecked, setCheckmarkChecked] = useState("");

  const onCheckmarkChange = (text) => {
    setCheckmarkChecked(text);
  };

  const onSubmit = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error();
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    }
  };

  return (
    <div className="modal w-full h-full fixed top-0 left-0 z-[12] text-black !text-[#3a3e4b]">
      <motion.div
        className="absolute top-[75px] left-[197px] w-[calc(100%-394px)] h-[calc(100vh-150px)] py-[56px] px-[123px] 
        overflow-auto bg-[#f2f2f2] shadow-[0_2px_24px_rgba(0,0,0,.04)] z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="pb-[43px] mb-[6px] relative p-[44px_70px] w-full bg-white border-[1px_solid_rgba(0,0,0,.04)]">
            <p className="text-[22px] font-[600] text-center mb-[25px]">
              Make request
            </p>
            <div className="w-full h-full grid grid-cols-2 gap-x-[36px] gap-y-[26px] !text-[#3a3e4b]">
              {[
                { place: "Name", clean: "name" },
                { place: "Last Name", clean: "surname" },
                { place: "Phone", clean: "phone" },
                { place: "Your city", clean: "city" },
                { place: "Email", clean: "mail" },
                { place: "Property type", clean: "type" },
                { place: "Your comment", clean: "comment" },
              ].map((text, key) => (
                <div
                  className={`w-full h-auto relative py-[7px] mb-[7px] text-[12px] font-semibold ${
                    text.place == "Your comment" &&
                    "col-span-2 h-[29px] !pt-[5px] !pb-0 !mb-0"
                  }`}
                  style={
                    (text.place == "Name" && errors.surname) ||
                    (text.place == "Last Name" && errors.surname) ||
                    (text.place == "Phone" && errors.phone) ||
                    (text.place == "Your city" && errors.city) ||
                    (text.place == "Email" && errors.mail)
                      ? { borderBottom: "1px solid red" }
                      : { borderBottom: "1px solid hsla(0, 0%, 83.9%, .3)" }
                  }
                  key={key}
                >
                  {text.place !== "Your comment" &&
                  text.place !== "Property type" ? (
                    <input
                      {...register(text.clean, {
                        required: text !== "Your comment" ? true : false,
                        pattern:
                          text.place == "Email"
                            ? /^[a-z0-9._%+-]+@[a-z0-9._%+-]+\.[a-z]{2,4}$/
                            : "",
                      })}
                      type="text"
                      placeholder={text.place}
                      className="w-full outline-none"
                    />
                  ) : text.place == "Property type" ? (
                    <div
                      className="relative flex items-center cursor-pointer"
                      onClick={() => setIsClick(!isClick)}
                      onChange={() => setIsOptionClick(true)}
                    >
                      <select
                        {...register(text.clean, {
                          required: false,
                        })}
                        className="appearance-none w-full outline-none cursor-pointer"
                      >
                        {[
                          "All",
                          "Apartament",
                          "House",
                          "Commerce",
                          "Architecture",
                        ].map((text_option, key_option) => (
                          <option
                            value={text_option}
                            key={key_option}
                            className="!bg-white text-[13px]"
                          >
                            {text_option}
                          </option>
                        ))}
                      </select>
                      <div
                        className={`absolute top-0 left-0 bg-white text-[#9CA3AF] ${
                          isOptionClick ? "hidden" : null
                        } pointer-events-none`}
                      >
                        {text.place}
                      </div>
                      <IoIosArrowDown
                        style={isClick ? { transform: "rotate(-90deg)" } : null}
                        className="text-sm opacity-50 pointer-events-none transition-transform absolute right-3"
                      />
                    </div>
                  ) : text.place == "Your comment" ? (
                    <textarea
                      {...register(text.clean, {
                        required: false,
                      })}
                      typeof="textarea"
                      placeholder={text.place}
                      className="w-full h-full outline-none resize-none min-h-[28px]"
                      style={{
                        borderBottom: "1px solid hsla(0, 0%, 83.9%, .3)",
                      }}
                    ></textarea>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <div className="py-[43px] px-[69px] relative w-full bg-white border-[1px_solid_rgba(0,0,0,.04)]">
            <p className="text-[12px] font-semibold mb-[41px] text-left">
              Area (m²)
            </p>
            <div className="relative flex justify-between mb-[56px] before:content-[''] before:absolute before:top-1/2 before:left-[20px] before:w-[calc(100%-40px)] before:-translate-y-1/2 before:h-[1px] before:bg-[hsla(0,0%,83.9%,0.3)]">
              {[
                "to 50",
                "50-150",
                "150-250",
                "250-400",
                "400-600",
                "600-800",
                "1000+",
              ].map((text, key) => (
                <label
                  key={key}
                  className="relative p-[9px] cursor-pointer select-none"
                >
                  <p
                    className="absolute -top-[20px] left-1/2 text-[10px] text-center tracking-[0.06em] whitespace-nowrap 
                  text-gray-400 font-semibold -translate-x-1/2 transition-text duration-500 ease"
                  >
                    {text}
                  </p>
                  <input
                    {...register("checkmark", {
                      required: false,
                    })}
                    type="radio"
                    value={text}
                    onChange={() => onCheckmarkChange(text)}
                    checked={checkmarkChecked === text}
                    className="absolute opacity-0 cursor-pointer outline-none"
                  />
                  <span
                    className={`request__checkmark absolute top-0 left-0 h-[18px] w-[18px] bg-[#f7f7f6] rounded-full border-[1px] border-transparent 
                  transition-all duration-500 ease outline-none ${
                    checkmarkChecked === text ? "request_checked" : ""
                  }`}
                  ></span>
                </label>
              ))}
            </div>
            <div className="flex justify-center items-center">
              <button
                disabled={isSubmitting}
                type="submit"
                className="group bg-secondary text-white border-[1px] border-secondary cursor-pointer px-[58px] py-3 outline-none transition duration-200 hover:bg-white"
              >
                <div className="relative overflow-hidden text-center text-[16px] font-[600]">
                  <div className="group-hover:translate-y-[-110%] transition duration-300">
                    {isSubmitting ? "Loading..." : t(`navbar.send_request`)}
                  </div>
                  <div className="text-black translate-y-[110%] group-hover:translate-y-[0%] transition duration-300 absolute top-0 bottom-0 left-0 right-0">
                    {isSubmitting ? "Loading..." : t(`navbar.send_request`)}
                  </div>
                </div>
              </button>
            </div>
            {errors.root && (
              <div className="text-center mt-4 text-red-500 font-semibold text-[14px]">
                {errors.root.message}
              </div>
            )}
          </div>
        </form>
      </motion.div>
      <motion.div
        className="w-full h-full absolute top-0 left-0 bg-[rgba(26,27,32,.80)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      ></motion.div>
      <motion.div
        className="request__close absolute top-[17px] right-[18px] w-[61px] h-[61px] p-5 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      ></motion.div>
    </div>
  );
};

export default Modal;