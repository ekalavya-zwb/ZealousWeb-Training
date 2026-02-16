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
} from "@mui/material";

const EditDepartment = () => {
  const queryClient = useQueryClient();
  const { dept_id } = useParams();
  const navigate = useNavigate();

  const emptyForm = {
    dept_name: "",
    location: "",
  };

  const [inputs, setInputs] = useState(emptyForm);
  const [formError, setFormError] = useState({});

  const { data, isLoading, error } = useQuery({
    queryKey: ["departments", dept_id],
    enabled: !!dept_id,
    queryFn: async () => {
      const res = await fetch(`/api/departments/${dept_id}`, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to load department.");
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
    mutationFn: async (newDepartment) => {
      const res = await fetch(`/api/departments/${dept_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDepartment),
      });

      if (!res.ok) {
        throw new Error("Failed to update department.");
      }

      return res.json();
    },
    onSuccess: (updatedDepartmentMsg) => {
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      setInputs(emptyForm);
      console.log(updatedDepartmentMsg);
      navigate("/departments");
    },
  });

  const handleInputs = (event) => {
    const { name, value } = event.target;

    setInputs((prev) => ({ ...prev, [name]: value }));

    if (formError[name]) {
      setFormError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleUpdateDepartment = (event) => {
    event.preventDefault();

    const newErrors = {};

    if (inputs.dept_name.trim() === "") {
      newErrors.dept_name = "Department name cannot remain empty";
    }
    if (inputs.location.trim() === "") {
      newErrors.location = "Department location cannot remain empty";
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
        Loading Department...
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
      {editMutation.isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography fontWeight={600}>{editMutation.error.message}</Typography>
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={handleUpdateDepartment}
        sx={{ maxWidth: 500, mx: "auto" }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Edit Department
        </Typography>

        <TextField
          label="Department"
          name="dept_name"
          value={inputs.dept_name}
          onChange={handleInputs}
          fullWidth
          margin="normal"
        />
        {formError.dept_name && (
          <Alert severity="error" variant="standard">
            {formError.dept_name}
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
        {formError.location && (
          <Alert severity="error" variant="standard">
            {formError.location}
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

export default EditDepartment;
