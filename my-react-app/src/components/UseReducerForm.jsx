import React, { useReducer } from "react";
import styles from "../styles/UseReducerForm.module.css";

const UseReducerForm = () => {
  const initialForm = {
    first_name: "",
    last_name: "",
    email: "",
    salary: "",
    hire_date: "",
    status: "",
  };

  const [state, dispatch] = useReducer(formReducer, initialForm);

  function formReducer(state, action) {
    switch (action.type) {
      case "Change":
        return {
          ...state,
          [action.field]: action.value,
        };
      case "Reset":
        return action.initialState;

      default:
        return state;
    }
  }

  const isFormEmpty = (form) =>
    Object.values(form).some((value) => value.trim() === "");

  const handleChange = (event) => {
    dispatch({
      type: "Change",
      field: event.target.name,
      value: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (isFormEmpty(state)) {
      alert("Form cannot remain empty!");
      return;
    }

    if (Number(state.salary) <= 0) {
      alert("Salary must be greater than 0!");
      return;
    }

    console.log(`
    First Name: ${state.first_name}
    Last Name: ${state.last_name}
    Email: ${state.email}
    Salary: ${Number(state.salary).toLocaleString()}
    Hire Date: ${state.hire_date}
    Status: ${state.status}
    `);

    dispatch({ type: "Reset", initialState: initialForm });
  };

  return (
    <>
      <form className={styles.formContainer} onSubmit={handleFormSubmit}>
        <h2>Form</h2>
        <label htmlFor="first_name">
          <span>First Name:</span>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={state.first_name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="last_name">
          <span>Last Name:</span>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={state.last_name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          <span>Email:</span>
          <input
            type="email"
            name="email"
            id="email"
            value={state.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="salary">
          <span>Salary:</span>
          <input
            type="number"
            name="salary"
            id="salary"
            value={state.salary}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="hire_date">
          <span>Hire Date:</span>
          <input
            type="date"
            name="hire_date"
            id="hire_date"
            value={state.hire_date}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="status">
          <span>Status:</span>
          <input
            type="text"
            name="status"
            id="status"
            value={state.status}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UseReducerForm;
