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

import Styles from "../sass/styles.module.css";
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
            <div className="logout-drawer-wrapper" onClick={() => onLogout()}>
              <svg className="logout-svg-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>Logout</title>
                <path d="M778.016 772.992q-52 55.008-120.992 84.992-71.008 31.008-150.016 31.008-76 0-144.512-28.512t-122.016-82.016-82.016-122.496-28.512-144 28.512-144 82.016-122.496 122.016-82.016 144-28.512 144.512 28.512 122.016 82.496q11.008 10.016 26.016 10.016t25.504-10.496 10.496-25.504-11.008-24.992q-62.016-62.016-142.016-96-84-36-175.008-36t-175.008 36q-80 34.016-142.016 96t-96 142.016Q57.984 420.992 57.984 512t36 175.008q34.016 80 96 142.016t142.016 96q84 36 175.008 36 94.016 0 179.008-36.992 82.016-36 144-100.992 11.008-11.008 10.496-25.504t-11.008-24.992-25.504-10.496-26.016 11.008z m184-260q0-12-8-20.992l-108-139.008q-10.016-12-24.512-13.504t-26.496 7.488-13.504 24 7.488 27.008l63.008 80h-408q-15.008 0-25.504 10.496t-10.496 25.504q0 15.008 10.496 25.504t25.504 10.496h408l-63.008 80.992q-8.992 12-7.488 26.496t13.504 23.488q10.016 8 22.016 8 18.016 0 28.992-14.016l108-139.008q8-8.992 8-20.992v-2.016z" />
              </svg>
            </div>

            <div>
              <List>
                {[
                  { path: "/dashboard", icon: <SpaceDashboardIcon />, label: "Dashboard" },
                  { path: "/sales", icon: <ShoppingBagRoundedIcon />, label: "Appointments" },
                  { path: "/sales/Approved", icon: <MarkChatReadIcon />, label: "Approved " },
                  {
                    path: "/sales/Pending",
                    icon: (
                      <Badge badgeContent={unreadNewNumber} color="primary">
                        <PendingActions color="action" />
                      </Badge>
                    ),
                    label: "Pending",
                  },
                  { path: "/newConsultation", icon: <AddTaskOutlined />, label: "Add Work" },
                ].map((item, index) => (
                  <ListItem key={index} disablePadding sx={{ display: "block", fontFamily: "inherit" }}>
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
                      <ListItemText
                        primary={item.label}
                        className={Styles.DrawerLabels}
                        sx={{ opacity: open ? 1 : 0 }}
                      />
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
                    <Avatar
                      alt="Uzitrake"
                      className={Styles.profileAvatar}
                      src="https://i.postimg.cc/x89Py6mJ/profile.jpg"
                    />
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
