import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import PostCardProvider from "./provider/PostCardProvider.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <PostCardProvider>
        <App />
      </PostCardProvider>
    </BrowserRouter>
  </StrictMode>,
);
