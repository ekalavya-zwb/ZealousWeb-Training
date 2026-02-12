import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Typography,
  Button,
  TextField,
  Box,
  Alert,
  MenuItem,
  FormControl,
  Select,
  CircularProgress,
} from "@mui/material";

const AssignProject = () => {
  const { id } = useParams();

  const emptyForm = {
    project_id: "",
    hours_worked: "",
    role: "",
  };

  const [inputs, setInputs] = useState(emptyForm);
  const [formError, setFormError] = useState({});

  const {
    data = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const res = await fetch("/api/projects", {
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error("Failed to load employees.");
      }

      return result;
    },
  });

  const addMutation = useMutation({
    mutationFn: async (assignedEmployee) => {
      const res = await fetch(`/api/employees/assign/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assignedEmployee),
      });

      if (!res.ok) {
        throw new Error("Failed to assign employee.");
      }

      return res.json();
    },

    onSuccess: (assignedEmployeeMsg) => {
      setInputs(emptyForm);
      console.log(assignedEmployeeMsg);
    },
  });

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleAssignUser = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (!inputs.project_id) {
      newErrors.project_id = "Project ID is required";
    } else if (Number(inputs.project_id) <= 0) {
      newErrors.project_id = "Invalid project ID";
    }
    if (!inputs.hours_worked) {
      newErrors.hours_worked = "Work hours is required";
    } else if (Number(inputs.hours_worked) <= 0) {
      newErrors.hours_worked = "Invalid work hours";
    }
    if (inputs.role.trim() === "") {
      newErrors.role = "Role cannot remain empty";
    }
    if (Object.keys(newErrors).length > 0) {
      setFormError(newErrors);
      return;
    }

    setFormError(emptyForm);
    addMutation.mutate(inputs);
  };

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

  return (
    <>
      <Box
        component="form"
        onSubmit={handleAssignUser}
        sx={{ maxWidth: 500, mx: "auto" }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Assign Employee
        </Typography>
        <TextField
          select
          label="Project"
          name="project_id"
          value={inputs.project_id}
          onChange={handleInputs}
          fullWidth
          margin="normal"
          disabled={isLoading}
        >
          {data.map((project) => (
            <MenuItem key={project.project_id} value={project.project_id}>
              {project.project_name}
            </MenuItem>
          ))}
        </TextField>

        {formError.project_id && (
          <Alert severity="error" variant="standard">
            {formError.project_id}
          </Alert>
        )}
        <TextField
          label="Work Hours"
          type="number"
          name="hours_worked"
          value={inputs.hours_worked}
          onChange={handleInputs}
          fullWidth
          margin="normal"
        />
        {formError.hours_worked && (
          <Alert severity="error" variant="standard">
            {formError.hours_worked}
          </Alert>
        )}
        <TextField
          label="Role"
          name="role"
          value={inputs.role}
          onChange={handleInputs}
          fullWidth
          margin="normal"
        />
        {formError.role && (
          <Alert severity="error" variant="standard">
            {formError.role}
          </Alert>
        )}
        <Button type="submit" variant="contained" sx={{ mt: 2 }} fullWidth>
          Assign
        </Button>
      </Box>
    </>
  );
};

export default AssignProject;
