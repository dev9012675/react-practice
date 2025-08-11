import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import { useParams } from "react-router";
import MediaRecorder from "../components/MediaRecorder";
import AudioMenu from "../components/AudioMenu";
import { useAuth } from "../providers/authProvider";
import { getSinglePost, updatePost } from "../api/postsApi";

export default function UpdatePost() {
  const params = useParams();
  const [post, setPost] = React.useState({
    title: "",
    content: "",
    published: true,
    audioFiles: {},
  });
  const { setUser } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [open, setOpen] = React.useState(false);
  const [audioAttribute, setAudioAttribute] = React.useState(
    Object.keys(post)[0]
  );
  const [alertMessage, setAlertMessage] = React.useState("");

  React.useEffect(() => {
    const fetchPost = async () => {
      await getSinglePost(params.id as string)
        .then((res) => {
          console.log(`Data:${res.data}`);
          setPost({
            title: res.data.title,
            content: res.data.content,
            published: res.data.published,
            audioFiles: {},
          });
          setLoading(false);
        })
        .catch((e) => {
          if (e.response.status === 401) {
            setUser();
          }
        });
    };

    fetchPost();
  }, []);

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
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { audioFiles, ...postData } = post;
    await updatePost(params.id as string, postData)
      .then(() => {
        setAlertMessage("Post updated successfully");
        setOpen(true);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          setUser();
        } else {
          setAlertMessage(`Failed to update post:${e.message}`);
          setOpen(true);
        }
      });
  }

  if (loading) {
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
      <Container
        sx={{
          backgroundColor: "white",
          borderRadius: "15px",
          padding: "5px",
          width: "80%",
        }}
      >
        <Box>
          <Typography component="h1" variant="h4" marginY={3}>
            Update Post
          </Typography>
          <AudioMenu
            elements={["title", "content"]}
            title="Audio"
            setAttribute={setAudioAttribute}
          />
        </Box>
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
