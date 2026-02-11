import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";

const StatsSection = ({ title, stats }) => {
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          {title}
        </Typography>

        <Grid container spacing={3}>
          {stats.map((item, index) => (
            <Grid size={{ lg: 2 }} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  textAlign: "center",
                  border: "1px solid #999",
                }}
              >
                <Typography variant="subtitle1" color="text.secondary">
                  {item.label}
                </Typography>

                <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                  {item.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default StatsSection;
