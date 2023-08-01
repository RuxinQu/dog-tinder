import React from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../util/auth";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import PetsIcon from "@mui/icons-material/Pets";
import PersonIcon from "@mui/icons-material/Person";
import ForumIcon from "@mui/icons-material/Forum";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export const Header = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="header">
      <Grid
        container
        sx={{ textAlign: "center", maxWidth: 1000, margin: "0 auto" }}
      >
        <Grid item xs={4}>
          <IconButton
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <PersonIcon fontSize="large" />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                window.location.assign("/profile");
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                window.location.assign("/");
              }}
            >
              Home
            </MenuItem>
            <MenuItem onClick={Auth.logOut}>Logout</MenuItem>
          </Menu>
        </Grid>
        <Grid item xs={4}>
          <IconButton
            onClick={() => {
              window.location.assign("/board");
            }}
          >
            <PetsIcon color="primary" fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton
            onClick={() => {
              window.location.assign("/chat");
              // navigate("/chat");
              // handleClose();
            }}
          >
            <ForumIcon fontSize="large" color="info" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};
