import React from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/Formik.module.css";

const ReactHookForm = () => {
  const { register, handleSubmit, reset, formState } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <>
      <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <h2>Employee Form</h2>
        <label htmlFor="firstName">
          <span>First Name:</span>
          <input
            type="text"
            id="firstName"
            {...register("firstName", {
              required: "First Name is required",
              minLength: {
                value: 2,
                message: "Minimum 2 characters",
              },
            })}
          />
        </label>
        {formState.errors.firstName && (
          <p>{formState.errors.firstName.message}</p>
        )}
        <label htmlFor="lastName">
          <span>Last Name:</span>
          <input
            type="text"
            id="lastName"
            {...register("lastName", {
              required: "Last Name is required",
              minLength: {
                value: 2,
                message: "Minimum 2 characters",
              },
            })}
          />
        </label>
        {formState.errors.lastName && (
          <p>{formState.errors.lastName.message}</p>
        )}
        <label htmlFor="email">
          <span>Email:</span>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            })}
          />
        </label>
        {formState.errors.email && <p>{formState.errors.email.message}</p>}
        <label htmlFor="salary">
          <span>Salary:</span>
          <input
            type="number"
            id="salary"
            {...register("salary", {
              required: "Salary is required",
              min: {
                value: 1,
                message: "Salary must be greater than 0",
              },
              valueAsNumber: true,
            })}
          />
        </label>
        {formState.errors.salary && <p>{formState.errors.salary.message}</p>}
        <label htmlFor="hireDate">
          <span>Hire Date:</span>
          <input
            type="date"
            id="hireDate"
            {...register("hireDate", {
              required: "Hire date is required",
              validate: (value) =>
                new Date(value) <= new Date() ||
                "Hire date cannot be in the future",
              valueAsDate: true,
            })}
          />
        </label>
        {formState.errors.hireDate && (
          <p>{formState.errors.hireDate.message}</p>
        )}
        <label htmlFor="department">
          <span>Department:</span>
          <select
            id="department"
            {...register("department", {
              required: "Department is required",
            })}
          >
            <option value="">Select a department</option>
            <option value="engineering">Engineering</option>
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
            <option value="hr">HR</option>
          </select>
        </label>
        {formState.errors.department && (
          <p>{formState.errors.department.message}</p>
        )}
        <div className={styles.btnContainer}>
          <button type="submit">Submit</button>
          <button type="button" onClick={reset}>
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default ReactHookForm;
