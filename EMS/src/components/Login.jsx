import React, { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Paper,
  Divider,
} from "@mui/material";

const Login = () => {
  const emptyForm = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const loginMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Invalid email or password");
      }

      return res.json();
    },
    onSuccess: (data) => {
      login(data.employee, data.token);
      navigate("/");
    },
  });

  const [inputs, setInputs] = useState(emptyForm);
  const [error, setError] = useState({});

  const handleInputs = (event) => {
    const { name, value } = event.target;

    setInputs((prev) => ({ ...prev, [name]: value }));

    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const newErrors = {};

    if (inputs.email.trim() === "") {
      newErrors.email = "Email cannot remain empty";
    } else if (!/\S+@\S+\.\S+/.test(inputs.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!inputs.password) {
      newErrors.password = "Password is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    loginMutation.mutate(inputs);
    setError({});
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          maxWidth: 500,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "90vh",
          mx: "auto",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: 400,
            p: 4,
            borderRadius: 3,
            border: "1px solid #e0e0e0",
            backgroundColor: "background.paper",
          }}
        >
          {loginMutation.isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              <Typography fontWeight={600}>
                {loginMutation.error.message}
              </Typography>
            </Alert>
          )}

          <Typography variant="h4" gutterBottom align="center">
            Login
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <TextField
            label="Email"
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleInputs}
            fullWidth
            margin="normal"
            autoFocus
          />
          {error.email && (
            <Alert severity="error" variant="standard">
              {error.email}
            </Alert>
          )}

          <TextField
            label="Password"
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleInputs}
            fullWidth
            margin="normal"
          />
          {error.password && (
            <Alert severity="error" variant="standard">
              {error.password}
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loginMutation.isLoading}
          >
            {loginMutation.isLoading ? "Submitting..." : "Submit"}
          </Button>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
