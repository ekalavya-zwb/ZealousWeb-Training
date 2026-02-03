import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUsersById } from "../services/employeeService.js";

const EmployeeDetail = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  const formatDate = (isoStr) => isoStr.split("T")[0];

  useEffect(() => {
    const loadUserById = async () => {
      try {
        const data = await getUsersById(id);
        setUser(data);
      } catch (error) {
        alert(error.message);
        console.error(`API Error ${error.status}: ${error.message}`);
      }
    };

    if (id) loadUserById();
  }, [id]);

  if (!user) {
    return <p className="loading">Loading employee details...</p>;
  }

  return (
    <div className="employee-table">
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
          <tr>
            <td>{user.id}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
            <td>${user.salary}</td>
            <td>{formatDate(user.hire_date)}</td>
            <td>{user.dept_id}</td>
            <td>{user.state}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeDetail;
