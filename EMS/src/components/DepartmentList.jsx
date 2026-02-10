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
        throw new Error(`Request failed: ${res.status}`);
      }

      return res.json();
    },
  });

  const newData = React.useMemo(() => {
    return data.filter((department) => {
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
        !department.location
          .toLowerCase()
          .includes(location.toLowerCase().trim())
      )
        return false;

      if (dept_id && Number(department.dept_id) !== Number(dept_id))
        return false;

      return true;
    });
  }, [data, filters]);

  const deleteMutation = useMutation({
    mutationFn: async (deptId) => {
      const res = await fetch(`/api/departments/${deptId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete Department: ${res.status}`);
      }

      return res.json();
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
              <Typography variant="subtitle2">Dept ID</Typography>
              <TextField
                size="small"
                type="number"
                fullWidth
                placeholder="1"
                value={filters.dept_id}
                onChange={(event) =>
                  updateFilters("dept_id", event.target.value)
                }
                style={{ width: 60 }}
              />
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2"> Department</Typography>
              <TextField
                size="small"
                fullWidth
                placeholder="Engineering"
                value={filters.dept_name}
                onChange={(event) =>
                  updateFilters("dept_name", event.target.value)
                }
              />
            </TableCell>
            <TableCell>
              <Typography variant="subtitle2"> Location</Typography>
              <TextField
                size="small"
                fullWidth
                placeholder="New York"
                value={filters.location}
                onChange={(event) =>
                  updateFilters("location", event.target.value)
                }
              />
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
          Departments does not exist.
        </Typography>
      )}

      {newData.length === 0 && (
        <Typography align="center" mt={3}>
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
            <TableCell>Action</TableCell>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DepartmentList;
