import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  MenuItem,
} from "@mui/material";

const EditEmployee = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
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
  const [formError, setFormError] = useState({});

  const {
    data: dept_data = [],
    isLoading: isDept,
    error: isDeptError,
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

  const { data, isLoading, error } = useQuery({
    queryKey: ["employees", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await fetch(`/api/employees/${id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to retrieve employee.");
      }

      return res.json();
    },
  });

  useEffect(() => {
    if (data) {
      setInputs({
        ...data,
        hire_date: data.hire_date?.split("T")[0] || "",
      });
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
        throw new Error("Failed to update employee.");
      }

      return res.json();
    },
    onSuccess: (updatedEmployee) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setInputs(emptyForm);
      console.log(updatedEmployee);
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

  const today = new Date();
  const inputDate = new Date(inputs.hire_date);

  const handleUpdateUser = (event) => {
    event.preventDefault();

    const newErrors = {};

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
    if (Object.keys(newErrors).length > 0) {
      setFormError(newErrors);
      return;
    }

    setFormError({});
    editMutation.mutate(inputs);
  };

  if (isLoading) {
    return (
      <Typography align="center" fontWeight={600}>
        Loading Employee...
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

  if (isDept) {
    return (
      <Typography align="center" fontWeight={600}>
        Loading Departments...
        <CircularProgress sx={{ display: "block", mx: "auto", mt: 2 }} />
      </Typography>
    );
  }
  if (isDeptError) {
    return (
      <Alert severity="error">
        <Typography fontWeight={600}>{isDeptError.message}</Typography>
      </Alert>
    );
  }

  return (
    <>
      {editMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography fontWeight={600}>{editMutation.error.message}</Typography>
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleUpdateUser}
        sx={{ maxWidth: 500, mx: "auto" }}
      >
        <Typography variant="h4" align="center" gutterBottom>
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
          disabled={isDept}
        >
          {dept_data.map((department) => (
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
    </>
  );
};

export default EditEmployee;
