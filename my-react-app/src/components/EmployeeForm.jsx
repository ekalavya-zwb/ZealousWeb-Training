import React, { useState } from "react";
import styles from "../styles/EmployeeForm.module.css";

const EmployeeForm = () => {
  const [inputs, setInputs] = useState({
    firstname: "John",
    lastname: "Doe",
    email: "john.doe@company.com",
    salary: "10000",
    department: "Engineering",
    hireDate: "2026-01-01",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (inputs.firstname.trim() === "") {
      newErrors.firstname = "First name cannot remain empty!";
    }
    if (inputs.lastname.trim() === "") {
      newErrors.lastname = "Last name cannot remain empty!";
    }
    if (inputs.email.trim() === "") {
      newErrors.email = "Email cannot remain empty!";
    }
    if (Number(inputs.salary) <= 0) {
      newErrors.salary = "Salary must be greater than 0!";
    }
    if (inputs.department.trim() === "") {
      newErrors.department = "Department cannot remain empty!";
    }
    if (inputs.hireDate.trim() === "") {
      newErrors.hireDate = "Hire Date cannot remain empty!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    setInputs({
      firstname: "",
      lastname: "",
      email: "",
      salary: "",
      department: "",
      hireDate: "",
    });

    console.log(`
      First Name: ${inputs.firstname}
      Last Name: ${inputs.lastname}
      Email: ${inputs.email}
      Salary: ${Number(inputs.salary).toLocaleString()}
      Department: ${inputs.department}
      Hire Date: ${inputs.hireDate}
      `);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const isFormInvalid = () => {
    return inputs.firstname.trim() === "" ||
      inputs.lastname.trim() === "" ||
      inputs.email.trim() === "" ||
      Number(inputs.salary) <= 0 ||
      inputs.department.trim() === "" ||
      inputs.hireDate.trim() === ""
      ? true
      : false;
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <label htmlFor="firstname">First Name:</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          value={inputs.firstname}
          onChange={handleChange}
        />
        <p className={styles.error}>{errors.firstname}</p>

        <label htmlFor="lastname">Last Name:</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={inputs.lastname}
          onChange={handleChange}
        />
        <p className={styles.error}>{errors.lastname}</p>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
        />
        <p className={styles.error}>{errors.email}</p>

        <label htmlFor="salary">Salary:</label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={inputs.salary}
          onChange={handleChange}
        />
        <p className={styles.error}>{errors.salary}</p>

        <label htmlFor="department">Department:</label>
        <input
          type="text"
          id="department"
          name="department"
          value={inputs.department}
          onChange={handleChange}
        />
        <p className={styles.error}>{errors.department}</p>

        <label htmlFor="hireDate">Hire Date:</label>
        <input
          type="date"
          id="hireDate"
          name="hireDate"
          value={inputs.hireDate}
          onChange={handleChange}
        />
        <p className={styles.error}>{errors.hireDate}</p>

        <button type="submit" disabled={isFormInvalid()}>
          Submit
        </button>

        <div>
          <p>First Name: {inputs.firstname}</p>
          <p>Last Name: {inputs.lastname}</p>
          <p>Email: {inputs.email}</p>
          <p>Salary: {Number(inputs.salary).toLocaleString()}</p>
          <p>Department: {inputs.department}</p>
          <p>Hire Date: {inputs.hireDate}</p>
        </div>
      </form>
    </>
  );
};

export default EmployeeForm;
