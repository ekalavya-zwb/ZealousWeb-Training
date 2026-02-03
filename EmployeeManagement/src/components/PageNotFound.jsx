import React from "react";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="error404">
      <h2>404 – Page Not Found!</h2>
      <NavLink to="/">Go Back</NavLink>
    </div>
  );
};

export default PageNotFound;
