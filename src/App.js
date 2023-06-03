import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Home from "./pages/Home";

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
      default: "#f1f1f1",
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
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      {/* <Header /> */}
    </ThemeProvider>
  );
}

export default App;
