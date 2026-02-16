import React, { useState } from "react";
import { NavLink } from "react-router-dom";
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
  Box,
  Paper,
  Alert,
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
        throw new Error("Failed to retrieve employees.");
      }

      return res.json();
    },
  });

  const newData = data.filter((employee) => {
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
      !employee.last_name.toLowerCase().includes(last_name.toLowerCase().trim())
    )
      return false;
    if (
      email &&
      !employee.email.toLowerCase().includes(email.toLowerCase().trim())
    )
      return false;
    if (salaryMin && Number(employee.salary) < Number(salaryMin)) return false;
    if (salaryMax && Number(employee.salary) > Number(salaryMax)) return false;
    if (hireDateFrom && new Date(employee.hire_date) < new Date(hireDateFrom))
      return false;
    if (hireDateTo && new Date(employee.hire_date) > new Date(hireDateTo))
      return false;
    if (dept_id && Number(employee.dept_id) !== Number(dept_id)) return false;
    if (state && employee.state.toLowerCase() !== state.toLowerCase())
      return false;

    return true;
  });

  const deleteMutation = useMutation({
    mutationFn: async (employeeId) => {
      const res = await fetch(`/api/employees/${employeeId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to remove employee.");
      }

      return res.json();
    },

    onSuccess: (deletedEmployee) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
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
      <Typography align="center" fontWeight={600}>
        Loading Employees...
        <CircularProgress sx={{ display: "block", mx: "auto", mt: 2 }} />
      </Typography>
    );
  }
  if (error) {
    return (
      <Alert severity="error">
        <Typography fontWeight={600}>{error.message}</Typography>
      </Alert>
    );
  }

  const exportToCSV = () => {
    if (newData.length === 0) return;

    const headers = [
      "ID",
      "First Name",
      "Last Name",
      "Email",
      "Salary",
      "Hire Date",
      "Department ID",
      "Status",
    ];

    const rows = newData.map((employee) => [
      employee.id,
      employee.first_name,
      employee.last_name,
      employee.email,
      roundSalary(Number(employee.salary)),
      formatDate(employee.hire_date),
      employee.dept_id,
      employee.state,
    ]);

    const content = [headers, ...rows]
      .map((row) => row.map((value) => `"${value}"`).join(","))
      .join("\n");

    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "employees.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" fontWeight={600}>
          Employees
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            color="success"
            onClick={exportToCSV}
            disabled={newData.length === 0}
          >
            Export CSV
          </Button>

          <Button
            variant="contained"
            color="primary"
            component={NavLink}
            to="/employees/add"
          >
            Add Employee
          </Button>
        </Stack>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={3} useFlexGap flexWrap="wrap">
          <TextField
            size="small"
            label="First Name"
            sx={{ width: 170 }}
            value={filters.first_name}
            onChange={(e) => updateFilters("first_name", e.target.value)}
          />

          <TextField
            size="small"
            label="Last Name"
            sx={{ width: 170 }}
            value={filters.last_name}
            onChange={(e) => updateFilters("last_name", e.target.value)}
          />

          <TextField
            size="small"
            label="Email"
            sx={{ width: 190 }}
            value={filters.email}
            onChange={(e) => updateFilters("email", e.target.value)}
          />

          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              type="number"
              label="Min Salary"
              sx={{ width: 120 }}
              value={filters.salaryMin}
              onChange={(e) => updateFilters("salaryMin", e.target.value)}
            />
            <TextField
              size="small"
              type="number"
              label="Max Salary"
              sx={{ width: 120 }}
              value={filters.salaryMax}
              onChange={(e) => updateFilters("salaryMax", e.target.value)}
            />
          </Stack>

          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              type="date"
              label="From"
              InputLabelProps={{ shrink: true }}
              sx={{ width: 160 }}
              value={filters.hireDateFrom}
              onChange={(e) => updateFilters("hireDateFrom", e.target.value)}
            />
            <TextField
              size="small"
              type="date"
              label="To"
              InputLabelProps={{ shrink: true }}
              sx={{ width: 160 }}
              value={filters.hireDateTo}
              onChange={(e) => updateFilters("hireDateTo", e.target.value)}
            />
          </Stack>

          <TextField
            size="small"
            type="number"
            label="Dept ID"
            sx={{ width: 100 }}
            value={filters.dept_id}
            onChange={(e) => updateFilters("dept_id", e.target.value)}
          />

          <FormControl size="small" sx={{ width: 160 }}>
            <Select
              displayEmpty
              value={filters.state}
              onChange={(e) => updateFilters("state", e.target.value)}
            >
              <MenuItem value="">All Status</MenuItem>
              <MenuItem value="OnProject">OnProject</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="OnBoarded">OnBoarded</MenuItem>
              <MenuItem value="Terminated">Terminated</MenuItem>
            </Select>
          </FormControl>

          <Button
            color="inherit"
            variant="outlined"
            size="medium"
            sx={{ height: 40 }}
            onClick={() => setFilters(emptyFilters)}
          >
            Clear
          </Button>
        </Stack>
      </Box>

      <Box sx={{ mb: 3 }}>
        {deleteMutation.isError && (
          <Alert severity="error">
            <Typography fontWeight={600}>
              {deleteMutation.error.message}
            </Typography>
          </Alert>
        )}
      </Box>

      {newData.length === 0 && (
        <Box
          sx={{
            textAlign: "center",
            mb: 4,
            color: "text.secondary",
          }}
        >
          <Typography variant="h6" gutterBottom>
            No employees found
          </Typography>
          <Typography variant="body2">
            Try adjusting your filters or clear them.
          </Typography>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => setFilters(emptyFilters)}
          >
            Clear Filters
          </Button>
        </Box>
      )}

      <Box>
        <Paper
          elevation={1}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          <Table
            size="medium"
            sx={{
              "& th": {
                fontWeight: 600,
                backgroundColor: "#f9fafb",
              },
              "& td, & th": {
                borderBottom: "1px solid #eee",
                textAlign: "center",
              },
              "& tr:last-child td": {
                borderBottom: "none",
              },
              "& tbody tr:hover": {
                backgroundColor: "#f5f5f5",
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
                <TableCell>Actions</TableCell>
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
                    <Stack
                      direction="row"
                      spacing={1.5}
                      justifyContent="center"
                    >
                      <Button
                        component={NavLink}
                        to={`/employees/view/${employee.id}`}
                        variant="outlined"
                        color="warning"
                      >
                        View
                      </Button>
                      <Button
                        component={NavLink}
                        to={`/employees/edit/${employee.id}`}
                        variant="outlined"
                        color="info"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteEmployee(employee.id)}
                        disabled={deleteMutation.isLoading}
                      >
                        {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </>
  );
};

export default EmployeeList;
