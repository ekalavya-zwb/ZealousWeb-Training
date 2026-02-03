import React, { useState, useEffect } from "react";
import "./App.css";
import {
  getUsers,
  getUsersById,
  createUser,
  deleteUser,
  updateUser,
} from "./services/employeeService";

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [view, setView] = useState("list");
  const [userId, setUserId] = useState(null);

  const emptyForm = {
    first_name: "",
    last_name: "",
    email: "",
    hire_date: "",
    salary: "",
    dept_id: "",
    state: "",
  };

  const [inputs, setInputs] = useState(emptyForm);

  const formatDate = (isoStr) => isoStr.split("T")[0];

  const resetForm = () => {
    setInputs(emptyForm);
    setUserId(null);
  };

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
      setView("list");
    } catch (error) {
      console.error("Failed to fetch users,", error);
    }
  };

  const loadUserById = async (id) => {
    try {
      const data = await getUsersById(id);
      setUser(data);
      setView("details");
    } catch (error) {
      console.error("Failed to fetch user,", error);
    }
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleCreateUser = async () => {
    if (
      inputs.first_name.trim() === "" ||
      inputs.last_name.trim() === "" ||
      inputs.email.trim() === "" ||
      Number(inputs.salary) <= 0 ||
      inputs.hire_date === "" ||
      Number(inputs.dept_id) <= 0 ||
      inputs.state.trim() === ""
    ) {
      alert("Input fields cannot remain empty!");
      return;
    }
    try {
      await createUser(inputs);
      resetForm();
      loadUsers();
    } catch (error) {
      console.error("Creation Failed,", error);
    }
  };

  const handleUpdateUser = async () => {
    if (userId === null) {
      alert("Select a user to edit first!");
      return;
    }
    try {
      await updateUser(userId, inputs);
      resetForm();
      loadUsers();
    } catch (error) {
      console.error("Update Failed,", error);
    }
  };

  const deleteUserById = async (id) => {
    try {
      await deleteUser(id);
      loadUsers();
    } catch (error) {
      console.error("Failed to delete user,", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  if (view === "details" && user) {
    return (
      <div className="employee-data">
        <button
          style={{ marginBottom: "5px" }}
          type="button"
          onClick={loadUsers}
        >
          Back to List
        </button>

        <p>Id: {user.id}</p>
        <p>First Name: {user.first_name}</p>
        <p>Last Name: {user.last_name}</p>
        <p>Email: {user.email}</p>
        <p>Hire Date: {formatDate(user.hire_date)}</p>
        <p>Salary: {user.salary}</p>
        <p>Department Id: {user.dept_id}</p>
        <p>State: {user.state}</p>
      </div>
    );
  }

  return (
    <>
      <form className="form-container">
        <h2>{userId ? "Editing User" : "Create User"}</h2>
        <label htmlFor="first_name">
          First Name:
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={inputs.first_name}
            onChange={handleInputs}
          />
        </label>
        <label htmlFor="last_name">
          Last Name:
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={inputs.last_name}
            onChange={handleInputs}
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            value={inputs.email}
            onChange={handleInputs}
          />
        </label>
        <label htmlFor="salary">
          Salary:
          <input
            type="number"
            id="salary"
            name="salary"
            value={inputs.salary}
            onChange={handleInputs}
          />
        </label>
        <label htmlFor="hire_date">
          Hire Date:
          <input
            type="date"
            id="hire_date"
            name="hire_date"
            value={inputs.hire_date}
            onChange={handleInputs}
          />
        </label>
        <label htmlFor="dept_id">
          Department Id:
          <input
            type="number"
            id="dept_id"
            name="dept_id"
            value={inputs.dept_id}
            onChange={handleInputs}
          />
        </label>
        <label htmlFor="state">
          State:
          <input
            type="text"
            id="state"
            name="state"
            value={inputs.state}
            onChange={handleInputs}
          />
        </label>
        <button
          type="button"
          onClick={userId ? handleUpdateUser : handleCreateUser}
        >
          {userId ? "Update User" : "Add User"}
        </button>
      </form>

      {users.map((user) => (
        <div key={user.id} className="employee-data">
          <p>Id: {user.id}</p>
          <p>First Name: {user.first_name}</p>
          <p>Last Name: {user.last_name}</p>
          <p>Email: {user.email}</p>
          <p>Hire Date: {formatDate(user.hire_date)}</p>
          <p>Salary: {user.salary}</p>
          <p>Department Id: {user.dept_id}</p>
          <p>State: {user.state}</p>

          <button
            type="button"
            onClick={() => loadUserById(user.id)}
            style={{ marginTop: "5px" }}
          >
            View {user.first_name}
          </button>

          <button
            type="button"
            onClick={() => deleteUserById(user.id)}
            style={{ marginLeft: "5px" }}
          >
            Remove {user.first_name}
          </button>

          <button
            type="button"
            onClick={() => {
              setUserId(user.id);
              setInputs({
                ...user,
                hire_date: formatDate(user.hire_date),
              });
            }}
            style={{ marginLeft: "5px" }}
          >
            Edit {user.first_name}
          </button>
        </div>
      ))}
    </>
  );
}

export default App;
