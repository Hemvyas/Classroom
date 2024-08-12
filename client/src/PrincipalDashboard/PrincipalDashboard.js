import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Info/Navbar";
import { Box } from "@mui/material";

const PrincipalDashboard = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          overflow: "auto", 
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default PrincipalDashboard;
