import React from "react";
import styles from "../styles/FetchEmployees.module.css";

const FetchRoutes = () => {
  return (
    <div className={styles.homepage}>
      <h1>Home page</h1>
      <h3>Employees: "/employees"</h3>
      <h3>Departments: "/departments"</h3>
    </div>
  );
};

export default FetchRoutes;
