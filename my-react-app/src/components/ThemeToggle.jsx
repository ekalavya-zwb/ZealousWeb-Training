import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="btn-container">
      <button type="button" onClick={toggleTheme} className={`${theme}Btn`}>
        Switch to {theme === "light" ? "Dark Mode 🌙" : "Light Mode 🌞"}
      </button>
    </div>
  );
};

export default ThemeToggle;
