import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import PetsIcon from "@mui/icons-material/Pets";
import PersonIcon from "@mui/icons-material/Person";
import ForumIcon from "@mui/icons-material/Forum";

export const Header = ({ handleToggleHeader, handleToggleChat }) => {
  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }} className="header">
      <Grid
        container
        sx={{ textAlign: "center", maxWidth: 1000, margin: "0 auto" }}
      >
        <Grid item xs={4}>
          <IconButton onClick={handleToggleHeader}>
            <PersonIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton onClick={() => navigate("/")}>
            <PetsIcon color="primary" fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton onClick={handleToggleChat}>
            <ForumIcon fontSize="large" color="info" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};
