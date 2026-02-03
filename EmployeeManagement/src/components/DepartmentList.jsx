import React, { useState, useEffect } from "react";
import { getDepartments } from "../services/employeeService.js";

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const loadDepartments = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch (error) {
        alert(error.message);
        console.error(`API Error ${error.status}: ${error.message}`);
      }
    };

    loadDepartments();
  }, []);

  return (
    <div className="employee-table">
      <table border={2} cellPadding={5} align="center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Department</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.dept_id}>
              <td>{department.dept_id}</td>
              <td>{department.dept_name}</td>
              <td>{department.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentList;
