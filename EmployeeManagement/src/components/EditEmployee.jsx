import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateUser, getUsersById } from "../services/employeeService.js";

const EditEmployee = () => {
  const { id } = useParams();

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

  const navigate = useNavigate();

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
  };

  const handleUpdateUser = async (event) => {
    event.preventDefault();

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
      await updateUser(id, inputs);
      setInputs(emptyForm);

      navigate("/employees");
    } catch (error) {
      alert(error.message);
      console.error(`API Error ${error.status}: ${error.message}`);
    }
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getUsersById(id);
        setInputs({
          ...data,
          hire_date: data.hire_date ? data.hire_date.split("T")[0] : "",
          salary: Number(data.salary),
          dept_id: Number(data.dept_id),
        });
      } catch (error) {
        console.error("Failed to fetch user,", error);
      }
    };
    if (id) fetchEmployee();
  }, [id]);

  return (
    <>
      <form className="form-container" onSubmit={handleUpdateUser}>
        <h2>Update User</h2>
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
          <span>Last Name:</span>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={inputs.last_name}
            onChange={handleInputs}
          />
        </label>
        <label htmlFor="email">
          <span>Email:</span>
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
          <span>Hire Date:</span>
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
        <button type="submit">Edit User</button>
      </form>
    </>
  );
};

export default EditEmployee;
