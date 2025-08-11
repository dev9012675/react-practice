import React from "react";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import Post from "../components/Post";
import { Typography } from "@mui/material";
import { IPost } from "../interfaces";
import { useWebSocket } from "../providers/useWebSocket";
import { getPosts } from "../api/postsApi";
import { useAuth } from "../providers/authProvider";

export default function Posts() {
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const appUrl = import.meta.env.VITE_APP_URL;
  const { setUser } = useAuth();

  const event = useWebSocket(`${appUrl}/api/posts/ws`);

  console.log("Render");

  React.useEffect(() => {
    getPosts()
      .then((res) => {
        console.log("useEffect ran");
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status === 401) {
          setUser();
        }
      });
  }, [event]);

  const postElements = posts.map((post: IPost) => {
    return (
      <Post
        title={post.title}
        content={post.content}
        owner_id={post.owner_id}
        id={post.id}
        setPosts={setPosts}
        files={post.files}
        key={post.id}
      />
    );
  });

  return (
    <Box>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          backgroundColor: "white",
          borderRadius: "15px",
        }}
      >
        <Typography component="h1" variant="h4" marginY={3}>
          Posts
        </Typography>
        {postElements}
      </Container>
    </Box>
  );
}
