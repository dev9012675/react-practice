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
import { useParams } from "react-router";

export default function UpdatePost() {
  const params = useParams();
  const [post, setPost] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");

  React.useEffect(() => {
    const fetchPost = async () => {
      await axios
        .get(`http://localhost:8000/api/posts/${params.id}`)
        .then((res) => {
          console.log(`Data:${res.data}`);
          setPost({
            title: res.data.title,
            content: res.data.content,
            published: res.data.published,
          });
        });
    };

    fetchPost();
  }, []);

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
      .put(`http://localhost:8000/api/posts/${params.id}`, { ...post })
      .then(() => {
        setAlertMessage("Post updated successfully");
        setOpen(true);
      })
      .catch((e) => {
        setAlertMessage(`Failed to update post:${e.message}`);
        setOpen(true);
      });
  }

  if (!post) {
    return (
      <Box>
        <Container>
          <Typography component="h1" variant="h4" marginY={3}>
            Loading ...
          </Typography>
        </Container>
      </Box>
    );
  }
  return (
    <Box>
      <Container>
        <Typography component="h1" variant="h4" marginY={3}>
          Update Post
        </Typography>
        <form onSubmit={handleSubmit}>
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
              Update
            </Button>
          </Box>
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
