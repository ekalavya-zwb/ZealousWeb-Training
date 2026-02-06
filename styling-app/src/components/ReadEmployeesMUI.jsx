import React, { useState } from "react";
import useEmployee from "./useEmployee";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const ReadEmployeesMUI = () => {
  const { employees, error, loading, refetch } = useEmployee(
    `${import.meta.env.VITE_API_URL}/employees`,
  );

  const [deletingId, setDeletingId] = useState(null);

  const formatDate = (isoStr) => isoStr.split("T")[0];
  const roundSalary = (sal) => Number(sal.toFixed(0));

  const deleteEmployee = async (id) => {
    if (!window.confirm("Delete this employee?")) return;

    setDeletingId(id);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/employees/${id}`,
        { method: "DELETE" },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete employee with status ${response.status}`,
        );
      }

      refetch();
    } catch (error) {
      alert(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <p>Loading Employees...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Hire Date</TableCell>
            <TableCell>Department ID</TableCell>
            <TableCell>State</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>
                {employee.first_name} {employee.last_name}
              </TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>
                ${roundSalary(Number(employee.salary)).toLocaleString()}
              </TableCell>
              <TableCell>{formatDate(employee.hire_date)}</TableCell>
              <TableCell>{employee.dept_id}</TableCell>
              <TableCell>{employee.state}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteEmployee(employee.id)}
                >
                  {employee.id === deletingId ? "Deleting..." : "Delete"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReadEmployeesMUI;
