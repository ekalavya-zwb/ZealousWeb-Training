import React, { useState, useRef } from "react";
import CustomModal from "./CustomModal";

function Guardian() {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  return (
    <div>
      <h2>Modal Controller</h2>

      <button onClick={() => setOpen(true)}>Open Modal</button>

      <button onClick={() => modalRef.current?.closeBtn()}>
        Focus Close Button
      </button>

      <button onClick={() => modalRef.current?.confirmBtn()}>
        Focus Confirm Button
      </button>

      <button onClick={() => modalRef.current?.denyBtn()}>
        Focus Deny Button
      </button>

      <CustomModal ref={modalRef} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export default Guardian;
