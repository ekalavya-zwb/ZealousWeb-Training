import React, { useState, useEffect } from "react";
import { getEmployeesDept } from "../services/employeeService.js";

const EmployeesDept = () => {
  const [empsDept, setEmpsDept] = useState([]);

  useEffect(() => {
    const loadEmpDEpt = async () => {
      try {
        const data = await getEmployeesDept();
        setEmpsDept(data);
      } catch (error) {
        alert(error.message);
        console.error(`API Error ${error.status}: ${error.message}`);
      }
    };

    loadEmpDEpt();
  }, []);

  return (
    <div className="employee-table">
      <table border={2} cellPadding={5} align="center">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {empsDept.map((empDept) => (
            <tr key={empDept.id}>
              <td>{empDept.id}</td>
              <td>{empDept.first_name}</td>
              <td>{empDept.last_name}</td>
              <td>{empDept.dept_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesDept;
