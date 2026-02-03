import React, { useState, useEffect } from "react";
import { getUsers } from "../services/employeeService.js";

function EmployeeList() {
  const [users, setUsers] = useState([]);

  const formatDate = (isoStr) => isoStr.split("T")[0];

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        alert(error.message);
        console.error(`API Error ${error.status}: ${error.message}`);
      }
    };

    loadUsers();
  }, []);

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
          {users.map((user) => (
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
  );
}

export default EmployeeList;
