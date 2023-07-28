import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
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
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [loggedIn, setLoggedIn] = useState(false);
  const authToken = cookies.AuthToken;
  const myId = cookies.UserId;
  useEffect(() => {
    setLoggedIn(Auth.loggedIn(authToken));
  }, [myId, authToken]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Home loggedIn={loggedIn} removeCookie={removeCookie} />}
          />

          <Route element={<Layout />}>
            {loggedIn && (
              <Route
                path="/board"
                element={
                  <Dashboard
                    loggedIn={loggedIn}
                    myId={myId}
                    authToken={authToken}
                  />
                }
              />
            )}
            {loggedIn && (
              <Route
                path="/profile"
                element={<Profile myId={myId} authToken={authToken} />}
              />
            )}
            {loggedIn && (
              <Route
                path="/chat"
                element={<Chat myId={myId} authToken={authToken} />}
              />
            )}
            {loggedIn && (
              <Route
                path="/detail/:userId"
                element={<PetDetail authToken={authToken} />}
              />
            )}
          </Route>
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
