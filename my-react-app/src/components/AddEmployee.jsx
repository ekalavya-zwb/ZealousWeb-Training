import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeContext from "../context/EmployeeContext";
import styles from "../styles/GlobalEmployees.module.css";

const emptyForm = {
  name: "",
  email: "",
  role: "",
  department: "",
  salary: "",
};

const AddEmployee = () => {
  const { addEmployee } = useContext(EmployeeContext);
  const [form, setForm] = useState(emptyForm);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.role ||
      !form.department ||
      !form.salary
    ) {
      alert("All fields are required!");
      return;
    }

    if (Number(form.salary) <= 0) {
      alert("Salary must be greater than 0!");
      return;
    }

    const newEmployee = {
      id: Date.now() % 1000,
      ...form,
      salary: Number(form.salary),
      isActive: true,
    };

    addEmployee(newEmployee);

    setForm(emptyForm);

    navigate("/");
  };

  return (
    <>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h2>Add Employee</h2>
        <label htmlFor="name">
          <span>Name:</span>
          <input
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          <span>Email:</span>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="role">
          <span>Role:</span>
          <input
            type="text"
            name="role"
            id="role"
            value={form.role}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="department">
          <span>Department:</span>
          <input
            type="text"
            name="department"
            id="department"
            value={form.department}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="salary">
          <span>Salary:</span>
          <input
            type="number"
            name="salary"
            id="salary"
            value={form.salary}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default AddEmployee;
