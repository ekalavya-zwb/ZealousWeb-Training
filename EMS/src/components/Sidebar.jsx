import React from "react";
import { NavLink } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";

const drawerWidth = 240;

const Sidebar = () => {
  const menuItems = [
    { text: "Dashboard", path: "/", icon: <DashboardIcon /> },
    { text: "Employees", path: "/employees", icon: <PeopleIcon /> },
    { text: "Departments", path: "/departments", icon: <BusinessIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#f8fafc",
        },
      }}
    >
      <Toolbar sx={{ px: 3 }}>
        <Typography variant="h6" fontWeight={700}>
          Admin Panel
        </Typography>
      </Toolbar>

      <Divider />

      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              component={NavLink}
              to={item.path}
              sx={{
                borderRadius: 2,
                mx: 1,
                my: 0.5,
                "&.active": {
                  backgroundColor: "action.selected",
                  borderLeft: "4px solid",
                  borderColor: "primary.main",
                  fontWeight: 600,
                },
                "&:hover": {
                  backgroundColor: "action.hover",
                },
              }}
            >
              {item.icon}
              <ListItemText primary={item.text} sx={{ ml: 2 }} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
