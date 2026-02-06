import React from "react";
import useFetch from "./useFetch";
import styles from "../styles/FetchEmployees.module.css";

const FetchEmployees = () => {
  const { data, error, loading, refetch } = useFetch(
    `${import.meta.env.VITE_API_URL}/employees`,
  );

  const formatDate = (isoStr) => isoStr.split("T")[0];

  if (loading) return <p className={styles.loading}>Loading Employees...</p>;
  if (error) alert(error);

  return (
    <>
      <button onClick={refetch}>Refresh</button>
      <div className={styles.employeeTable}>
        <table border={2}>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Salary</th>
              <th>Hire Date</th>
              <th>Department ID</th>
              <th>State</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>${user.salary}</td>
                <td>{formatDate(user.hire_date)}</td>
                <td>{user.dept_id}</td>
                <td>{user.state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FetchEmployees;
