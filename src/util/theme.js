import { Outlet } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { Header } from "../components/Header";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#F1B45C", //orange
    },
    secondary: {
      main: "#73c8e5", //blue from the home page background
    },

    background: {
      default: "#00000",
    },
  },
  typography: {
    fontFamily: [
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h3: {
      fontSize: "30px",
      fontWeight: 500,
      padding: "20px 0 20px 0",
      textAlign: "center",
    },
  },
});
export const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
