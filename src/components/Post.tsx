import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IPost } from "../interfaces";
import { useAuth } from "../providers/authProvider";
import axios from "axios";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function Post(props: IPost) {
  const { user } = useAuth();
  console.log(props);

  const handleDelete = async () => {
    await axios
      .delete(`http://localhost:8000/api/posts/${props.id}`)
      .then(() =>
        props.setPosts((prevPosts) =>
          prevPosts.filter((post) => post.id !== props.id)
        )
      );
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2">{props.content}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="success">
          Learn More
        </Button>
        {user.id === props.owner_id && (
          <Box>
            <Button
              size="small"
              color="info"
              href={`/posts/update/${props.id}`}
            >
              Update
            </Button>
            <Button size="small" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        )}
      </CardActions>
    </Card>
  );
}
