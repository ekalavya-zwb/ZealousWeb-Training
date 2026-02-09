import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

const AddUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const emptyForm = {
    first_name: "",
    last_name: "",
    email: "",
    hire_date: "",
    salary: "",
    dept_id: "",
    state: "",
  };

  const [inputs, setInputs] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  const addMutation = useMutation({
    mutationFn: async (newEmployee) => {
      const res = await fetch("/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });

      if (!res.ok) {
        throw new Error(`Failed to create Employee: ${res.status}`);
      }

      return res.json();
    },

    onSuccess: (createdEmployee) => {
      queryClient.invalidateQueries(["employees"]);
      setInputs(emptyForm);
      console.log(createdEmployee);
      navigate("/employees");
    },
  });

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();

    if (
      !inputs.first_name ||
      !inputs.last_name ||
      !inputs.email ||
      !inputs.salary ||
      Number(inputs.salary) <= 0 ||
      !inputs.hire_date ||
      !inputs.dept_id ||
      Number(inputs.dept_id) <= 0 ||
      !inputs.state
    ) {
      setFormError("All fields are required");
      return;
    }

    setFormError("");
    addMutation.mutate(inputs);
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleCreateUser}
        sx={{ maxWidth: 500, mx: "auto", mt: 4 }}
      >
        <Typography variant="h4" gutterBottom>
          Create User
        </Typography>
        <TextField
          label="First Name"
          name="first_name"
          value={inputs.first_name}
          onChange={handleInputs}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={inputs.last_name}
          onChange={handleInputs}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          name="email"
          value={inputs.email}
          onChange={handleInputs}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Hire Date"
          type="date"
          name="hire_date"
          value={inputs.hire_date}
          onChange={handleInputs}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="Salary"
          type="number"
          name="salary"
          value={inputs.salary}
          onChange={handleInputs}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Department ID"
          type="number"
          name="dept_id"
          value={inputs.dept_id}
          onChange={handleInputs}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Status"
          name="state"
          value={inputs.state}
          onChange={handleInputs}
          fullWidth
          margin="normal"
        />
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

      {formError && (
        <Typography color="error" align="center" mt={2}>
          {formError}
        </Typography>
      )}

      {addMutation.isError && (
        <Typography color="error" mt={2} align="center">
          {addMutation.error.message}
        </Typography>
      )}
    </>
  );
};

export default AddUser;
