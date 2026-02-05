import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";
import EmployeeProvider from "./context/EmployeeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <EmployeeProvider>
        <App />
      </EmployeeProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
