import React, { useReducer, useEffect } from "react";
import EmployeeContext from "./EmployeeContext";
import EmployeeReducer from "../components/EmployeeReducer";

const initialEmployees = [
  {
    id: 101,
    name: "Alex Martinez",
    role: "Software Engineer",
    department: "Engineering",
    email: "alex.martinez@company.com",
    salary: 85000,
    isActive: true,
  },
  {
    id: 102,
    name: "Priya Singh",
    role: "Product Manager",
    department: "Product",
    email: "priya.singh@company.com",
    salary: 92000,
    isActive: true,
  },
  {
    id: 103,
    name: "Daniel Roberts",
    role: "UX Designer",
    department: "Design",
    email: "daniel.roberts@company.com",
    salary: 78000,
    isActive: false,
  },
  {
    id: 104,
    name: "Maria Gonzales",
    role: "HR Specialist",
    department: "Human Resources",
    email: "maria.gonzales@company.com",
    salary: 65000,
    isActive: true,
  },
  {
    id: 105,
    name: "Kevin Chen",
    role: "Data Analyst",
    department: "Analytics",
    email: "kevin.chen@company.com",
    salary: 81000,
    isActive: true,
  },
];

const getInitialEmployees = (fallbackEmployees) => {
  const stored = localStorage.getItem("employees");
  return stored ? JSON.parse(stored) : fallbackEmployees;
};

const EmployeeProvider = ({ children }) => {
  const [employees, dispatch] = useReducer(
    EmployeeReducer,
    initialEmployees,
    getInitialEmployees,
  );

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (employee) => {
    dispatch({
      type: "ADD_EMPLOYEE",
      payload: employee,
    });
  };

  const updateEmployee = (employee) => {
    dispatch({
      type: "UPDATE_EMPLOYEE",
      payload: employee,
    });
  };

  const deleteEmployee = (id) => {
    dispatch({
      type: "DELETE_EMPLOYEE",
      payload: id,
    });
  };

  const toggleEmployee = (id) => {
    dispatch({
      type: "TOGGLE_EMPLOYEE",
      payload: id,
    });
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        toggleEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
