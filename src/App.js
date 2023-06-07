import React from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme, Layout } from "./util/theme";

import Home from "./pages/Home";

import { DogCard } from "./components/DogCard";
import { Chat } from "./components/Chat";
import "./App.css";

function App() {
  const [cookies, setCookie] = useCookies(["user"]);
  const authToken = cookies.AuthToken;
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Layout />}>
            {authToken && <Route path="/board" element={<DogCard />} />}
            <Route path="/11" element={<Chat />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
