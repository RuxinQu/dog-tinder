import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";

export default function Home() {
  return (
    <Box
      sx={{
        display: "flex",
        // alignItems: "center",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          height: { xs: "40dvh", md: "auto" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          textAlign: "center",
        }}
      >
        <div>
          <img className="logo" src={"./logo.png"} alt="Logo" />
          <h1 className="lobster" style={{ padding: "20px 0" }}>
            Meetup for dogs.
          </h1>
          <h2>Join and meet other dog pals</h2>
        </div>
        <Fab variant="extended" color="secondary" sx={{ my: 2 }}>
          Register Now
        </Fab>
      </Box>
      <Box
        className="bg-home"
        sx={{
          width: { xs: "100%", md: "60%" },
          height: { xs: "60dvh", md: "100vh" },
        }}
      ></Box>
    </Box>
  );
}
