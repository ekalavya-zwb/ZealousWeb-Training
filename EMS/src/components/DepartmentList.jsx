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
        throw new Error(`Request failed with status ${res.status}`);
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

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to delete Department.");
      }

      return data;
    },

    onSuccess: (deletedDepartment) => {
      queryClient.invalidateQueries(["departments"]);
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
      <Typography align="center" mt={3}>
        Loading Departments...
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
      <Box sx={{ mb: 2 }}>
        <Stack
          direction="row"
          spacing={4}
          justifyContent="center"
          alignItems="center"
        >
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
            variant="contained"
            color="warning"
            size="medium"
            sx={{ height: 40 }}
            onClick={() => setFilters(emptyFilters)}
          >
            Clear
          </Button>
        </Stack>
      </Box>

      {deleteMutation.isError && (
        <Typography color="error" align="center">
          {deleteMutation.error.message}
        </Typography>
      )}

      {data.length === 0 && (
        <Typography align="center" color="error">
          Departments does not exist.
        </Typography>
      )}

      {newData.length === 0 && (
        <Typography align="center" color="error">
          No department match your filters.
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
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteDepartment(department.dept_id)}
                  disabled={deleteMutation.isLoading}
                >
                  {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                </Button>
                <Button
                  component={NavLink}
                  to={`/departments/edit/${department.dept_id}`}
                  variant="contained"
                  color="warning"
                  sx={{ ml: 1 }}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DepartmentList;
