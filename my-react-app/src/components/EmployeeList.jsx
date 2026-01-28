import React, { useState } from "react";
import styles from "../styles/EmployeeList.module.css";

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOption, setSearchOption] = useState("all");

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
    {
      id: 7,
      name: "Tom Hiddleston",
      email: "tom.hiddleston@company.com",
      department: "Sales",
      salary: 75000,
    },
  ];

  let total = 0;

  for (let employee of employees) {
    total += employee.salary;
  }

  const filteredEmployees = employees.filter((employee) => {
    const term = searchTerm.toLowerCase().trim();

    if (searchOption !== "all" && term) {
      return (
        employee.department.toLowerCase() === searchOption.toLowerCase() &&
        (employee.name.toLowerCase().includes(term) ||
          employee.email.toLowerCase().includes(term))
      );
    }

    if (searchOption !== "all") {
      return employee.department.toLowerCase() === searchOption.toLowerCase();
    }

    if (!term) return true;

    return (
      employee.name.toLowerCase().includes(term) ||
      employee.email.toLowerCase().includes(term)
    );
  });

  const message =
    filteredEmployees.length === 0 ? "No employees match your search!" : "";

  return (
    <>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for employees..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <select
          value={searchOption}
          onChange={(event) => setSearchOption(event.target.value)}
        >
          <option value="all">All</option>
          <option value="engineering">Engineering</option>
          <option value="marketing">Marketing</option>
          <option value="finance">Finance</option>
          <option value="human Resources">Human Resources</option>
          <option value="sales">Sales</option>
          <option value="product">Product</option>
        </select>
        <button
          type="button"
          onClick={() => {
            setSearchOption("all");
            setSearchTerm("");
          }}
        >
          Clear Filters
        </button>
      </div>
      <div className={styles.statsContainer}>
        <h2 style={{ textAlign: "center" }}>
          Total Employees: {employees.length}
        </h2>
        <h2 style={{ textAlign: "center" }}>
          Filtered Employees: {filteredEmployees.length}
        </h2>
      </div>
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
          {filteredEmployees.map((employee) => (
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
