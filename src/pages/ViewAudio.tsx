import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { CardMedia } from "@mui/material";
import { useLocation } from "react-router";
import axios from "axios";
//import AudioMenu from "../components/AudioMenu";

export default function ViewAudio() {
  const [loading, setLoading] = useState(true);
  const [source, _setSource] = useState("");
  const [_file, setFile] = useState([]);
  const location = useLocation();
  const { files } = location.state;
  const appUrl = import.meta.env.VITE_APP_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post(`${appUrl}/api/audio/retrieveFilenames`, {
          path: files,
        });
        const data = res.data.files.map((member: string) => ({
          name: member.split(".")[0],
          path: `${files}/${member}`,
        }));
        console.log(data);
        setFile(data);
        setLoading(false);

        /* const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setSource(url);
        setLoading(false); */
      } catch (e) {
        console.log(`An Error Occured:${e}`);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading</h1>;
  } else {
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
              Listen to Post Audio
            </Typography>
          </Box>
          <CardMedia
            component="audio"
            controls
            autoPlay
            src={source}
          ></CardMedia>
        </Container>
      </Box>
    );
  }
}
