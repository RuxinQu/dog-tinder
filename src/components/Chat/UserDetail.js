import React from "react";
import { Detail } from "../Dashboard/Detail";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

export const UserDetail = ({ character, setShowDetail }) => {
  return (
    <Box
      className="user-detail"
      sx={{
        backgroundImage: "url(./bg-dog-card.svg)",
        zIndex: 99,
      }}
    >
      <IconButton
        color="error"
        sx={{ position: "absolute", right: "-10px", top: "-10px" }}
        onClick={() => setShowDetail(false)}
      >
        <HighlightOffOutlinedIcon style={{ fontSize: "32px" }} />
      </IconButton>
      <Detail character={character} />
    </Box>
  );
};
