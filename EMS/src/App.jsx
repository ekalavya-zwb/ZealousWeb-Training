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
import AssignProject from "./components/AssignProject";
import AuthProvider from "./context/AuthProvider";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <>
      <ErrorBoundary>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/departments" element={<DepartmentList />} />
              <Route path="/employees/assign/:id" element={<AssignProject />} />
              <Route path="/employees/add" element={<AddEmployee />} />
              <Route path="/departments/add" element={<AddDepartment />} />
              <Route path="/employees/edit/:id" element={<EditEmployee />} />
              <Route
                path="/departments/edit/:dept_id"
                element={<EditDepartment />}
              />
              <Route path="/employees/view/:id" element={<EmployeeDetail />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
