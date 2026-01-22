import React from "react";

const EmployeeCard = ({
  f_name = "John",
  l_name = "Doe",
  email = "john.doe@company.com",
  salary = 50000,
  hire_date = "2020-01-01",
}) => {
  return (
    <>
      <h2>Employee details</h2>
      <p>First Name: {f_name}</p>
      <p>Last Name: {l_name}</p>
      <p>Email: {email}</p>
      <p>Salary: {salary}</p>
      <p>Hire Date: {hire_date}</p>
    </>
  );
};

export default EmployeeCard;
