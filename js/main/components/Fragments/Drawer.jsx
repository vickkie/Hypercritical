import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";

import Styles from "../styles.module.css";
import { AddTaskOutlined, PendingActions } from "@mui/icons-material";
import { Badge } from "@mui/material";
import { UnreadNumberContext } from "./UnreadNumberContext";

const drawerWidth = 200;

//creating drawer and sidebar theme
const openedMixin = (theme) => ({
  width: drawerWidth,
  margin: "10px;",
  borderRadius: "25px;",
  maxHeight: "calc(100vh - 20px);",
  color: "var(--color-bg);",
  background: "var(--color-grownish);",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  margin: "10px;",
  borderRadius: "25px;",
  maxHeight: "calc(100vh - 20px);",
  color: "var(--color-bg);",
  background: "var(--color-grownish);",
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  background: "inherit",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

//TODO : export the default function

export default function DrawerXDashTable({ onLogout, children }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { unreadNewNumber } = useContext(UnreadNumberContext);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const pages = ["Dashboard"];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (setting) => {
    switch (setting) {
      case "Profile":
        handleCloseUserMenu();
        console.log("Profile clicked");
        break;
      case "Account":
        console.log("Account clicked");
        break;
      case "Dashboard":
        navigate("/dashboard");
        break;
      case "Logout":
        // Call the onLogout function passed as a prop
        onLogout();
        break;
      default:
        console.log("Unknown setting");
    }
  };

  return (
    <Box sx={{ display: "flex" }} className={Styles.EverythingWrapper}>
      {/* <CssBaseline /> */}

      <Drawer variant="permanent" className={Styles.drawerLeft} open={open}>
        <div className={Styles.DrawerInnerWrapper}>
          <DrawerHeader>
            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle} edge="start">
              {open ? <HighlightOffIcon /> : <OfflineBoltIcon />}
            </IconButton>
          </DrawerHeader>
          <div className={Styles.DrawerListWrapper}>
            <div>
              <List>
                {[
                  { path: "/dashboard", icon: <SpaceDashboardIcon />, label: "Dashboard" },
                  { path: "/sales", icon: <ShoppingBagRoundedIcon />, label: "Appointments" },
                  { path: "/sales/Approved", icon: <MarkChatReadIcon />, label: "Approved " },
                  {
                    path: "/sales/Pending",
                    icon: (
                      <Badge badgeContent={unreadNewNumber} color="secondary">
                        <PendingActions color="action" />
                      </Badge>
                    ),
                    label: "Pending",
                  },
                  { path: "/newConsultation", icon: <AddTaskOutlined />, label: "Add Work" },
                ].map((item, index) => (
                  <ListItem key={index} disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? "initial" : "center",
                        px: 2.5,
                      }}
                      onClick={() => navigate(item.path)} // Navigate on click
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </div>

            <div className={Styles.profileDrawerContainer}>
              <Divider />
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/assets/svg/icons8-github.svg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <div className={Styles.profileName} id="profileName">
                <br />
                <div>Uzitrake</div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }} className={Styles.mainDashboardContent}>
        {children}
      </Box>
    </Box>
  );
}
