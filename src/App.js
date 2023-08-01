import React from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme, Layout } from "./util/theme";
import Auth from "./util/auth";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import NoMatch from "./pages/NoMatch";
import PetDetail from "./pages/PetDetail";

import "./App.css";

function App() {
  const authToken = Cookies.get("AuthToken");
  const myId = Cookies.get("UserId");
  const loggedIn = Auth.loggedIn(authToken);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home loggedIn={loggedIn} />} />
          <Route element={<Layout />}>
            {loggedIn && (
              <Route path="/board" element={<Dashboard myId={myId} />} />
            )}
            {loggedIn && (
              <Route path="/profile" element={<Profile myId={myId} />} />
            )}
            {loggedIn && <Route path="/chat" element={<Chat myId={myId} />} />}
            {loggedIn && (
              <Route path="/detail/:userId" element={<PetDetail />} />
            )}
          </Route>
          {/* show no match page for all paths when loggedIn is false */}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
