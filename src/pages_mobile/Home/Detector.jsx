import React, { useRef, useEffect } from "react";

const ScrollToEndDetector = ({ onEndReached, children }) => {
  const containerRef = useRef(null);

  const handleScroll = () => {
    const container = containerRef.current;

    // Check if the scroll position is at the bottom

    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight
    ) {
      // Call the onEndReached callback when the end is reached
      onEndReached();
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    // Attach the scroll event listener to the container
    container.addEventListener("scroll", handleScroll);

    return () => {
      // Remove the scroll event listener when the component is unmounted
      container.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div style={{ height: "100vh", overflow: "scroll" }} ref={containerRef}>
      {children}
    </div>
  );
};

export default ScrollToEndDetector;
