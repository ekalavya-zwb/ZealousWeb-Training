import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";
import EmployeeProvider from "./context/EmployeeProvider.jsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider>
      <EmployeeProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </EmployeeProvider>
    </ThemeProvider>
  </BrowserRouter>,
);
