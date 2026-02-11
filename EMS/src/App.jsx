import { Routes, Route } from "react-router-dom";
import "./App.css";
import AddEmployee from "./components/AddEmployee";
import EmployeeList from "./components/EmployeeList";
import Dashboard from "./components/Dashboard";
import PageNotFound from "./components/PageNotFound";
import EditEmployee from "./components/EditEmployee";
import DepartmentList from "./components/DepartmentList";
import AddDepartment from "./components/AddDepartment";
import EditDepartment from "./components/EditDepartment";
import EmployeeDetail from "./components/EmployeeDetail";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/employees" element={<EmployeeList />}></Route>
          <Route
            path="/employeeDetail/:id"
            element={<EmployeeDetail />}
          ></Route>
          <Route path="/departments" element={<DepartmentList />}></Route>
          <Route path="/employees/add" element={<AddEmployee />}></Route>
          <Route path="/departments/add" element={<AddDepartment />}></Route>
          <Route path="/employees/edit/:id" element={<EditEmployee />}></Route>
          <Route
            path="/departments/edit/:dept_id"
            element={<EditDepartment />}
          ></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
