import React, { useRef, useImperativeHandle, forwardRef } from "react";
import "../styles/CustomModal.css";

const CustomModal = forwardRef(({ open, onClose }, ref) => {
  const closeRef = useRef(null);
  const confirmRef = useRef(null);
  const denyRef = useRef(null);

  useImperativeHandle(ref, () => ({
    closeBtn() {
      closeRef.current?.focus();
    },
    confirmBtn() {
      confirmRef.current?.focus();
    },
    denyBtn() {
      denyRef.current?.focus();
    },
  }));

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button ref={closeRef} className="close-btn" onClick={onClose}>
          &times;
        </button>

        <h2 className="modal-title">Confirm Action</h2>

        <h3>Are you sure?</h3>

        <div className="modal-actions">
          <button ref={confirmRef}>Confirm</button>
          <button ref={denyRef}>Deny</button>
        </div>
      </div>
    </div>
  );
});

export default CustomModal;
