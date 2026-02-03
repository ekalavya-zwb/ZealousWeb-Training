import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import EmployeeList from "./components/EmployeeList";
import EmployeeDetail from "./components/EmployeeDetail";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import DepartmentList from "./components/DepartmentList";
import DepartmentDetail from "./components/DepartmentDetail";
import EmployeesDept from "./components/EmployeesDept";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/employees/:id" element={<EmployeeDetail />} />
        <Route path="/employees/add" element={<AddEmployee />} />
        <Route path="/employees/edit/:id" element={<EditEmployee />} />
        <Route path="/departments" element={<DepartmentList />} />
        <Route path="/departments/:id" element={<DepartmentDetail />} />
        <Route path="/employeesDept" element={<EmployeesDept />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
