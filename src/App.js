import React from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme, Layout } from "./util/theme";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

import "./App.css";

function App() {
  const [cookies, setCookie] = useCookies(["user"]);
  const authToken = cookies.AuthToken;
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          {authToken && <Route path="/board" element={<Dashboard />} />}
          {authToken && <Route path="/profile" element={<Profile />} />}
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
