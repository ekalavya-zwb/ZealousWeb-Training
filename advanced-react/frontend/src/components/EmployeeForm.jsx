import { useCreateEmployee } from "../mutations/useCreateEmployee";
import "../styles/Employees.css";

export function EmployeeForm() {
  const { mutate, isPending, error } = useCreateEmployee();

  const handleSubmit = (e) => {
    e.preventDefault();

    const employee = {
      first_name: "Ekalavya",
      last_name: "Patel",
      email: "ekalavya.patel@company.com",
      hire_date: "2022-01-05",
      salary: 75000,
      dept_id: 1,
      state: "ONPROJECT",
    };

    mutate(employee);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button
        type="submit"
        style={{ marginLeft: "20px", padding: "5px 10px", cursor: "pointer" }}
      >
        {isPending ? "Creating..." : "Create Employee"}
      </button>

      {error && <p style={{ margin: "10px 20px" }}>Error creating employee</p>}
    </form>
  );
}
