import { useEffect } from "react";
import ReactDOM from "react-dom";

const MyModal = ({ handleCloseModal, children }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [handleCloseModal]);

  return ReactDOM.createPortal(
    <>
      <div
        className="fixed top-0 right-0 bottom-0 left-0 bg-[rgba(189,189,189,0.9)]"
        onClick={handleCloseModal}
      ></div>
      <div className="absolute top-1/2 left-1/2 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-white p-10 shadow-xl">
        {children}
      </div>
    </>,
    document.querySelector(".myModalDiv"),
  );
};

export default MyModal;
