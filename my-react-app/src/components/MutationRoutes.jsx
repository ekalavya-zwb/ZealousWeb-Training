import React from "react";
import styles from "../styles/FetchEmployees.module.css";

const MutationRoutes = () => {
  return (
    <div className={styles.homepage}>
      <h1>Home page</h1>
      <h3>Employees Table: "/employees"</h3>
      <h3>Add Employee: "/employees/add"</h3>
      {/* <h3>Edit Employee: "/employees/edit/:id"</h3> */}
    </div>
  );
};

export default MutationRoutes;
