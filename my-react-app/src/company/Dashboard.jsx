import React from "react";
import "./styles/Dashboard.css";
import Header from "./Header";
import Footer from "./Footer";
import EmployeeCard from "./EmployeeCard";
import DepartmentCard from "./DepartmentCard";
import EmpStatsCard from "./EmpStatsCard";
import DeptStatsCard from "./DeptStatsCard";

const Dashboard = () => {
  return (
    <>
      <Header />
      <h1>Employee Section:</h1>
      <div className="employee-section">
        <EmployeeCard
          f_name="Ekalavya"
          l_name="Patel"
          email="ekalavya.patel@zealousweb.com"
          salary={25000}
          hire_date="2026-01-01"
          isActive={true}
        />
        <EmployeeCard
          f_name="John"
          l_name="Doe"
          email="john.doe@zealousweb.com"
          salary={40000}
          hire_date="2022-01-01"
          isActive={false}
        />
      </div>
      <h1>Department Section:</h1>
      <div className="department-section">
        <DepartmentCard
          dept_id={304}
          dept_name="Engineering"
          location="Ahmedabad"
          isActive={true}
        />
        <DepartmentCard
          dept_id={305}
          dept_name="Marketing"
          location="Ahmedabad"
          isActive={false}
        />
      </div>
      <h1>Stats section:</h1>
      <div className="stats-section">
        <EmpStatsCard
          totalEmployees={2}
          activeEmployees={1}
          avgSalary={32500}
        />
        <DeptStatsCard totalDepartments={2} activeDepartments={1} />
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
