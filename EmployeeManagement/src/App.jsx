import React, { Suspense, lazy } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
const Home = lazy(() => import("./components/Home"));
const EmployeeList = lazy(() => import("./components/EmployeeList"));
const EmployeeDetail = lazy(() => import("./components/EmployeeDetail"));
const AddEmployee = lazy(() => import("./components/AddEmployee"));
const EditEmployee = lazy(() => import("./components/EditEmployee"));
const DepartmentList = lazy(() => import("./components/DepartmentList"));
const DepartmentDetail = lazy(() => import("./components/DepartmentDetail"));
const EmployeesDept = lazy(() => import("./components/EmployeesDept"));
const PageNotFound = lazy(() => import("./components/PageNotFound"));
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <>
      <div className="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/employees">Employees</NavLink>
        <NavLink to="/departments">Departments</NavLink>
        <NavLink to="/employeesDept">List</NavLink>
      </div>

      <ErrorBoundary>
        <Suspense fallback={<div className="loading">Loading page...</div>}>
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
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default App;
