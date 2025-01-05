import React from "react";
import { Contact, Navbar, ParallaxScroll } from "../components";

import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

const SERVICE = gql`
  query GetServices($service: String!) {
    services(filters: { service: { eq: $service } }) {
      expertise {
        text
      }
      service
      documentId
    }
  }
`;

const Service = () => {
  const { service } = useParams();
  const { loading, error, data } = useQuery(SERVICE, {
    variables: { service: service },
  });

  if (loading) return <p></p>;
  if (error) return <p>error</p>;

  console.log(data);

  return (
    <div className="bg-white text-black">
      <Navbar invert_colors={true} />
      <div className="w-full h-[120px] mb-[30px]"></div>

      <div className="relative">
        <div className="font-sometimestimes text-[80px] leading-[1.2] pointer-events-none px-[64px]">
          We design
          <HoverImage num={1} />
          interiors equipped
          <HoverImage num={2} />
          to transform any space
          <HoverImage num={3} />
          into a functional and beautiful environment.
          <HoverImage num={4} />
        </div>
        <ParallaxScroll service_page={true} />
        <Expertise />
        <Contact />
      </div>
    </div>
  );
};

const Expertise = () => {
  return (
    <div className="my-[50px] px-[64px]">
      <p className="uppercase text-5xl font-[600] border-b-[1px] border-b-black pb-5 w-full pointer-events-none">
        Area of expertise
      </p>
      <div className="flex flex-col items-end">
        <ul className="w-[70%] pointer-events-none">
          {["", "", "", "", "", "", ""].map((text, key) => (
            <li
              key={key}
              className="py-4
            border-t-[1px] border-t-black first:border-t-0"
            >
              <span>0{key + 1}</span>
              <span className="ml-16">Finish, Lighting, Furniture Plans</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const HoverImage = ({ num }) => {
  return (
    <div className="relative inline-block mx-[40px] z-[1] w-[120px] h-[53px] hover:z-[5] pointer-events-auto">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[53px] hover:w-[280px] hover:h-[208px]"
        style={{
          transition:
            "width .4s cubic-bezier(.32,.04,.08,1), height .4s cubic-bezier(.32,.04,.08,1)",
        }}
      >
        <img
          src={`/src/assets/swiper/${num}.jpg`}
          className="w-full h-full bg-secondary object-fit"
        />
      </div>
    </div>
  );
};

export default Service;
