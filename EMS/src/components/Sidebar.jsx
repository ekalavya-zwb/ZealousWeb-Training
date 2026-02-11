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
} from "@mui/material";

const drawerWidth = 240;

const Sidebar = () => {
  const menuItems = [
    { text: "Dashboard", path: "/" },
    { text: "Employees", path: "/employees" },
    { text: "Departments", path: "/departments" },
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
        },
      }}
    >
      <Toolbar>
        <Typography variant="h6" fontWeight={600}>
          Admin Panel
        </Typography>
      </Toolbar>

      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              component={NavLink}
              to={item.path}
              sx={{
                "&.active": {
                  backgroundColor: "primary.light",
                  color: "primary.contrastText",
                },
              }}
            >
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
