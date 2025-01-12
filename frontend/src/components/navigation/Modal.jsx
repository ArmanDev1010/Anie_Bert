import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

const Modal = ({ handleClose }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const [isClick, setIsClick] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [checkmarkChecked, setCheckmarkChecked] = useState("");
  const [message, setMessage] = useState("");

  const propertyTypes = [
    "All",
    "Apartament",
    "House",
    "Commerce",
    "Architecture",
  ];

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setIsClick(false);
  };

  const onCheckmarkChange = (text) => setCheckmarkChecked(text);

  const onSubmit = async (data) => {
    try {
      const serviceID = "service_lk8k0rh";
      const templateID = "template_l1k50wi";
      const userID = "k6fROXlY1FLRa-z7f";

      data.type = selectedType;

      const templateParams = {
        to_email: "info@aniebert.com",
        ...data,
        checkmark: checkmarkChecked,
      };

      await emailjs.send(serviceID, templateID, templateParams, userID);
      setMessage(t("modal.request.success"));
    } catch (error) {
      setError("root", { message: t("modal.request.error") });
      setMessage(t("modal.request.error"));
    }
  };

  const fields = [
    { place: "Name", clean: "name" },
    { place: "Last Name", clean: "surname" },
    { place: "Phone", clean: "phone" },
    { place: "Your city", clean: "city" },
    { place: "Email", clean: "mail" },
    { place: "Property type", clean: "type" },
    { place: "Your comment", clean: "comment", isComment: true },
  ];

  const fieldStyle = (field) => ({
    borderBottom: errors[field.clean]
      ? "1px solid red"
      : "1px solid hsla(0, 0%, 83.9%, .3)",
  });

  return (
    <div className="modal fixed top-0 left-0 w-full h-full z-[12] text-[#3a3e4b]">
      <motion.div
        className="absolute top-[75px] left-[197px] w-[calc(100%-394px)] h-[calc(100vh-150px)] py-[56px] px-[123px] overflow-auto bg-[#f2f2f2] shadow-[0_2px_24px_rgba(0,0,0,.04)] z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-[44px_70px] pb-[43px] mb-[6px] bg-white border border-[rgba(0,0,0,.04)]">
            <p className="text-[22px] font-[600] text-center mb-[25px]">
              {t("modal.make_request")}
            </p>
            <div className="grid grid-cols-2 gap-x-[36px] gap-y-[26px]">
              {fields.map(({ place, clean, isComment }, key) => (
                <div
                  key={key}
                  className={`w-full py-[7px] mb-[7px] text-[12px] font-semibold ${
                    isComment ? "col-span-2 h-[29px] !pt-[5px] !pb-0 !mb-0" : ""
                  }`}
                  style={fieldStyle({ place, clean })}
                >
                  {renderField({
                    place,
                    clean,
                    isComment,
                    t,
                    register,
                    errors,
                    selectedType,
                    isClick,
                    setIsClick,
                    handleTypeSelect,
                    propertyTypes,
                  })}
                </div>
              ))}
            </div>
          </div>
          <div className="py-[43px] px-[69px] bg-white border border-[rgba(0,0,0,.04)]">
            <p className="text-[12px] font-semibold mb-[41px]">
              {t("modal.fields.area")}
            </p>
            <div
              className="relative flex justify-between mb-[56px] 
            before:content-[''] before:absolute before:top-1/2 before:left-[20px] before:w-[calc(100%-40px)] before:-translate-y-1/2 before:h-[1px] before:bg-[hsla(0,0%,83.9%,0.3)]"
            >
              {[
                "to 50",
                "50-150",
                "150-250",
                "250-400",
                "400-600",
                "600-800",
                "1000+",
              ].map((text, key) => (
                <Checkmark
                  key={key}
                  text={text}
                  checkmarkChecked={checkmarkChecked}
                  onCheckmarkChange={onCheckmarkChange}
                  register={register}
                />
              ))}
            </div>
            <div className="flex justify-center items-center">
              <button
                disabled={isSubmitting}
                type="submit"
                className="group bg-secondary text-white border border-secondary px-[58px] py-3 transition duration-200 hover:bg-white"
              >
                <div className="relative overflow-hidden text-[16px] font-[600]">
                  <div className="group-hover:-translate-y-[110%] transition duration-300">
                    {isSubmitting ? "Loading..." : t("modal.send_request")}
                  </div>
                  <div className="text-black translate-y-[110%] group-hover:translate-y-0 transition duration-300 absolute inset-0">
                    {isSubmitting ? "Loading..." : t("modal.send_request")}
                  </div>
                </div>
              </button>
            </div>
            {errors.root && (
              <div className="text-center mt-4 text-red-500 font-semibold text-[14px]">
                {errors.root.message}
              </div>
            )}
            {message && (
              <div
                className="text-center mt-5 font-semibold text-[18px]"
                style={{ color: !errors.root ? "green" : "red" }}
              >
                {message}
              </div>
            )}
          </div>
        </form>
      </motion.div>
      <motion.div
        className="fixed inset-0 bg-[rgba(26,27,32,.80)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      ></motion.div>
      <motion.div
        className="absolute top-[17px] right-[18px] w-[61px] h-[61px] p-5 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      ></motion.div>
    </div>
  );
};

const renderField = ({
  place,
  clean,
  isComment,
  t,
  register,
  errors,
  selectedType,
  isClick,
  setIsClick,
  handleTypeSelect,
  propertyTypes,
}) => {
  if (isComment)
    return (
      <textarea
        {...register(clean)}
        placeholder={t("modal.fields.comment")}
        className="w-full outline-none resize-none min-h-[28px]"
        style={{ borderBottom: "1px solid hsla(0, 0%, 83.9%, .3)" }}
      />
    );
  if (place === "Property type") {
    return (
      <div
        className="relative flex items-center cursor-pointer"
        onClick={() => setIsClick(!isClick)}
      >
        <input type="hidden" {...register("type")} value={selectedType} />
        <span style={selectedType ? { color: "black" } : { color: "#A0A6B2" }}>
          {selectedType
            ? t(`modal.property_types.${selectedType.toLowerCase()}`)
            : t("modal.fields.type")}
        </span>
        <IoIosArrowDown
          style={isClick ? { transform: "rotate(-90deg)" } : null}
          className="text-sm opacity-50 absolute right-3"
        />
        {isClick && (
          <div className="absolute left-0 right-0 top-full mt-2 bg-white shadow-lg z-10">
            {propertyTypes.map((type, index) => (
              <div
                key={index}
                onClick={() => handleTypeSelect(type)}
                className="py-2 px-4 cursor-pointer hover:bg-gray-100"
              >
                {t(`modal.property_types.${type.toLowerCase()}`)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  return (
    <input
      {...register(clean, {
        required: !isComment,
        pattern:
          place === "Email"
            ? /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
            : undefined,
      })}
      type="text"
      placeholder={t(`modal.fields.${clean}`)}
      className="w-full outline-none"
    />
  );
};

const Checkmark = ({ text, checkmarkChecked, onCheckmarkChange, register }) => (
  <label className="relative !h-[18px] !w-[18px] cursor-pointer select-none">
    <p className="!font-montserrat absolute -top-[20px] left-1/2 text-[10px] text-center tracking-[0.06em] whitespace-nowrap text-gray-400 font-semibold -translate-x-1/2 transition-text duration-500 ease">
      {text}
    </p>
    <input
      {...register("checkmark")}
      type="radio"
      value={text}
      onChange={() => onCheckmarkChange(text)}
      checked={checkmarkChecked === text}
      className="opacity-0 absolute cursor-pointer outline-none"
    />
    <span
      className={`request__checkmark absolute top-0 left-0 h-[18px] w-[18px] bg-[#f7f7f6] rounded-full border-[1px] border-transparent transition-all duration-500 ease outline-none ${
        checkmarkChecked === text ? "request_checked" : ""
      }`}
    ></span>
  </label>
);

export default Modal;
