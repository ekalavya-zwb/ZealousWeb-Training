import React from "react";
import "./styles/Cards.css";
import PropTypes from "prop-types";

const EmployeeCard = ({
  f_name = "John",
  l_name = "Doe",
  email = "john.doe@company.com",
  salary = 20000,
  hire_date = "2020-01-01",
  isActive = true,
}) => {
  const salaryColor =
    salary < 10000 ? "tomato" : salary < 30000 ? "gold" : "lightgreen";

  const year = new Date(hire_date).getFullYear();
  const month = new Date(hire_date).toLocaleString("en-US", { month: "long" });
  const date = new Date(hire_date).getDate();

  return (
    <div className="EmployeeCard">
      {isActive ? (
        <small
          style={{
            backgroundColor: "lightgreen",
            padding: "3px",
            borderRadius: "3px",
            fontWeight: "bold",
          }}
        >
          ACTIVE
        </small>
      ) : (
        <small
          style={{
            backgroundColor: "tomato",
            padding: "3px",
            borderRadius: "3px",
            fontWeight: "bold",
          }}
        >
          INACTIVE
        </small>
      )}

      <h2>Employee details</h2>
      <p>First Name: {f_name}</p>
      <p>Last Name: {l_name}</p>
      <p>Email: {email}</p>

      <p
        style={{
          backgroundColor: salaryColor,
          display: "inline",
          padding: "5px",
          borderRadius: "5px",
        }}
      >
        Salary: ${salary.toLocaleString()}
      </p>

      <p>
        Hire Date: {month} {date}, {year}
      </p>
    </div>
  );
};

EmployeeCard.propTypes = {
  f_name: PropTypes.string,
  l_name: PropTypes.string,
  email: PropTypes.string.isRequired,
  salary: PropTypes.number,
  hire_date: PropTypes.string,
  isActive: PropTypes.bool,
};

export default EmployeeCard;
