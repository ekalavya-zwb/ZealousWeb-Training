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
  Box,
  Alert,
  Paper,
} from "@mui/material";

const DepartmentList = () => {
  const emptyFilters = {
    dept_id: "",
    dept_name: "",
    location: "",
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
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await fetch("/api/departments", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to load departments.");
      }

      return res.json();
    },
  });

  const newData = data.filter((department) => {
    const { dept_id, dept_name, location } = filters;

    if (
      dept_name &&
      !department.dept_name
        .toLowerCase()
        .includes(dept_name.toLowerCase().trim())
    )
      return false;
    if (
      location &&
      !department.location.toLowerCase().includes(location.toLowerCase().trim())
    )
      return false;
    if (dept_id && Number(department.dept_id) !== Number(dept_id)) return false;

    return true;
  });

  const deleteMutation = useMutation({
    mutationFn: async (deptId) => {
      const res = await fetch(`/api/departments/${deptId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete department.");
      }

      return res.json();
    },

    onSuccess: (deletedDepartment) => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      console.log(deletedDepartment);
    },
  });

  const deleteDepartment = (deptId) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      deleteMutation.mutate(deptId);
    }
  };

  if (isLoading) {
    return (
      <Typography align="center" fontWeight={600}>
        Loading Departments...
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

    const headers = ["Department ID", "Department", "Location"];

    const rows = newData.map((department) => [
      department.dept_id,
      department.dept_name,
      department.location,
    ]);

    const content = [headers, ...rows]
      .map((row) => row.map((value) => `"${value}"`).join(","))
      .join("\n");

    const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "departments.csv";

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
          Departments
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
            Add Department
          </Button>
        </Stack>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Stack direction="row" spacing={3} useFlexGap flexWrap="wrap">
          <TextField
            size="small"
            type="number"
            label="Dept ID"
            value={filters.dept_id}
            onChange={(event) => updateFilters("dept_id", event.target.value)}
            sx={{ width: 100 }}
          />

          <TextField
            size="small"
            label="Department"
            value={filters.dept_name}
            onChange={(event) => updateFilters("dept_name", event.target.value)}
            sx={{ width: 220 }}
          />

          <TextField
            size="small"
            label="Location"
            value={filters.location}
            onChange={(event) => updateFilters("location", event.target.value)}
            sx={{ width: 220 }}
          />

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
            No departments found
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

      <Box sx={{ maxWidth: 1000 }}>
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
                <TableCell>Department ID</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {newData.map((department) => (
                <TableRow key={department.dept_id}>
                  <TableCell>{department.dept_id}</TableCell>
                  <TableCell>{department.dept_name} </TableCell>
                  <TableCell>{department.location} </TableCell>
                  <TableCell>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      justifyContent="center"
                    >
                      <Button
                        component={NavLink}
                        to={`/departments/edit/${department.dept_id}`}
                        variant="outlined"
                        color="warning"
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => deleteDepartment(department.dept_id)}
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

export default DepartmentList;
