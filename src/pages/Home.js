import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { SignupContainer } from "../container/SignupContainer";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const authToken = cookies.AuthToken;

  const [open, setOpen] = useState(false);
  const [register, setRegister] = useState(false);
  const handleOpenSignup = () => {
    setOpen(true);
    setRegister(true);
  };
  const handleOpenLogin = () => {
    setRegister(false);
    setOpen(true);
  };
  const handleLogout = () => {
    removeCookie("UserId");
    removeCookie("AuthToken");
    window.location.reload();
  };
  const handleClose = () => setOpen(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Button
        className="kalam"
        variant="outlined"
        color="secondary"
        size="large"
        sx={{
          position: "absolute",
          top: 20,
          right: 20,
          backgroundColor: "#f1f1f1",
          fontWeight: "bold",
          opacity: 0.8,
        }}
        onClick={() => (authToken ? handleLogout() : handleOpenLogin())}
      >
        {authToken ? "LogOut" : "Login"}
      </Button>
      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          //   height: { xs: "40dvh", md: "auto" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div>
          <img className="logo" src={"./logo.png"} alt="Logo" />
          <h1 className="kalam">Meetup for dogs.</h1>
          <h2>Join and meet other dog pals</h2>
        </div>

        <Fab
          variant="extended"
          className="kalam"
          color="secondary"
          sx={{ my: 2, fontWeight: "bold" }}
          onClick={() => {
            authToken ? window.location.assign("/board") : handleOpenSignup();
          }}
        >
          {authToken ? "Meet Our Dogs" : "Register Now"}
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
        {open && (
          <SignupContainer handleClose={handleClose} register={register} />
        )}
      </Box>
    </Box>
  );
}
