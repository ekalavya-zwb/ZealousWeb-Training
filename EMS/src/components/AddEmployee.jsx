import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  Stack,
  Divider,
  Alert,
} from "@mui/material";

const Row = ({ label, value }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      gap: 2,
    }}
  >
    <Typography color="text.secondary">{label}</Typography>
    <Typography fontWeight={500}>{value}</Typography>
  </Box>
);

const AddEmployee = () => {
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
  const [step, setStep] = useState(1);
  const [error, setError] = useState({});

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
        throw new Error("Failed to create Employee.");
      }

      return res.json();
    },

    onSuccess: (createdEmployeeMsg) => {
      queryClient.invalidateQueries(["employees"]);
      setInputs(emptyForm);
      console.log(createdEmployeeMsg);
      navigate("/employees");
    },
  });

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();
    addMutation.mutate(inputs);
  };

  const validateForm = () => {
    const newErrors = {};

    if (step === 1) {
      if (inputs.first_name.trim() === "") {
        newErrors.first_name = "First name cannot remain empty";
      }
      if (inputs.last_name.trim() === "") {
        newErrors.last_name = "Last name cannot remain empty";
      }
      if (inputs.email.trim() === "") {
        newErrors.email = "Email cannot remain empty";
      } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
        newErrors.email = "Invalid email format";
      }
    }

    if (step === 2) {
      if (!inputs.dept_id) {
        newErrors.dept_id = "Department cannot remain empty";
      } else if (Number(inputs.dept_id) <= 0) {
        newErrors.dept_id = "Invalid department";
      }

      if (!inputs.salary) {
        newErrors.salary = "Salary cannot remain empty";
      } else if (Number(inputs.salary) <= 0) {
        newErrors.salary = "Salary must be greater than 0";
      }

      if (!inputs.hire_date) {
        newErrors.hire_date = "Hire date cannot remain empty";
      } else if (inputDate > today) {
        newErrors.hire_date = "Hire date cannot be in the future";
      }

      if (inputs.state.trim() === "") {
        newErrors.state = "Status cannot remain empty";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    nextStep();
  };

  const today = new Date();
  const inputDate = new Date(inputs.hire_date);

  const nextStep = () => {
    setError({});
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setError({});
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
  };

  return (
    <>
      {addMutation.isError && (
        <Typography color="error" mt={2} align="center">
          {addMutation.error.message}
        </Typography>
      )}

      <Box
        component="form"
        onSubmit={handleCreateUser}
        sx={{ maxWidth: 500, mx: "auto" }}
      >
        {step === 1 && (
          <>
            <Typography variant="h4" gutterBottom align="center">
              Step 1: Personal Info
            </Typography>
            <TextField
              label="First Name"
              name="first_name"
              value={inputs.first_name}
              onChange={handleInputs}
              fullWidth
              margin="normal"
            />
            {error.first_name && (
              <Alert severity="error" variant="standard">
                {error.first_name}
              </Alert>
            )}
            <TextField
              label="Last Name"
              name="last_name"
              value={inputs.last_name}
              onChange={handleInputs}
              fullWidth
              margin="normal"
            />
            {error.last_name && (
              <Alert severity="error" variant="standard">
                {error.last_name}
              </Alert>
            )}
            <TextField
              label="Email"
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleInputs}
              fullWidth
              margin="normal"
            />
            {error.email && (
              <Alert severity="error" variant="standard">
                {error.email}
              </Alert>
            )}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 2,
              }}
            >
              <Button variant="contained" sx={{ flex: 1 }} onClick={prevStep}>
                Back
              </Button>
              <Button
                variant="contained"
                sx={{ flex: 1 }}
                onClick={validateForm}
                disabled={addMutation.isLoading}
              >
                Next
              </Button>
            </Box>
          </>
        )}

        {step === 2 && (
          <>
            <Typography variant="h4" gutterBottom align="center">
              Step 2: Employment Info
            </Typography>
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
            {error.hire_date && (
              <Alert severity="error" variant="standard">
                {error.hire_date}
              </Alert>
            )}
            <TextField
              label="Salary"
              type="number"
              name="salary"
              value={inputs.salary}
              onChange={handleInputs}
              fullWidth
              margin="normal"
            />
            {error.salary && (
              <Alert severity="error" variant="standard">
                {error.salary}
              </Alert>
            )}
            <TextField
              label="Department ID"
              type="number"
              name="dept_id"
              value={inputs.dept_id}
              onChange={handleInputs}
              fullWidth
              margin="normal"
            />
            {error.dept_id && (
              <Alert severity="error" variant="standard">
                {error.dept_id}
              </Alert>
            )}
            <TextField
              label="Status"
              name="state"
              value={inputs.state}
              onChange={handleInputs}
              fullWidth
              margin="normal"
            />
            {error.state && (
              <Alert severity="error" variant="standard">
                {error.state}
              </Alert>
            )}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 2,
              }}
            >
              <Button variant="contained" sx={{ flex: 1 }} onClick={prevStep}>
                Back
              </Button>
              <Button
                variant="contained"
                sx={{ flex: 1 }}
                onClick={validateForm}
                disabled={addMutation.isLoading}
              >
                Next
              </Button>
            </Box>
          </>
        )}

        {step === 3 && (
          <>
            <Card sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
              <Typography variant="h4" gutterBottom align="center">
                Step 3: Review & Submit
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1.5}>
                <Row
                  label="Full Name"
                  value={`${inputs.first_name} ${inputs.last_name}`}
                />
                <Row label="Email" value={inputs.email} />
                <Row
                  label="Salary"
                  value={`$${Number(inputs.salary).toLocaleString()}`}
                />
                <Row label="Hire Date" value={inputs.hire_date} />
                <Row label="Department" value={inputs.dept_id} />
                <Row label="Status" value={inputs.state} />
              </Stack>
            </Card>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                mt: 2,
              }}
            >
              <Button variant="contained" sx={{ flex: 1 }} onClick={prevStep}>
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ flex: 1 }}
                disabled={addMutation.isLoading}
              >
                {addMutation.isLoading ? "Submitting..." : "Submit"}
              </Button>
            </Box>
          </>
        )}
        <Typography color="textPrimary" align="center" mt={2}>
          Step {step} of 3
        </Typography>
      </Box>
    </>
  );
};

export default AddEmployee;
