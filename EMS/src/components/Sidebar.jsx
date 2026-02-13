import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Toolbar,
  Typography,
  Box,
  Divider,
  Button,
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

  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

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

      <Box sx={{ px: 3, pb: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Logged in as
        </Typography>
        <Typography variant="subtitle2" fontWeight={600}>
          {user.email}
        </Typography>
      </Box>

      <Divider />

      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ flexGrow: 1 }}>
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
                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                  "& .MuiListItemText-primary": {
                    fontWeight: 600,
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} sx={{ ml: 2 }} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          color="error"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
