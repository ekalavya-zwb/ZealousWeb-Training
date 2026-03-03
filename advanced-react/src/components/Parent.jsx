import React, { useRef } from "react";
import Modal from "./Modal";

const Parent = () => {
  const modalRef = useRef(null);

  console.log("Parent render");

  return (
    <>
      <button type="button" onClick={() => modalRef.current.open()}>
        Open Modal
      </button>

      <Modal ref={modalRef} />
    </>
  );
};

export default Parent;
