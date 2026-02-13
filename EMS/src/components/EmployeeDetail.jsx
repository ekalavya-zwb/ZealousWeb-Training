import React from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  CircularProgress,
  Typography,
  Stack,
  Box,
  Card,
  Divider,
  Alert,
  Button,
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

const EmployeeDetail = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["employeeView", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await fetch(`/api/employees/view/${id}`, {
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error("Failed to retrieve employee.");
      }

      return result;
    },
  });

  const formatDate = (isoStr) => isoStr.split("T")[0];
  const roundSalary = (sal) => Number(sal.toFixed(0));

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

  return (
    <>
      <Card sx={{ maxWidth: 500, mx: "auto", p: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Employee Details
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Stack spacing={1.5}>
          <Row
            label="Full Name"
            value={`${data.first_name} ${data.last_name}`}
          />
          <Row label="Email" value={data.email} />
          <Row
            label="Salary"
            value={`$${roundSalary(Number(data.salary)).toLocaleString()}`}
          />
          <Row label="Hire Date" value={formatDate(data.hire_date)} />
          <Row label="Department" value={data.dept_name} />
          <Row label="Status" value={data.state} />
        </Stack>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          component={NavLink}
          to={`/employees/assign/${data.id}`}
          disabled={data.state !== "ACTIVE"}
          sx={{
            mt: 2,
            "&.Mui-disabled": {
              backgroundColor: "#90caf9",
              color: "#fff",
              opacity: 1,
            },
          }}
        >
          {data.state !== "ACTIVE"
            ? `Employee is ${data.state}`
            : "Assign Employee"}
        </Button>
      </Card>
    </>
  );
};

export default EmployeeDetail;
