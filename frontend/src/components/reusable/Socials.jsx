import React from "react";
import { Link } from "react-router-dom";

const Socials = () => {
  return (
    <ul className="flex gap-5">
      {["fb", "yt", "In"].map((text, key) => (
        <li
          key={key}
          className="capitalize font-[600] text-[18px] cursor-pointer transition-opacity duration-200 hover:opacity-70"
        >
          <Link
            to={
              text == "fb"
                ? "https://www.facebook.com/fivehdesign"
                : text == "In"
                ? "https://www.instagram.com/aniebert_design/"
                : ""
            }
          >
            {text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Socials;
