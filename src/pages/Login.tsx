import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../providers/authProvider";

export default function Login() {
  const [user, setUser] = React.useState({ email: "", password: "" });
  const { setToken } = useAuth();
  const navigate = useNavigate();

  function handleChange(event) {
    setUser((prevUser) => {
      return { ...prevUser, [event.target.name]: event.target.value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const form = new FormData();
    form.append("username", user.email);
    form.append("password", user.password);

    console.log(user);
    await axios
      .post("http://localhost:8000/api/login", form)
      .then((res) => {
        console.log(res.data);
        setToken(res.data.access_token);
        navigate("/", { replace: true });
      })
      .catch((e) => console.log(e));
  }
  return (
    <Box>
      <Container>
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
      </Container>
    </Box>
  );
}
