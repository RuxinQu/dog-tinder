import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import PetsIcon from "@mui/icons-material/Pets";
import PersonIcon from "@mui/icons-material/Person";
import ForumIcon from "@mui/icons-material/Forum";

export const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: 1000, m: "30px auto" }}>
      <Grid container sx={{ textAlign: "center" }}>
        <Grid item xs={4}>
          <IconButton>
            <PersonIcon fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton disabled="true">
            <PetsIcon color="primary" fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton>
            <ForumIcon fontSize="large" color="info" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};
