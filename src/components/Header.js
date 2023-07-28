import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
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
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    removeCookie("UserId");
    removeCookie("AuthToken");
    window.location.assign("/");
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
                navigate("/profile");
                handleClose();
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                navigate("/");
                handleClose();
              }}
            >
              Home
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleLogout();
                // handleClose();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </Grid>
        <Grid item xs={4}>
          <IconButton onClick={() => navigate("/board")}>
            <PetsIcon color="primary" fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton onClick={() => navigate("/chat")}>
            <ForumIcon fontSize="large" color="info" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};
