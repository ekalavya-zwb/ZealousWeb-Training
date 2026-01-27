import React from "react";
import styles from "../styles/EmployeeStatus.module.css";

const EmployeeStatus = ({
  f_name = "John",
  l_name = "Doe",
  email = "john.doe@company.com",
  salary = 60000,
  status = "Active",
  rating = 4.1,
}) => {
  const statusColor =
    status === "Active"
      ? "lightgreen"
      : status === "Inactive"
        ? "tomato"
        : status === "On Project"
          ? "dodgerblue"
          : status === "Available"
            ? "gold"
            : "";

  const category =
    salary >= 80000
      ? "High Earner"
      : salary >= 50000 && salary < 80000
        ? "Mid-level"
        : "Entry Level";

  const ratingColor =
    rating > 4.5
      ? "lightgreen"
      : rating >= 3.5 && rating <= 4.5
        ? "gold"
        : "tomato";

  const message =
    status === "Inactive"
      ? "report immediately!"
      : status === "Active"
        ? "just finished his project!"
        : status === "On Project"
          ? "is currently assigned to a project!"
          : status === "Available"
            ? "is available to take on projects!"
            : "";
  return (
    <div className={styles.EmployeeStatusCard}>
      <small style={{ backgroundColor: statusColor }}>
        {status.toUpperCase()}
      </small>
      <h2>Employee</h2>
      <p>
        {f_name} {l_name}
      </p>
      <p>{email}</p>
      <p>${salary.toLocaleString()}</p>
      <p style={{ fontWeight: "bold", marginBottom: "5px" }}>{category}</p>
      <span style={{ backgroundColor: ratingColor }}>Performance</span>
      <p style={{ marginTop: "5px" }}>
        {f_name} {l_name} {message}
      </p>
    </div>
  );
};

export default EmployeeStatus;
