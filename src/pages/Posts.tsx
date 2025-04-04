import React from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import Post from "../components/Post";
import { Typography } from "@mui/material";
import { IPost } from "../interfaces";
import { useAuth } from "../providers/authProvider";

export default function Posts() {
  const [posts, setPosts] = React.useState<IPost[]>([]);
  const appUrl = import.meta.env.VITE_APP_URL;
  const { user } = useAuth();
  console.log(`User Test: ${JSON.stringify(user)}`);

  React.useEffect(() => {
    axios
      .get(`${appUrl}/api/posts/`)
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((e) => console.log(e));
  }, [appUrl]);

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
      <Container sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Typography component="h1" variant="h4" marginY={3}>
          Posts
        </Typography>
        {postElements}
      </Container>
    </Box>
  );
}
