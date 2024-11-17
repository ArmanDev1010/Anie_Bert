import React from "react";

import { CenterImage, ParallaxImages } from "../index";

const SECTION_HEIGHT = 1700;

const Masterpiece = () => {
  return (
    <div className="relative">
      <div
        style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
        className="relative w-full"
      >
        <CenterImage SECTION_HEIGHT={SECTION_HEIGHT} />

        <ParallaxImages />

        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
      </div>
    </div>
  );
};

export default Masterpiece;
