import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDepartmentsById } from "../services/employeeService.js";

const DepartmentDetail = () => {
  const [department, setDepartment] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const loadDepartmentById = async () => {
      try {
        const data = await getDepartmentsById(id);
        setDepartment(data);
      } catch (error) {
        alert(error.message);
        console.error(`API Error ${error.status}: ${error.message}`);
      }
    };

    if (id) loadDepartmentById();
  }, [id]);

  if (!department) {
    return <p className="loading">Loading department details...</p>;
  }

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
          <tr>
            <td>{department.dept_id}</td>
            <td>{department.dept_name}</td>
            <td>{department.location}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentDetail;
