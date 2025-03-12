import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuth } from "../providers/authProvider";

export default function NavBar() {
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
