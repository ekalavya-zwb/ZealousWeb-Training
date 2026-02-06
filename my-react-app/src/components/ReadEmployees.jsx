import React, { useState } from "react";
import useEmployee from "./useEmployee";
import styles from "../styles/FetchEmployees.module.css";

const ReadEmployees = () => {
  const { employees, error, loading, refetch } = useEmployee(
    `${import.meta.env.VITE_API_URL}/employees`,
  );

  const [deletingId, setDeletingId] = useState(null);

  const formatDate = (isoStr) => isoStr.split("T")[0];

  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    setDeletingId(id);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/employees/${id}`,
        { method: "DELETE" },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete employee with status ${response.status}`,
        );
      }

      refetch();
    } catch (error) {
      alert(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p className={styles.loading}>Loading Employees...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.first_name}</td>
              <td>{employee.last_name}</td>
              <td>{employee.email}</td>
              <td>${employee.salary}</td>
              <td>{formatDate(employee.hire_date)}</td>
              <td>{employee.dept_id}</td>
              <td>{employee.state}</td>
              <td>
                <button onClick={() => deleteEmployee(employee.id)}>
                  {employee.id === deletingId ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadEmployees;
