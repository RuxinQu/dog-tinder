import { Outlet } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { Header } from "../components/Header";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#F48B48", //orange
    },
    secondary: {
      main: "#FFB0C2", //pink from the home page background
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
      padding: "10px 0 10px 0",
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
