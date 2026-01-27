import React from "react";
import { Link, Outlet } from "react-router-dom";
import CarProducts from "./CarProducts";
import BikeProducts from "./BikeProducts";
import "../company/styles/Header.css";

const Products = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Products page</h1>
      <div className="navbar">
        <Link to="/products/cars">Cars</Link>
        <Link to="/products/bikes">Bikes</Link>
      </div>
      <Outlet />
    </>
  );
};

export default Products;
