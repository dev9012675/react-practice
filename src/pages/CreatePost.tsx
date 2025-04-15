import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import { createPost } from "../api/postsApi";
import Typography from "@mui/material/Typography";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import { ICreatePost } from "../interfaces";
import MediaRecorder from "../components/MediaRecorder";
import AudioMenu from "../components/AudioMenu";
import { useAuth } from "../providers/authProvider";

export default function CreatePost() {
  const [post, setPost] = React.useState<ICreatePost>({
    title: "",
    content: "",
    published: true,
    audioFiles: {},
  });
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [audioAttribute, setAudioAttribute] = React.useState(
    Object.keys(post)[0]
  );
  const { setUser } = useAuth();

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    console.log(event);
    setPost((prevPost) => {
      return {
        ...prevPost,
        [event.target.name]: event.target.value,
      };
    });
    console.log(post);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData();
    const published = post.published ? "true" : "false";
    data.append("title", post.title);
    data.append("content", post.content);
    data.append("published", published);
    if (Object.keys(post.audioFiles).length > 0) {
      for (const value of Object.values(post.audioFiles)) {
        data.append("audioFiles", value);
      }
    }
    console.log(post);
    console.log({ ...post });
    await createPost(data)
      .then(() => {
        setAlertMessage("Post created successfully");
        setPost({
          title: "",
          content: "",
          published: true,
          audioFiles: {},
        });
        setOpen(true);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          setUser();
        } else {
          setAlertMessage(`Failed to create post:${e.message}`);
          setOpen(true);
        }
      });
  }

  console.log(audioAttribute);
  return (
    <Box>
      <Container>
        <Box>
          <Typography component="h1" variant="h4" marginY={3}>
            Create Post
          </Typography>
          <AudioMenu
            elements={["title", "content"]}
            title="Audio"
            setAttribute={setAudioAttribute}
          />
        </Box>
        <form
          action="POST"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
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
