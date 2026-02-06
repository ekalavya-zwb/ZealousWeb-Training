import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

const CreateEmployee = () => {
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
  const [loading, setLoading] = useState(false);

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
      alert("Input fields cannot remain empty!");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/employees`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...inputs,
            salary: Number(inputs.salary),
            dept_id: Number(inputs.dept_id),
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          `Failed to create employee with status ${response.status}`,
        );
      }

      const createdEmployee = await response.json();
      console.log(createdEmployee);

      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
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
          disabled={loading}
        >
          {loading ? " Creating..." : "Create"}
        </Button>
      </Box>
    </>
  );
};

export default CreateEmployee;
