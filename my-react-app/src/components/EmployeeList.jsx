import React from "react";
import styles from "../styles/EmployeeList.module.css";

const EmployeeList = () => {
  const employees = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      department: "Engineering",
      salary: 85000,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@company.com",
      department: "Marketing",
      salary: 72000,
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@company.com",
      department: "Finance",
      salary: 90000,
    },
    {
      id: 4,
      name: "Emily Johnson",
      email: "emily.johnson@company.com",
      department: "Human Resources",
      salary: 68000,
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@company.com",
      department: "Sales",
      salary: 75000,
    },
    {
      id: 6,
      name: "Sophia Martinez",
      email: "sophia.martinez@company.com",
      department: "Product",
      salary: 95000,
    },
  ];

  let total = 0;

  for (let employee of employees) {
    total += employee.salary;
  }

  const message = employees.length === 0 ? "No employees found" : "";
  return (
    <>
      <input type="text" id="search" placeholder="Search for employees..." />
      <h2 style={{ textAlign: "center" }}>
        Total Employees: {employees.length}
      </h2>
      <table
        border={2}
        cellPadding={5}
        align="center"
        className={styles.employeeList}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>${employee.salary.toLocaleString()}</td>
            </tr>
          ))}
          <tr>
            <th colSpan={4}>Total</th>
            <td>${total.toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
      <h2 style={{ textAlign: "center" }}>{message}</h2>
    </>
  );
};

export default EmployeeList;
