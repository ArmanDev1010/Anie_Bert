import sync, { cancelSync } from "framesync";
import { useEffect } from "react";
import { createExpoIn, reversed } from "@popmotion/easing";

export const powerOut4 = reversed(createExpoIn(4));

export const useAnimationLoop = callback => {
  useEffect(() => {
    sync.update(callback, true);
    return () => cancelSync.update(callback);
  }, [callback]);
};

export const center = (_, generated: string) =>
  `translate(-50%, -50%) ${generated}`;

// Emulate slightly different image ratios by randomly generating size
const generateNumber = (base, range) => {
  return base - range / 2 + Math.round(Math.random() * range);
};
export const generateSize = () => ({
  height: generateNumber(312, 70),
  width: generateNumber(250, 50)
});

// Instead of using images just use color placeholders.
const placeholderColors: Set<number> = new Set();

for (let i = 1; i < 16; i++) {
  placeholderColors.add(i);
}

export const colors = Array.from(placeholderColors);