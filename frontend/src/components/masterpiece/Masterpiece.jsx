import React from "react";

import { CenterImage, ParallaxImages } from "../index";

const SECTION_HEIGHT = 1400;

const Masterpiece = () => {
  return (
    <div className="relative">
      <div
        style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
        className="relative w-full"
      >
        <CenterImage SECTION_HEIGHT={SECTION_HEIGHT} />

        <ParallaxImages />
      </div>
    </div>
  );
};

export default Masterpiece;
