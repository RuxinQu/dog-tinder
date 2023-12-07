import { Outlet } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { Header } from "../components/Header";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#E6AD73", //orange
    },
    secondary: {
      main: "#73c8e5", //pink from the home page background
    },

    background: {
      default: "#00000",
    },
  },
  typography: {
    fontFamily: [
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    h3: {
      fontSize: "35px",
      fontWeight: 700,
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
