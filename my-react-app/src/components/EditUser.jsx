import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const EditUser = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const formatDate = (isoStr) => isoStr.split("T")[0];
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

  const { data, isLoading, error } = useQuery({
    queryKey: ["employee", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await fetch(`/api/employees/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
      }

      return res.json();
    },
  });

  useEffect(() => {
    if (data) {
      setInputs(data);
    }
  }, [data]);

  const editMutation = useMutation({
    mutationFn: async (updatedEmployee) => {
      const res = await fetch(`/api/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedEmployee),
      });

      if (!res.ok) {
        throw new Error(`Failed to update Employee: ${res.status}`);
      }

      return res.json();
    },
    onSuccess: (updatedEmployee) => {
      queryClient.invalidateQueries(["employees"]);
      setInputs(emptyForm);
      console.log(updatedEmployee);
      navigate("/employees");
    },
  });

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateUser = (event) => {
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
      setFormError("All fields are required.");
      return;
    }

    setFormError("");
    editMutation.mutate(inputs);
  };

  if (isLoading) {
    return (
      <Typography align="center" mt={3}>
        Loading Employee...
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
      <Box
        component="form"
        onSubmit={handleUpdateUser}
        sx={{ maxWidth: 500, mx: "auto", mt: 4 }}
      >
        <Typography variant="h4" gutterBottom>
          Edit Employee
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
          value={formatDate(inputs.hire_date)}
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
          disabled={editMutation.isLoading}
        >
          {editMutation.isLoading ? "Editing..." : "Edit"}
        </Button>
      </Box>
      {formError && (
        <Typography color="error" align="center" mt={2}>
          {formError}
        </Typography>
      )}
      {editMutation.isError && (
        <Typography color="error" align="center" mt={2}>
          {editMutation.error.message}
        </Typography>
      )}
    </>
  );
};

export default EditUser;
