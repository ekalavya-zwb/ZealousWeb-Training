import React from "react";

function EmployeeReducer(employees, action) {
  switch (action.type) {
    case "ADD_EMPLOYEE":
      return [...employees, action.payload];

    case "UPDATE_EMPLOYEE":
      return employees.map((emp) =>
        emp.id === action.payload.id ? action.payload : emp,
      );

    case "DELETE_EMPLOYEE":
      return employees.filter((emp) => emp.id !== action.payload);

    case "TOGGLE_EMPLOYEE":
      return employees.map((emp) =>
        emp.id === action.payload ? { ...emp, isActive: !emp.isActive } : emp,
      );

    default:
      return employees;
  }
}

export default EmployeeReducer;
