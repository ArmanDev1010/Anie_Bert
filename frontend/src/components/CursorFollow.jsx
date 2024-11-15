import React, { useEffect, useRef } from "react";

const CursorFollow = () => {
  const mainCursor = useRef(null);

  useEffect(() => {
    window.addEventListener("mousemove", (event) => {
      const { clientX, clientY } = event;

      const mouseX = clientX;
      const mouseY = clientY;

      mainCursor.current.style.transform = `translate3d(${
        mouseX - mainCursor.current.clientWidth / 2
      }px, ${mouseY - mainCursor.current.clientHeight / 2}px, 0)`;
    });

    return () => {};
  }, []);
  return <div className="main-cursor" ref={mainCursor}></div>;
};

export default CursorFollow;
