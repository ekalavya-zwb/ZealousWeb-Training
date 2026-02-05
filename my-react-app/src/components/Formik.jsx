import React from "react";
import { useFormik } from "formik";
import styles from "../styles/Formik.module.css";

const Formik = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      salary: "",
      hireDate: "",
      department: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.firstName) {
        errors.firstName = "First name is required";
      }

      if (!values.lastName) {
        errors.lastName = "Last name is required";
      }

      if (!values.email) {
        errors.email = "Email is required";
      }

      if (!values.salary) {
        errors.salary = "Salary is required";
      }

      if (Number(values.salary) <= 0) {
        errors.salary = "Salary must be greater than 0";
      }

      if (!values.hireDate) {
        errors.hireDate = "Hire date is required";
      }

      if (!values.department) {
        errors.department = "Please select a department";
      }

      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
        <h2>Employee Form</h2>
        <label htmlFor="firstName">
          <span>First Name:</span>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>
        {formik.touched.firstName && formik.errors.firstName && (
          <p>{formik.errors.firstName}</p>
        )}
        <label htmlFor="lastName">
          <span>Last Name:</span>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>
        {formik.touched.lastName && formik.errors.lastName && (
          <p>{formik.errors.lastName}</p>
        )}
        <label htmlFor="email">
          <span>Email:</span>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>
        {formik.touched.email && formik.errors.email && (
          <p>{formik.errors.email}</p>
        )}
        <label htmlFor="salary">
          <span>Salary:</span>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formik.values.salary}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>
        {formik.touched.salary && formik.errors.salary && (
          <p>{formik.errors.salary}</p>
        )}
        <label htmlFor="hireDate">
          <span>Hire Date:</span>
          <input
            type="date"
            id="hireDate"
            name="hireDate"
            value={formik.values.hireDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </label>
        {formik.touched.hireDate && formik.errors.hireDate && (
          <p>{formik.errors.hireDate}</p>
        )}
        <label htmlFor="department">
          <span>Department:</span>
          <select
            id="department"
            name="department"
            value={formik.values.department}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select a department</option>
            <option value="engineering">Engineering</option>
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
            <option value="hr">HR</option>
          </select>
        </label>
        {formik.touched.department && formik.errors.department && (
          <p>{formik.errors.department}</p>
        )}
        <div className={styles.btnContainer}>
          <button type="submit">Submit</button>
          <button type="button" onClick={formik.resetForm}>
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default Formik;
