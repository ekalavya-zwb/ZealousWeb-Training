import React, { useEffect, useState } from "react";
import styles from "../styles/WindowResize.module.css";

const WindowResize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className={styles.sizeContainer}>
        <h1>
          {size.width < 768
            ? "Mobile View"
            : size.width > 768 && size.width < 1024
              ? "Tablet View"
              : "Desktop View"}
        </h1>
        <p>
          {size.width}px x {size.height}px
        </p>
      </div>
    </>
  );
};

export default WindowResize;
