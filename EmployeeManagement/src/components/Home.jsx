import React from "react";

const Home = () => {
  return (
    <div className="homepage">
      <h1>Home page</h1>
      <h3>Employees: "/employees"</h3>
      <h3>Employee: "/employees/:id"</h3>
      <h3>Add Employee: "/employees/add"</h3>
      <h3>Edit Employee: "/employees/edit/:id"</h3>
      <h3>Departments: "/departments"</h3>
      <h3>Department: "/departments/:id"</h3>
      <h3>Employees with Dept Name: "/employeesDept"</h3>
    </div>
  );
};

export default Home;
