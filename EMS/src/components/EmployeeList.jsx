import React, { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Stack,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

const EmployeeList = () => {
  const emptyFilters = {
    first_name: "",
    last_name: "",
    email: "",
    salaryMin: "",
    salaryMax: "",
    hireDateFrom: "",
    hireDateTo: "",
    dept_id: "",
    state: "",
  };

  const queryClient = useQueryClient();
  const [filters, setFilters] = useState(emptyFilters);

  const updateFilters = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

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

  const newData = React.useMemo(() => {
    return data.filter((employee) => {
      const {
        first_name,
        last_name,
        email,
        salaryMin,
        salaryMax,
        hireDateFrom,
        hireDateTo,
        dept_id,
        state,
      } = filters;

      if (
        first_name &&
        !employee.first_name
          .toLowerCase()
          .includes(first_name.toLowerCase().trim())
      )
        return false;

      if (
        last_name &&
        !employee.last_name
          .toLowerCase()
          .includes(last_name.toLowerCase().trim())
      )
        return false;

      if (
        email &&
        !employee.email.toLowerCase().includes(email.toLowerCase().trim())
      )
        return false;

      if (salaryMin && Number(employee.salary) < Number(salaryMin))
        return false;
      if (salaryMax && Number(employee.salary) > Number(salaryMax))
        return false;

      if (hireDateFrom && new Date(employee.hire_date) < new Date(hireDateFrom))
        return false;
      if (hireDateTo && new Date(employee.hire_date) > new Date(hireDateTo))
        return false;

      if (dept_id && Number(employee.dept_id) !== Number(dept_id)) return false;

      if (state && employee.state.toLowerCase() !== state.toLowerCase())
        return false;

      return true;
    });
  }, [data, filters]);

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
      <Table>
        <TableHead
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "white",
            zIndex: 2,
          }}
        >
          <TableRow>
            <TableCell>
              <Typography variant="subtitle2"> First Name</Typography>
              <TextField
                size="small"
                fullWidth
                placeholder="John"
                value={filters.first_name}
                onChange={(event) =>
                  updateFilters("first_name", event.target.value)
                }
              />
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2"> Last Name</Typography>
              <TextField
                size="small"
                fullWidth
                placeholder="Doe"
                value={filters.last_name}
                onChange={(event) =>
                  updateFilters("last_name", event.target.value)
                }
              />
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2"> Email</Typography>
              <TextField
                size="small"
                fullWidth
                placeholder="john.doe@company.com"
                value={filters.email}
                onChange={(event) => updateFilters("email", event.target.value)}
              />
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2"> Salary</Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  size="small"
                  type="number"
                  placeholder="Min"
                  value={filters.salaryMin}
                  onChange={(event) =>
                    updateFilters("salaryMin", event.target.value)
                  }
                />
                <TextField
                  size="small"
                  type="number"
                  placeholder="Max"
                  value={filters.salaryMax}
                  onChange={(event) =>
                    updateFilters("salaryMax", event.target.value)
                  }
                />
              </Stack>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2"> Hire Date</Typography>
              <Stack direction="row" spacing={1}>
                <TextField
                  size="small"
                  type="date"
                  value={filters.hireDateFrom}
                  onChange={(event) =>
                    updateFilters("hireDateFrom", event.target.value)
                  }
                />
                <TextField
                  size="small"
                  type="date"
                  value={filters.hireDateTo}
                  onChange={(event) =>
                    updateFilters("hireDateTo", event.target.value)
                  }
                />
              </Stack>
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">Dept ID</Typography>
              <TextField
                size="small"
                type="number"
                placeholder="1"
                value={filters.dept_id}
                onChange={(event) =>
                  updateFilters("dept_id", event.target.value)
                }
                style={{ width: 60 }}
              />
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2">Status</Typography>
              <FormControl size="small" fullWidth>
                <Select
                  displayEmpty
                  value={filters.state}
                  onChange={(event) =>
                    updateFilters("state", event.target.value)
                  }
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="OnProject">OnProject</MenuItem>
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="OnBoarded">OnBoarded</MenuItem>
                  <MenuItem value="Terminated">Terminated</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="warning"
                size="small"
                sx={{ mt: 2.5, height: 35 }}
                onClick={() => setFilters(emptyFilters)}
              >
                Clear
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>

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

      {newData.length === 0 && (
        <Typography align="center" mt={3}>
          No employees match your filters.
        </Typography>
      )}

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
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Salary</TableCell>
            <TableCell>Hire Date</TableCell>
            <TableCell>Department ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newData.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.first_name} </TableCell>
              <TableCell>{employee.last_name} </TableCell>
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
    </>
  );
};

export default EmployeeList;
