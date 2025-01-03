import React from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components";

const Service = () => {
  const { service } = useParams();

  console.log(service);

  return (
    <div className="bg-white text-black">
      <Navbar invert_colors={true} />
    </div>
  );
};

export default Service;
