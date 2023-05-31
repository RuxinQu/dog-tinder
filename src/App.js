import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Header } from "./components/Header";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff3d00",
    },
    secondary: {
      main: "#aa00ff",
    },
    background: {
      default: "#f1f1f1",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Header />
    </ThemeProvider>
  );
}

export default App;
