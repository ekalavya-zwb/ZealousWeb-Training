import { useEffect } from "react";
import useEmployees from "../hooks/useEmployees";
import "../styles/Employees.css";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployee() {
  const { error, updateEmployee, employees, fetchEmployees } = useEmployees();

  const emptyForm = {
    first_name: "",
    last_name: "",
    email: "",
    hire_date: "",
    salary: "",
    dept_id: "",
    state: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();

  const employee = employees.find((e) => e.id === Number(id));

  const [inputs, setInputs] = useState(emptyForm);
  const [formError, setFormError] = useState({});

  const today = new Date();
  const inputDate = inputs.hire_date ? new Date(inputs.hire_date) : null;

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    if (employee) {
      setInputs({
        ...employee,
        hire_date: employee.hire_date?.split("T")[0] || "",
      });
    }
  }, [employee]);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));

    if (formError[name]) {
      setFormError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    await updateEmployee(id, inputs);

    setFormError({});
    setInputs(emptyForm);

    navigate("/");
  };

  const validateForm = () => {
    const newErrors = {};

    if (inputs.first_name.trim() === "") {
      newErrors.first_name = "First name cannot remain empty";
    }
    if (inputs.last_name.trim() === "") {
      newErrors.last_name = "Last name cannot remain empty";
    }
    if (inputs.email.trim() === "") {
      newErrors.email = "Email cannot remain empty";
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!inputs.dept_id) {
      newErrors.dept_id = "Department cannot remain empty";
    }
    if (!inputs.salary) {
      newErrors.salary = "Salary cannot remain empty";
    } else if (Number(inputs.salary) <= 0) {
      newErrors.salary = "Salary must be greater than 0";
    }
    if (!inputs.hire_date) {
      newErrors.hire_date = "Hire date cannot remain empty";
    } else if (inputDate > today) {
      newErrors.hire_date = "Hire date cannot be in the future";
    }
    if (inputs.state.trim() === "") {
      newErrors.state = "Status cannot remain empty";
    }

    if (Object.keys(newErrors).length > 0) {
      setFormError(newErrors);
      return false;
    }

    return true;
  };

  return (
    <>
      {error && <p className="error">{error}</p>}
      <form className="form-container" onSubmit={handleSubmit}>
        <h2>Edit Employee</h2>
        <label>
          <span> First Name</span>
          <input
            type="text"
            name="first_name"
            value={inputs.first_name}
            onChange={handleInputs}
          />
        </label>
        {formError.first_name && (
          <p className="form-error">{formError.first_name}</p>
        )}
        <label>
          <span> Last Name</span>
          <input
            type="text"
            name="last_name"
            value={inputs.last_name}
            onChange={handleInputs}
          />
        </label>
        {formError.last_name && (
          <p className="form-error">{formError.last_name}</p>
        )}
        <label>
          <span> Email</span>
          <input
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleInputs}
          />
        </label>
        {formError.email && <p className="form-error">{formError.email}</p>}
        <label>
          <span> Hire Date</span>
          <input
            type="date"
            name="hire_date"
            value={inputs.hire_date}
            onChange={handleInputs}
          />
        </label>
        {formError.hire_date && (
          <p className="form-error">{formError.hire_date}</p>
        )}
        <label>
          <span> Salary</span>
          <input
            type="number"
            name="salary"
            min="0"
            value={inputs.salary}
            onChange={handleInputs}
          />
        </label>
        {formError.salary && <p className="form-error">{formError.salary}</p>}
        <label>
          <span> Dept ID</span>
          <input
            type="number"
            name="dept_id"
            min="1"
            value={inputs.dept_id}
            onChange={handleInputs}
          />
        </label>
        {formError.dept_id && <p className="form-error">{formError.dept_id}</p>}
        <label>
          <span> Status</span>
          <select name="state" value={inputs.state} onChange={handleInputs}>
            <option value="">Status</option>
            <option value="ONPROJECT">ONPROJECT</option>
            <option value="ONBOARDED">ONBOARDED</option>
            <option value="TERMINATED">TERMINATED</option>
          </select>
        </label>
        {formError.state && <p className="form-error">{formError.state}</p>}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default EditEmployee;
