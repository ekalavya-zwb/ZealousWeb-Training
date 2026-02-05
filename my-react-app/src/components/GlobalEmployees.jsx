import React, { useContext } from "react";
import EmployeeContext from "../context/EmployeeContext";
import styles from "../styles/GlobalEmployees.module.css";

const GlobalEmployees = () => {
  const { employees, deleteEmployee, toggleEmployee } =
    useContext(EmployeeContext);

  return (
    <>
      <div className={styles.employeesContainer}>
        {employees.map((employee) => (
          <div key={employee.id} className={styles.employeeContainer}>
            <h3>{employee.name}</h3>
            <p>ID: {employee.id}</p>
            <p>Email: {employee.email}</p>
            <p>Role: {employee.role}</p>
            <p>Department: {employee.department}</p>
            <p>Salary: ${Number(employee.salary).toLocaleString()}</p>
            <p>Status: {employee.isActive ? "Active" : "Inactive"}</p>

            <div className={styles.btnContainer}>
              <button type="button" onClick={() => toggleEmployee(employee.id)}>
                Toggle Status
              </button>
              <button type="button" onClick={() => deleteEmployee(employee.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GlobalEmployees;
