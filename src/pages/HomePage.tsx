import { Box } from "@mui/material";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";

export default function HomePage() {
  return (
    <Box>
      <Container>
        <Button variant="contained" sx={{ mt: 3 }} href="/posts/create">
          Create Post
        </Button>
      </Container>
    </Box>
  );
}
