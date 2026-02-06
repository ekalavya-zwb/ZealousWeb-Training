import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/FetchEmployees.module.css";

const CreateEmployee = () => {
  const navigate = useNavigate();

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
  const [loading, setLoading] = useState(false);

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();

    if (
      !inputs.first_name ||
      !inputs.last_name ||
      !inputs.email ||
      !inputs.salary ||
      Number(inputs.salary) <= 0 ||
      !inputs.hire_date ||
      !inputs.dept_id ||
      Number(inputs.dept_id) <= 0 ||
      !inputs.state
    ) {
      alert("Input fields cannot remain empty!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/employees`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...inputs,
            salary: Number(inputs.salary),
            dept_id: Number(inputs.dept_id),
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to create employee with status ${response.status}`,
        );
      }

      const createdEmployee = await response.json();
      console.log(createdEmployee);

      navigate("/employees");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className={styles.formContainer} onSubmit={handleCreateUser}>
        <h2>Create User</h2>
        <label htmlFor="first_name">
          <span>First Name:</span>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={inputs.first_name}
            onChange={handleInputs}
          />
        </label>
        <label htmlFor="last_name">
          <span> Last Name:</span>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={inputs.last_name}
            onChange={handleInputs}
          />
        </label>
        <label htmlFor="email">
          <span> Email:</span>
          <input
            type="email"
            id="email"
            name="email"
            value={inputs.email}
            onChange={handleInputs}
          />
        </label>
        <label htmlFor="salary">
          <span>Salary:</span>
          <input
            type="number"
            id="salary"
            name="salary"
            value={inputs.salary}
            onChange={handleInputs}
          />
        </label>
        <label htmlFor="hire_date">
          <span> Hire Date:</span>
          <input
            type="date"
            id="hire_date"
            name="hire_date"
            value={inputs.hire_date}
            onChange={handleInputs}
          />
        </label>
        <label htmlFor="dept_id">
          <span>Department Id:</span>
          <input
            type="number"
            id="dept_id"
            name="dept_id"
            value={inputs.dept_id}
            onChange={handleInputs}
          />
        </label>
        <label htmlFor="state">
          <span>State:</span>
          <input
            type="text"
            id="state"
            name="state"
            value={inputs.state}
            onChange={handleInputs}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? " Creating..." : "Create Employee"}
        </button>
      </form>
    </>
  );
};

export default CreateEmployee;
