import React, { useState } from "react";
import styles from "../styles/LoginForm.module.css";

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    email: "john.doe@company.com",
    password: "test@12345",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (inputs.email.trim() === "") {
      newErrors.email = "Email cannot remain empty!";
    }
    inputs.password.trim() === ""
      ? (newErrors.password = "Password cannot remain empty!")
      : inputs.password.length < 10
        ? (newErrors.password = "Password must be at least 10 characters long!")
        : "";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    setInputs({
      email: "",
      password: "",
    });

    setShowPassword(false);

    console.log(`
        Email: ${inputs.email}
        Password: ${inputs.password}
        `);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleVisibility = (event) => {
    setShowPassword(event.target.checked);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={inputs.email}
          onChange={handleChange}
        />
        <p className={styles.error}>{errors.email}</p>

        <label htmlFor="password">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          name="password"
          value={inputs.password}
          onChange={handleChange}
        />
        <div className={styles.checkBox}>
          <input
            type="checkbox"
            name="toggle"
            id="toggle"
            checked={showPassword}
            onChange={handleVisibility}
          />
          <label htmlFor="toggle">show</label>
        </div>
        <p className={styles.error}>{errors.password}</p>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default LoginForm;
