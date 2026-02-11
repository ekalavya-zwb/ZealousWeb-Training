import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  CircularProgress,
  Typography,
  Stack,
  Box,
  Card,
  Divider,
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
    queryKey: ["employeeDetail", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await fetch(`/api/employeeDetail/${id}`, {
        cache: "no-store",
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.error || `Request failed with status ${res.status}`,
        );
      }

      return result;
    },
  });

  const formatDate = (isoStr) => isoStr.split("T")[0];
  const roundSalary = (sal) => Number(sal.toFixed(0));

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
      {data.length === 0 && (
        <Typography align="center" color="error">
          No employees found.
        </Typography>
      )}

      <Card sx={{ maxWidth: 500, mx: "auto", p: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Employee Details
        </Typography>
        <Divider sx={{ my: 2 }} />
        {data.map((employee) => (
          <Stack spacing={1.5} key={employee.id}>
            <Row
              label="Full Name"
              value={`${employee.first_name} ${employee.last_name}`}
            />
            <Row label="Email" value={employee.email} />
            <Row
              label="Salary"
              value={`$${roundSalary(Number(employee.salary)).toLocaleString()}`}
            />
            <Row label="Hire Date" value={formatDate(employee.hire_date)} />
            <Row label="Department" value={employee.dept_name} />
            <Row label="Status" value={employee.state} />
          </Stack>
        ))}
      </Card>
    </>
  );
};

export default EmployeeDetail;
