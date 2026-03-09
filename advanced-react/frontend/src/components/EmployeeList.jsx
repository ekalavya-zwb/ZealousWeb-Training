import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useEmployees from "../hooks/useEmployees";
import "../styles/Employees.css";

function EmployeeList() {
  const { employees, loading, error, fetchEmployees, deleteEmployee } =
    useEmployees();

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const formatDate = (date) => (date ? date.split("T")[0] : "");
  const navigate = useNavigate();

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="employee-table">
      <div className="header">
        <h1>Employees</h1>
        <button type="button" onClick={() => navigate("/add")}>
          Add Employee
        </button>
      </div>
      <table border={2}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Hire Date</th>
            <th>Salary</th>
            <th>Dept ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="6">No employees found</td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.first_name}</td>
                <td>{employee.last_name}</td>
                <td>{employee.email}</td>
                <td>{formatDate(employee.hire_date)}</td>
                <td>${employee.salary}</td>
                <td>{employee.dept_id}</td>
                <td>{employee.state}</td>
                <td>
                  <button
                    className="action-btn"
                    type="button"
                    onClick={() => navigate(`/edit/${employee.id}`)}
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    className="action-btn"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this employee?",
                        )
                      ) {
                        deleteEmployee(employee.id);
                      }
                    }}
                    style={{ marginLeft: "5px" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
