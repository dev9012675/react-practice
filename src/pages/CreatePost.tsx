import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import MediaRecorder from "../components/MediaRecorder";
import AudioMenu from "../components/AudioMenu";

export default function CreatePost() {
  const [post, setPost] = React.useState({
    title: "",
    content: "",
    published: true,
  });
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [audioAttribute, setAudioAttribute] = React.useState(
    Object.keys(post)[0]
  );

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
    console.log(event);
    setPost((prevPost) => {
      return {
        ...prevPost,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    console.log(post);
    await axios
      .post("http://localhost:8000/api/posts/", { ...post })
      .then(() => {
        setAlertMessage("Post created successfully");
        setPost({ title: "", content: "", published: true });
        setOpen(true);
      })
      .catch((e) => {
        setAlertMessage(`Failed to create post:${e.message}`);
        setOpen(true);
      });
  }

  console.log(audioAttribute);
  return (
    <Box>
      <Container>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography component="h1" variant="h4" marginY={3}>
            Create Post
          </Typography>
          <AudioMenu
            elements={["title", "content"]}
            title="Audio"
            setAttribute={setAudioAttribute}
          />
        </Box>
        <form action="POST" onSubmit={handleSubmit}>
          <TextField
            id="title"
            name="title"
            label="title"
            type="text"
            variant="standard"
            value={post.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="content"
            name="content"
            label="content"
            type="text"
            variant="standard"
            value={post.content}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
          />
          <Checkbox
            name="published"
            checked={post.published}
            onChange={() =>
              setPost((prevPost) => {
                return {
                  ...prevPost,
                  published: !prevPost.published,
                };
              })
            }
          />
          <Box>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ mt: 2 }}
            >
              Create
            </Button>
          </Box>
        </form>
        <MediaRecorder
          attribute={audioAttribute}
          setAttribute={setPost}
          setAlertMessage={setAlertMessage}
          setOpen={setOpen}
        />
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
