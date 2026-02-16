import React, { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
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
  CircularProgress,
  MenuItem,
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
  const [formError, setFormError] = useState({});

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
        throw new Error("Failed to create employee.");
      }

      return res.json();
    },

    onSuccess: (createdEmployeeMsg) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setInputs(emptyForm);
      console.log(createdEmployeeMsg);
      navigate("/employees");
    },
  });

  const handleInputs = (event) => {
    const { name, value } = event.target;

    setInputs((prev) => ({ ...prev, [name]: value }));

    if (formError[name]) {
      setFormError((prev) => ({ ...prev, [name]: "" }));
    }
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
      setFormError(newErrors);
      return;
    }

    nextStep();
  };

  const today = new Date();
  const inputDate = new Date(inputs.hire_date);

  const selectedDept = data.find(
    (department) => department.dept_id === Number(inputs.dept_id),
  );

  const nextStep = () => {
    setFormError({});
    setStep((prevStep) => prevStep + 1);
  };
  const prevStep = () => {
    setFormError({});
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep));
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

  return (
    <>
      {addMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography fontWeight={600}>{addMutation.error.message}</Typography>
        </Alert>
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
            {formError.first_name && (
              <Alert severity="error" variant="standard">
                {formError.first_name}
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
            {formError.last_name && (
              <Alert severity="error" variant="standard">
                {formError.last_name}
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
            {formError.email && (
              <Alert severity="error" variant="standard">
                {formError.email}
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
            {formError.hire_date && (
              <Alert severity="error" variant="standard">
                {formError.hire_date}
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
            {formError.salary && (
              <Alert severity="error" variant="standard">
                {formError.salary}
              </Alert>
            )}

            <TextField
              select
              label="Department"
              name="dept_id"
              value={inputs.dept_id}
              onChange={handleInputs}
              fullWidth
              margin="normal"
              disabled={isLoading}
            >
              {data.map((department) => (
                <MenuItem key={department.dept_id} value={department.dept_id}>
                  {department.dept_name}
                </MenuItem>
              ))}
            </TextField>
            {formError.dept_id && (
              <Alert severity="error" variant="standard">
                {formError.dept_id}
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
            {formError.state && (
              <Alert severity="error" variant="standard">
                {formError.state}
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
                <Row
                  label="Department"
                  value={selectedDept ? selectedDept.dept_name : ""}
                />
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
