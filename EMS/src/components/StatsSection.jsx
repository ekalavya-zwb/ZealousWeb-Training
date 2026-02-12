import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";

const StatsSection = ({ title, stats }) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        mb: 5,
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "grey.50",
      }}
    >
      <Typography variant="h6" fontWeight={600} mb={3}>
        {title}
      </Typography>

      <Grid container spacing={3}>
        {stats.map((item, index) => (
          <Grid size={{ lg: 2 }} key={index}>
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                backgroundColor: "grey.50",
                textAlign: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>

              <Typography variant="h5" fontWeight={700} sx={{ mt: 1 }}>
                {item.value}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default StatsSection;
