import React from "react";
import { useTranslation } from "react-i18next";
import useLocaleData from "../useLocaleData";

const About = () => {
  const { t, i18n } = useTranslation();

  const { data: currentLocaleData, error: currentLocaleError } = useLocaleData(
    i18n.language
  );

  const { data: englishLocaleData } = useLocaleData("en");

  if (currentLocaleError) return <p>Error loading data for current locale</p>;
  if (!currentLocaleData && !englishLocaleData) return <p></p>;

  let about = currentLocaleData?.about || englishLocaleData?.about;

  if (!about) {
    return <p>No data available for this service.</p>;
  }

  return (
    <div
      className="flex flex-col items-end pb-[5vw] pr-[10vw] mt-[70px] 
    max-_1080:px-[5%] max-_1080:pb-[104px] max-_700:pb-[50px] max-_700:mt-[50px]"
    >
      <div
        className="grid grid-cols-[26vw_35vw] gap-x-[9vw] 
      max-_1080:grid-cols-2 max-_1080:gap-x-[92px] max-_700:flex max-_700:flex-col-reverse"
      >
        <div
          className="block self-start row-[1/3] col-[2/3] w-full relative overflow-hidden
        after:content-[''] after:block after:w-full after:h-0 after:pt-[120%] max-_1440:after:pt-[150%] max-_700:after:pt-[80%] 
        max-_550:after:pt-[120%]"
        >
          <img
            src={`/assets/team/founder.jpg`}
            className="block w-full h-full bg-secondary absolute top-0 left-0 object-cover"
          />
        </div>
        <div className="row-[1/2] col-[1/2] max-_700:mb-[40px]">
          <p
            className="mt-[2.7vw] font-[700] text-[42px] leading-[44px] whitespace-nowrap w-0
          max-_1080:mt-0 max-_1080:text-[35px] max-_1080:leading-[39px] max-_550:text-[28px] max-_550:leading-[32px]"
          >
            {t("about.component.name")}
          </p>
          <p className="mt-[2.2vw] font-[600] max-_1080:mt-[16px] max-_700:text-[15px] max-_700:mt-[12px]">
            {t("about.component.founder")}
          </p>
          <p
            className="mt-[3.6vw] relative text-[#080808] leading-[170%] text-lg 
            max-_1280:before:text-[32px] max-_1080:mt-[32px] max-_1080:before:static max-_900:text-base 
            max-_700:text-lg max-_700:mt-[25px] max-_700:before:leading-[39px] max-_550:text-base max-_400:text-sm
          before:content-['\201C'] before:block before:absolute before:right-[calc(100%+1.1vw)] before:font-[700] before:text-[2.5vw] before:leading-[3vw]"
          >
            {about.paragraph}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
