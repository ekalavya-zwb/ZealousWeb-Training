import "./App.css";
import { Routes, Route } from "react-router-dom";
import InputFocus from "./components/InputFocus";
// import Counter from "./components/Counter";
import Timer from "./components/Timer";
import TextEditor from "./components/TextEditor";
import Parent from "./components/Parent";
import Users from "./components/Users";
import Accordion from "./components/Accordion";
import Guardian from "./components/Guardian";
import Dashboard from "./components/Dashboard";
import ProtectedDashboard from "./pages/ProtectedDashboard";
import ProtectedSalaryReport from "./pages/ProtectedSalaryReport";
import useToast from "./hooks/useToast";
import Counter from "./Zustand/components/Counter";
import SignIn from "./components/SignIn";
import ProtectedRoute from "./routes/ProtectedRoute";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import Employees from "./components/Employees";
import { EmployeeForm } from "./components/EmployeeForm";
import EditEmployee from "./components/EditEmployee";

function App() {
  // const { addToast } = useToast();

  return (
    <>
      {/* <InputFocus /> */}
      {/* <Counter /> */}
      {/* <Timer /> */}
      {/* <TextEditor /> */}
      {/* <Parent /> */}
      {/* <Guardian /> */}
      {/* <Users /> */}
      {/* <Accordion allowMultiple>
        <Accordion.Item id="1">
          <Accordion.Body>
            React is a JavaScript library for building UI.
          </Accordion.Body>
          <Accordion.Header>What is React?</Accordion.Header>
        </Accordion.Item>
        <Accordion.Item id="2">
          <Accordion.Header>What is a Hook?</Accordion.Header>
          <Accordion.Body>
            Hooks let you use state and lifecycle features.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}
      {/* <AuthDashboard /> */}
      {/* <Routes>
        <Route path="/" element={<h2>Homepage</h2>} />
        <Route
          path="/dashboard"
          element={<ProtectedDashboard isLoading={false} />}
        />
        <Route
          path="/salaryReport"
          element={<ProtectedSalaryReport isLoading={false} />}
        />
      </Routes> */}
      <>
        {/* <h1>Toast Notifications</h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "5px",
          }}
        >
          <button onClick={() => addToast("Employee saved!", "success", 3000)}>
            Success Toast
          </button>
          <button onClick={() => addToast("Failed to delete", "error")}>
            Error Toast
          </button>
          <button onClick={() => addToast("Warning message", "warning")}>
            Warning Toast
          </button>
          <button onClick={() => addToast("Information message")}>
            Info Toast
          </button>
        </div> */}
        {/* <Counter /> */}
        {/* <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes> */}
        {/* <Routes>
          <Route path="/" element={<EmployeeList />}></Route>
          <Route path="/add" element={<AddEmployee />}></Route>
          <Route path="/edit/:id" element={<EditEmployee />}></Route>
        </Routes> */}
        {/* <Employees />
        <EmployeeForm /> */}
      </>
    </>
  );
}

export default App;
