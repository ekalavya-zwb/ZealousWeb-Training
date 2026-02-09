import React from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";

const Users = () => {
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await fetch("/api/employees", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (employeeId) => {
      const res = await fetch(`/api/employees/${employeeId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete Employee: ${res.status}`);
      }

      return res.json();
    },

    onSuccess: (deletedEmployee) => {
      queryClient.invalidateQueries(["employees"]);
      console.log(deletedEmployee);
    },
  });

  const deleteEmployee = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteMutation.mutate(id);
    }
  };

  const formatDate = (isoStr) => isoStr.split("T")[0];
  const roundSalary = (sal) => Number(sal.toFixed(0));

  if (isLoading) {
    return (
      <Typography align="center" mt={3}>
        Loading Employees...
        <CircularProgress sx={{ display: "block", mx: "auto", mt: 2 }} />
      </Typography>
    );
  }
  if (error) {
    return (
      <Typography color="error" align="center" mt={3}>
        {error.message}
      </Typography>
    );
  }

  return (
    <>
      {deleteMutation.isError && (
        <Typography color="error" align="center" mt={2}>
          {deleteMutation.error.message}
        </Typography>
      )}

      {data.length === 0 && (
        <Typography align="center" mt={3}>
          No employees found.
        </Typography>
      )}

      <TableContainer component={Paper}>
        <Table
          sx={{
            "& th, & td": {
              textAlign: "center",
              verticalAlign: "middle",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Hire Date</TableCell>
              <TableCell>Department ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((employee) => (
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
                    disabled={deleteMutation.isLoading}
                  >
                    {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
