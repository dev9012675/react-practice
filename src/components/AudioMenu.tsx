import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

export default function AudioMenu(props) {
  const appUrl = import.meta.env.VITE_APP_URL;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const setAudioSource = async (path: string) => {
    const res = await axios.post(
      `${appUrl}/api/audio/retrieveFile`,
      { path },
      { responseType: "blob" }
    );
    const blob = await res.data;
    const url = URL.createObjectURL(blob);
    props.setAttribute(url);
  };

  const menuElements = props.elements.map((element, index) => (
    <MenuItem
      onClick={async () => {
        props.title === "Audio"
          ? await props.setAttribute(element)
          : await setAudioSource(element.path);
        handleClose();
      }}
      key={index}
    >
      {props.title === "Audio" ? element : element.name}
    </MenuItem>
  ));

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {props.title}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menuElements}
      </Menu>
    </div>
  );
}
