import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../providers/authProvider";
import { Typography } from "@mui/material";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Login() {
  const [data, setData] = React.useState({ email: "", password: "" });
  const [open, setOpen] = React.useState(false);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { setUser } = useAuth();
  const navigate = useNavigate();

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setData((prevData) => {
      return { ...prevData, [event.target.name]: event.target.value };
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData();
    form.append("username", data.email);
    form.append("password", data.password);
    const appUrl = import.meta.env.VITE_APP_URL;
    console.log(data);
    await axios
      .post(`${appUrl}/api/login`, form)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        navigate("/", { replace: true });
      })
      .catch((e) => {
        console.log(`Error:${e}`);
        setOpen(true);
      });
  }
  return (
    <Box>
      <Container>
        <Typography component="h1" variant="h4" marginY={3}>
          Login
        </Typography>
        <form action="POST" onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            label="Email"
            type="email"
            variant="standard"
            value={data.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="standard"
            value={data.password}
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
            severity="error"
            variant="filled"
            sx={{ width: "100%" }}
          >
            Login Failed
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
