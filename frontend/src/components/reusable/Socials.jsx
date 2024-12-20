import React from "react";

const Socials = () => {
  return (
    <ul className="flex gap-5">
      {["fb", "yt", "In", "be", "pi"].map((text, key) => (
        <li
          key={key}
          className="capitalize font-[600] text-[18px] cursor-pointer transition-opacity duration-200 hover:opacity-70"
        >
          {text}
        </li>
      ))}
    </ul>
  );
};

export default Socials;
