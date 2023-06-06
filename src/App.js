import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Home from "./pages/Home";
import { theme, Layout } from "./util/theme";
import { DogCard } from "./components/DogCard";
import { Chat } from "./components/Chat";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Layout />}>
            <Route path="/board" element={<DogCard />} />
            <Route path="/11" element={<Chat />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
