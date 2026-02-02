import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import Home from "../basicRouter/Home.jsx";
import About from "../basicRouter/About.jsx";
import Contact from "../basicRouter/Contact.jsx";
import styles from "../styles/NavigationBar.module.css";

const NavigationBar = () => {
  return (
    <>
      <div className={styles.navbar}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default NavigationBar;
