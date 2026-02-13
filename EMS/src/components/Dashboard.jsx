import React from "react";
import { useQuery } from "@tanstack/react-query";
import StatsSection from "./StatsSection";
import AuthContext from "../context/AuthContext";
import {
  Container,
  Typography,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";

const Dashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to load metrics.");
      }

      return res.json();
    },
  });

  if (isLoading) {
    return (
      <Typography align="center" fontWeight={600}>
        Loading Dashboard...
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

  const primaryStats = [
    { label: "Total Employees", value: data.totalEmployees },
    { label: "Total Departments", value: data.totalDepartments },
    {
      label: "Avg Salary",
      value: `$${Number(data.avgSalary).toLocaleString()}`,
    },
  ];
  const employeeStats = [
    { label: "Total Employees", value: data.totalEmployees },
    { label: "Active", value: data.active },
    { label: "On Projects", value: data.onProject },
    { label: "Terminated", value: data.terminated },
    { label: "On Boarded", value: data.onBoarded },
  ];
  const departmentStats = [
    { label: "Total Departments", value: data.totalDepartments },
    { label: "Engineers", value: data.totalEng },
    { label: "Marketer", value: data.totalMark },
    { label: "Salesperson", value: data.totalSale },
    { label: "HR Manager", value: data.totalHR },
  ];
  const salaryStats = [
    {
      label: "Average Salary (Overall)",
      value: `$${Number(data.avgSalary).toLocaleString()}`,
    },
    {
      label: "Engineering",
      value: `$${Number(data.avgSalEng).toLocaleString()}`,
    },
    {
      label: "Marketing",
      value: `$${Number(data.avgSalMark).toLocaleString()}`,
    },
    {
      label: "Sales",
      value: `$${Number(data.avgSalSale).toLocaleString()}`,
    },
    {
      label: "HR",
      value: `$${Number(data.avgSalHR).toLocaleString()}`,
    },
  ];

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" fontWeight={700} mb={4}>
          Dashboard
        </Typography>

        <Grid container spacing={3} mb={5}>
          {primaryStats.map((item, index) => (
            <Grid size={{ xs: 12, sm: 4 }} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  textAlign: "center",
                  backgroundColor: "grey.100",
                }}
              >
                <Typography variant="subtitle2">{item.label}</Typography>

                <Typography variant="h4" fontWeight={700} mt={1}>
                  {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <StatsSection title="Employee Statistics" stats={employeeStats} />
        <StatsSection title="Department Statistics" stats={departmentStats} />
        <StatsSection title="Salary Statistics" stats={salaryStats} />
      </Container>
    </>
  );
};

export default Dashboard;
