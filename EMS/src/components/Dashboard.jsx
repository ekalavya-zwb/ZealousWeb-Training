import React from "react";
import { useQuery } from "@tanstack/react-query";
import StatsSection from "./StatsSection";
import {
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";

const Dashboard = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      return res.json();
    },
  });

  if (isLoading) {
    return (
      <Typography align="center" mt={3}>
        Loading Dashboard...
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
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight={600} align="center" gutterBottom>
          Dashboard
        </Typography>
        <StatsSection title="Employee Statistics" stats={employeeStats} />
        <StatsSection title="Department Statistics" stats={departmentStats} />
        <StatsSection title="Salary Statistics" stats={salaryStats} />
      </Container>
    </>
  );
};

export default Dashboard;
