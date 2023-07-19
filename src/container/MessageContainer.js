import React from "react";
import Box from "@mui/material/Box";

export const MessageContainer = ({ userToDisplay, myId }) => {
  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "60%" },
        border: "1px solid black",
      }}
    >
      {userToDisplay}
    </Box>
  );
};
