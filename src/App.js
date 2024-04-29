import React, { lazy, Suspense } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme, Layout } from "./util/theme";
import Auth from "./util/auth";

// import Home from "./pages/Home";
// import Profile from "./pages/Profile";
// import Dashboard from "./pages/Dashboard";
// import Chat from "./pages/Chat";
// import NoMatch from "./pages/NoMatch";
import { VideoBg } from "./components/VideoBg";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Chat = lazy(() => import("./pages/Chat"));
const NoMatch = lazy(() => import("./pages/NoMatch"));

function App() {
  const authToken = Cookies.get("AuthToken");
  const myId = Cookies.get("UserId");
  const loggedIn = Auth.loggedIn(authToken);
  return (
    <ThemeProvider theme={theme}>
      {/* lazy loading the pages to improve web performance */}
      <Suspense fallback={<h1>loading...</h1>}>
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
              {loggedIn && (
                <Route path="/chat" element={<Chat myId={myId} />} />
              )}
            </Route>
            {/* show no match page for all paths when loggedIn is false */}
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </Router>
      </Suspense>
      <VideoBg />
    </ThemeProvider>
  );
}

export default App;
