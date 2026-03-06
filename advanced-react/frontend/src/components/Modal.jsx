import React, {
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

import "../styles/Modal.css";

const Modal = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);

  useImperativeHandle(ref, () => ({
    open() {
      setIsOpen(true);
    },
    close() {
      setIsOpen(false);
    },
    toggle() {
      setIsOpen((prev) => !prev);
    },
  }));

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleTab = (event) => {
      if (event.key !== "Tab") return;

      if (event.shiftKey) {
        if (document.activeElement === firstFocusableRef.current) {
          event.preventDefault();
          lastFocusableRef.current.focus();
        }
      } else {
        if (document.activeElement === lastFocusableRef.current) {
          event.preventDefault();
          firstFocusableRef.current.focus();
        }
      }
    };

    window.addEventListener("keydown", handleTab);

    return () => window.removeEventListener("keydown", handleTab);
  }, [isOpen]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    const { offsetWidth, offsetHeight } = modal;

    modal.style.position = "fixed";
    modal.style.left = `calc(50% - ${offsetWidth / 2}px)`;
    modal.style.top = `calc(50% - ${offsetHeight / 2}px)`;
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const modal = modalRef.current;
    modal.classList.add("modal-enter");

    return () => {
      modal.classList.remove("modal-enter");
    };
  }, [isOpen]);

  if (!isOpen) return;

  return (
    <div className="overlay">
      <div className="modal" ref={modalRef}>
        <button ref={firstFocusableRef}>First Button</button>
        <input placeholder="Type here" />
        <button ref={lastFocusableRef}>Last Button</button>
      </div>
    </div>
  );
});

export default Modal;
