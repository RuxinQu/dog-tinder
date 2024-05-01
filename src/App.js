import React, { lazy, Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme, Layout } from "./util/theme";
import Auth from "./util/auth";
import { getUser, getUsers } from "./util/Api";
import VerifyEmail from "./pages/VerifyEmail";

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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        if (!authToken) return;
        const usersResponse = await getUsers(authToken);
        if (!usersResponse.ok) return;
        const usersJson = await usersResponse.json();
        const verifiedUser = usersJson.filter((user) => user.isVerified);

        // Fetch current user's matches
        const meResponse = await getUser(myId, authToken);
        if (!meResponse.ok) return;
        const meJson = await meResponse.json();
        const { matches } = meJson;
        // Filter users to exclude matches and the current user
        const filteredUsers = verifiedUser.filter(
          (user) => !matches.includes(user._id) && user._id !== myId
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [authToken, myId]);

  return (
    <ThemeProvider theme={theme}>
      {/* lazy loading the pages to improve web performance */}
      <Suspense fallback={<h1 style={{ textAlign: "center" }}>loading...</h1>}>
        <Router>
          <Routes>
            <Route path="/verify" element={<VerifyEmail />} />
            <Route path="/" element={<Home loggedIn={loggedIn} />} />
            <Route element={<Layout />}>
              {loggedIn && (
                <Route
                  path="/board"
                  element={<Dashboard myId={myId} users={users} />}
                />
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
