import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "./pages/Home";
import { DogCard } from "./components/DogCard";

import { Header } from "./components/Header";
import "./App.css";

const theme = createTheme({
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
const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Layout />}>
            <Route path="/board" element={<DogCard />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
