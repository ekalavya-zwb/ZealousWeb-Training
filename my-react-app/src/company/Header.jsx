import React from "react";
import "./styles/Header.css";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="navbar">
          <a href="#">Home</a>
          <a href="#">Employees</a>
          <a href="#">Departments</a>
          <a href="#">Stats</a>
          <a href="#">Contact</a>
        </div>
      </header>
    </>
  );
};

export default Header;
