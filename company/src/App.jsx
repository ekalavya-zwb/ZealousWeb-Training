import React, { useState, useEffect } from "react";
import "./App.css";
import { getUsers, getUsersById } from "./services/employeeService";

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users!", error);
      }
    };

    const loadUserById = async () => {
      try {
        const data = await getUsersById(1);
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user!", error);
      }
    };

    loadUsers();
    loadUserById();
  }, []);

  return (
    <>
      {users.map((user) => (
        <div key={user.id} className="employee-data">
          <p>Id: {user.id}</p>
          <p>First Name: {user.first_name}</p>
          <p>Last Name: {user.last_name}</p>
          <p>Email: {user.email}</p>
          <p>Salary: {user.salary}</p>
          <p>Department Id: {user.dept_id}</p>
          <p>State: {user.state}</p>
        </div>
      ))}
    </>
  );
}

export default App;
