import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Login() {
  const [user, setUser] = React.useState({ email: "", password: "" });
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function handleChange(event) {
    setUser((prevUser) => {
      return { ...prevUser, [event.target.name]: event.target.value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(user);
    await axios
      .post("http://localhost:8000/api/users", { ...user })
      .then((res) => {
        setAlertMessage("Registered successfully");
        setUser({ email: "", password: "" });
        setOpen(true);
      })
      .catch((e) => {
        setAlertMessage(`Failed to register:${e.message}`);
        setOpen(true);
      });
  }
  return (
    <Box>
      <Container>
        <Typography component="h1" variant="h4" marginY={3}>
          Register
        </Typography>
        <form action="POST" onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            variant="standard"
            value={user.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="standard"
            value={user.password}
            onChange={handleChange}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity={alertMessage.startsWith("Failed") ? "error" : "success"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
