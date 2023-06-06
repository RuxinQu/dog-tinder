import React, { useState } from "react";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import { SignupDialogContainer } from "../container.js/SignupDialogContainer";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [register, setRegister] = useState(false);
  const handleOpenSignup = () => {
    setOpen(true);
    setRegister(true);
  };
  const handleOpenLogin = () => {
    setOpen(true);
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
        onClick={handleOpenLogin}
      >
        Login
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
          onClick={handleOpenSignup}
        >
          Register Now
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
          <SignupDialogContainer
            handleClose={handleClose}
            register={register}
          />
        )}
      </Box>
    </Box>
  );
}
