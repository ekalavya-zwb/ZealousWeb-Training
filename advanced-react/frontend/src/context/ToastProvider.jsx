import ToastContext from "./ToastContext";
import { useState, useCallback } from "react";
import { createPortal } from "react-dom";
import ToastContainer from "../components/ToastContainer";

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const addToast = useCallback((message, type = "info", duration = 3000) => {
    const id = Date.now();

    const newToast = { id, message, type };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}

      {createPortal(
        <ToastContainer toasts={toasts} removeToast={removeToast} />,
        document.getElementById("toast-root"),
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
