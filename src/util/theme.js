import { Outlet } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { Header } from "../components/Header";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#F48B48",
    },
    secondary: {
      main: "#aa00ff",
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
