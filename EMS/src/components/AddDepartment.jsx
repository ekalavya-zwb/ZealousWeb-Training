import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";

const AddDepartment = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const emptyForm = {
    dept_name: "",
    location: "",
  };

  const [inputs, setInputs] = useState(emptyForm);
  const [error, setError] = useState({});

  const addMutation = useMutation({
    mutationFn: async (newDepartment) => {
      const res = await fetch("/api/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDepartment),
      });

      if (!res.ok) {
        throw new Error("Failed to create department.");
      }

      return res.json();
    },

    onSuccess: (createdDepartmentMsg) => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      setInputs(emptyForm);
      console.log(createdDepartmentMsg);
      navigate("/departments");
    },
  });

  const handleInputs = (event) => {
    const { name, value } = event.target;

    setInputs((prev) => ({ ...prev, [name]: value }));

    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCreateDept = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (inputs.dept_name.trim() === "") {
      newErrors.dept_name = "Department name cannot remain empty";
    }
    if (inputs.location.trim() === "") {
      newErrors.location = "Department location cannot remain empty";
    }
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setError({});
    addMutation.mutate(inputs);
  };

  return (
    <>
      {addMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography fontWeight={600}>{addMutation.error.message}</Typography>
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleCreateDept}
        sx={{ maxWidth: 500, mx: "auto" }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Create Department
        </Typography>

        <TextField
          label="Department"
          name="dept_name"
          value={inputs.dept_name}
          onChange={handleInputs}
          fullWidth
          margin="normal"
        />
        {error.dept_name && (
          <Alert severity="error" variant="standard">
            {error.dept_name}
          </Alert>
        )}

        <TextField
          label="Location"
          name="location"
          value={inputs.location}
          onChange={handleInputs}
          fullWidth
          margin="normal"
        />
        {error.location && (
          <Alert severity="error" variant="standard">
            {error.location}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          disabled={addMutation.isLoading}
        >
          {addMutation.isLoading ? "Creating..." : "Create"}
        </Button>
      </Box>
    </>
  );
};

export default AddDepartment;
