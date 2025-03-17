import { useReactMediaRecorder } from "react-media-recorder";
import { Box } from "@mui/material";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import { CardMedia } from "@mui/material";
import axios from "axios";

export default function MediaRecorder(props) {
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });

  const handleSave = async () => {
    const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
    const audioFile = new File([audioBlob], "voice.wav", { type: "audio/wav" });
    console.log(audioFile);
    console.log(audioBlob);
    const formData = new FormData(); // preparing to send to the server

    formData.append("file", audioFile); // preparing to send to the server
    console.log(`Form Data:${JSON.stringify(formData)}`);

    await onSaveAudio(formData); // sending to the server
  };

  const onSaveAudio = async (data: FormData) => {
    await axios
      .post("http://localhost:8000/api/audio/transcribe", data)
      .then((res) => {
        console.log(res.data);
        props.setAttribute((prevAttributes) => ({
          ...prevAttributes,
          [props.attribute]: res.data.transcription,
        }));
      })
      .catch((e) => {
        console.log(e.response.data.detail);
        props.setAlertMessage(
          `Failed to transcribe speech:${e.response.data.detail}`
        );
        props.setOpen(true);
      });
  };

  return (
    <Box>
      <Typography component="p">{status}</Typography>
      <Button onClick={startRecording}>Start Recording</Button>
      <Button onClick={stopRecording}>Stop Recording</Button>
      <CardMedia
        component="video"
        src={mediaBlobUrl}
        autoPlay
        loop
        controls
        sx={{ height: 100 }}
      ></CardMedia>
      <Button onClick={handleSave}>Send</Button>
    </Box>
  );
}
