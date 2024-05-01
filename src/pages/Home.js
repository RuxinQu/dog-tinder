import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignupContainer } from "../container/SignupContainer";
import { LoginContainer } from "../container/LoginContainer";
import Auth from "../util/auth";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";

export default function Home({ loggedIn }) {
  const [open, setOpen] = useState(false);
  const [register, setRegister] = useState(false);
  const handleOpenSignup = () => {
    setOpen(true);
    setRegister(true);
  };
  const handleOpenLogin = () => {
    setOpen(true);
    setRegister(false);
  };

  const handleClose = () => setOpen(false);
  const navigator = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Button
        className="itim"
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          backgroundColor: "#f1f1f1",
          color: "#000",
          fontWeight: "bold",
          opacity: 0.8,
        }}
        onClick={() => (loggedIn ? Auth.logOut() : handleOpenLogin())}
      >
        {loggedIn ? "LogOut" : "Login"}
      </Button>
      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div>
          <img className="logo" src={"./logo.png"} alt="Logo" />
          <h1 className="itim">Meetup for dogs.</h1>
          <h2 className="itim">Join and meet other dog pals</h2>
        </div>

        <Fab
          variant="extended"
          className="itim"
          color="secondary"
          sx={{ my: 2, fontWeight: "bold", fontSize: 20 }}
          onClick={() => {
            loggedIn ? navigator("/board") : handleOpenSignup();
          }}
        >
          {loggedIn ? "Meet Our Dogs" : "Register Now"}
        </Fab>
      </Box>
      <Box
        className="bg-home"
        sx={{
          width: { xs: "100%", md: "60%" },
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {open &&
          (register ? (
            <SignupContainer handleClose={handleClose} />
          ) : (
            <LoginContainer handleClose={handleClose} />
          ))}
      </Box>
    </Box>
  );
}
