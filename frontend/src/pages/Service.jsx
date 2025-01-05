import React from "react";
import { Contact, Navbar, ParallaxScroll, Works } from "../components";

import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SERVICE = gql`
  query GetServices($service: String!) {
    services(filters: { service: { eq: $service } }) {
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
  }
`;

const Service = () => {
  const { t } = useTranslation();

  const { service } = useParams();
  const { loading, error, data } = useQuery(SERVICE, {
    variables: { service: service },
  });

  if (loading) return <p></p>;
  if (error) return <p>error</p>;

  const service_ = data.services[0];

  return (
    <div className="bg-white text-black">
      <Navbar invert_colors={true} />
      <div className="w-full h-[120px] mb-[30px]"></div>

      <div className="relative">
        <div className="font-sometimestimes text-[5vw] leading-[1.2] pointer-events-none px-[64px]">
          {["", "", "", ""].map((text, key) => (
            <span key={key}>
              {t(`services.${service.toLowerCase()}.top_text.${key + 1}`)}
              <HoverImage src={service_.text_images[key].url} />
            </span>
          ))}
        </div>
        <ParallaxScroll
          service={service}
          service_page={true}
          images={service_.parallax_images}
        />
        <Expertise data={service_.expertise} />
        <Works />
        <Contact />
      </div>
    </div>
  );
};

const Expertise = ({ data }) => {
  return (
    <div className="my-[50px] px-[64px]">
      <p className="uppercase text-5xl font-[600] border-b-[1px] border-b-black pb-5 w-full pointer-events-none">
        Area of expertise
      </p>
      <div className="flex flex-col items-end">
        <ul className="w-[70%] pointer-events-none">
          {data.map((text, key) => (
            <li
              key={key}
              className="py-4
            border-t-[1px] border-t-black first:border-t-0"
            >
              <span>0{key + 1}</span>
              <span className="ml-16">{text.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const HoverImage = ({ src }) => {
  return (
    <div className="relative inline-block mx-[40px] z-[1] aspect-video w-[120px] h-[53px] hover:z-[5] pointer-events-auto">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[53px] hover:w-[280px] hover:h-[208px]"
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
