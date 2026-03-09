import { useEmployees } from "../queries/useEmployees";
import { useUpdateEmployee } from "../mutations/useUpdateEmployee";
import { useDeleteEmployee } from "../mutations/useDeleteEmployee";

import "../styles/Employees.css";

function Employees() {
  const { data, isLoading, error } = useEmployees();
  const { mutate: updateEmployee, isPending: isUpdating } = useUpdateEmployee();
  const { mutate: deleteEmployee, isPending: isDeleting } = useDeleteEmployee();

  function handleUpdate(id) {
    updateEmployee({
      id,
      data: {
        salary: 80000,
      },
    });
  }

  function handleDelete(id) {
    deleteEmployee(id);
  }

  const formatDate = (date) => (date ? date.split("T")[0] : "-");

  if (isLoading) return <p>Loading employees...</p>;
  if (error) return <p>Error loading employees</p>;

  return (
    <div className="employee-table">
      <table border={2}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Hire Date</th>
            <th>Salary</th>
            <th>Dept ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>
                {emp.first_name} {emp.last_name}
              </td>
              <td>{emp.email}</td>
              <td>{formatDate(emp.hire_date)}</td>
              <td>{emp.salary}</td>
              <td>{emp.dept_id}</td>
              <td>{emp.state}</td>
              <td>
                <button
                  className="action-btn"
                  type="button"
                  disabled={isUpdating}
                  onClick={() => handleUpdate(emp.id)}
                >
                  {isUpdating ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  className="action-btn"
                  style={{ marginLeft: "5px" }}
                  disabled={isDeleting}
                  onClick={() => handleDelete(emp.id)}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees;
