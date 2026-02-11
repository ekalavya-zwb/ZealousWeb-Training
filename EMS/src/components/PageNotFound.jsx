import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography, Button } from "@mui/material";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h1" fontWeight={700}>
            404
          </Typography>
          <Typography variant="h5" color="textSecondary">
            Page Not Found
          </Typography>
          <Typography variant="body1" color="textSecondary">
            The page you are looking for doesn’t exist or has been moved.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/")}
          >
            Go Back Home
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default PageNotFound;
