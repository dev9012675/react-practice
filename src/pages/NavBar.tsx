import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useAuth } from "../providers/authProvider";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";

export function NavBar2() {
  const { user, setUser } = useAuth();

  const navItems = [];

  function handleLogout() {
    setUser();
  }

  if (user) {
    navItems.push(
      {
        link: "Home",
        url: "/",
      },
      {
        link: "View Posts",
        url: "/posts",
      }
    );
  } else {
    navItems.push(
      {
        link: "Login",
        url: "/login",
      },
      {
        link: "Register",
        url: "/register",
      }
    );
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MUI
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => (
              <Button key={index} sx={{ color: "#fff" }} href={item.url}>
                {item.link}
              </Button>
            ))}
            {user && (
              <>
                <Button sx={{ color: "#fff" }} onClick={handleLogout}>
                  Logout
                </Button>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ flexGrow: 1 }}
                >
                  {user.email}
                </Typography>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const drawerWidth = 240;

export default function NavBar(props: { window?: () => Window }) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { user, setUser } = useAuth();

  const navItems = [];

  function handleLogout() {
    setUser();
  }

  if (user) {
    navItems.push(
      {
        link: "Home",
        url: "/",
      },
      {
        link: "View Posts",
        url: "/posts",
      }
    );
  } else {
    navItems.push(
      {
        link: "Login",
        url: "/login",
      },
      {
        link: "Register",
        url: "/register",
      }
    );
  }

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem component="a" href={item.url} key={index} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item.link} />
            </ListItemButton>
          </ListItem>
        ))}
        {user && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "center" }} onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav">
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
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => (
              <Button key={index} sx={{ color: "#fff" }} href={item.url}>
                {item.link}
              </Button>
            ))}
            {user && (
              <>
                <Button sx={{ color: "#fff" }} onClick={handleLogout}>
                  Logout
                </Button>
                <Typography
                  variant="body2"
                  component="span"
                  sx={{ flexGrow: 1 }}
                >
                  {user.email}
                </Typography>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
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
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}
