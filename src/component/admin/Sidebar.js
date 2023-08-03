import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Card, CardContent } from "@mui/material";
import { FaUserNurse, FaUserCog, FaUserMd, FaUserCheck } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import HandleRole from "./HandleRole";
import PeopleIcon from "@mui/icons-material/People";
import { Paper } from "@material-ui/core";
import Admin from "./Admin";
import AddStaff from "./AddStaff";
import Profile from './Profile';
import Patient from './Patient';


const drawerWidth = 240;

const buttonStyles = {
  width: "100%",
  color: "black",
  borderRadius: "10px",
  backgroundColor: "whitesmoke",
  "&:hover": {
    backgroundColor: "lightblue",
  },
};

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleRole = (role) => {
    setSelectedRole(role);
  };

  // const handleOpenProfileModal = () => {
  //   setProfileModalOpen(true);
  // };

  // const handleCloseProfileModal = () => {
  //   setProfileModalOpen(false);
  // };
 
  const drawer = (
    <div>
      <Toolbar />

      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          marginLeft: "16px",
          marginRight: "16px",
        }}
      >
        {[
          { text: "Doctor", iconComponent: <FaUserMd />, role: "Doctor" },
          { text: "Nurse", iconComponent: <FaUserNurse />, role: "Nurse" },
          {
            text: "Receptionist",
            iconComponent: <FaUserCheck />,
            role: "Receptionist",
          },
          { text: "Patients", iconComponent: <PeopleIcon />, role: "Patients" },
          { text: 'Profile', iconComponent: <AccountCircleIcon />, role:"Profile" },
          
          {
            text: "Logout",
            iconComponent: <LogoutIcon />,

            role: "Logout",
          },
        ].map(({ text, iconComponent, role }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              sx={text !== "Logout" ? buttonStyles : buttonStyles}
              onClick={() => handleRole(role)} // Update the onClick handler
             
            >
              <ListItemIcon>{iconComponent}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "Whitesmoke",
          color: "black",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <FaUserCog sx={{ marginRight: "0.5rem" }} />
            <span sx={{ ml: "8px" }}>ADMIN</span>
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
          bgcolor: "whitesmoke", // Set the background color to "whitesmoke"
        }}
        aria-label="mailbox folders"
      >
        <Box sx={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-Paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-Paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {/* {selectedRole === "Patients" ? (
          <Patient/>
        ) : (
          <>
       
        {selectedRole ? (
          <HandleRole role={selectedRole} />
        ) : (
          <> */}
          {selectedRole === "Patients" ? (
          <Patient />
        ) : (
          <>
            {selectedRole ? (
              <HandleRole role={selectedRole} />
            ) : (
              <>
                <Typography paragraph></Typography>
                <AddStaff />
              </>
            )}
          </>
        )}


      </Box>
      {/* <Modal open={profileModalOpen} onClose={handleCloseProfileModal}>
          <Profile />
        </Modal> */}
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
