import React from "react";
import useFetch from "./useFetch";
import styles from "../styles/FetchEmployees.module.css";

const FetchDepartments = () => {
  const { data, error, loading, refetch } = useFetch(
    `${import.meta.env.VITE_API_URL}/departments`,
  );

  if (loading) return <p className={styles.loading}>Loading Departments...</p>;
  if (error) alert(error);

  return (
    <>
      <button onClick={refetch}>Refresh</button>
      <div className={styles.employeeTable}>
        <table border={2}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Department</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dept) => (
              <tr key={dept.dept_id}>
                <td>{dept.dept_id}</td>
                <td>{dept.dept_name}</td>
                <td>{dept.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default FetchDepartments;
