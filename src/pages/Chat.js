import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Auth from "../util/auth";
import { getUser } from "../util/Api";
import { UserContainer } from "../container/UserContainer";
import { MessageContainer } from "../container/MessageContainer";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Chat({ myId }) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const authToken = Cookies.get("AuthToken");
  const loggedIn = Auth.loggedIn(authToken);
  const [me, setMe] = useState({ matches: [] });
  // usetToDisplay is the clicked user
  const [userToDisplay, setUserToDisplay] = useState({
    _id: "",
    imgs: [],
  });
  const [showUserContainer, setShowUserContainer] = useState(true);

  // the array for all the matched users.
  const [matchesUsers, setMatchedUsers] = useState([]);
  // in small screens, after a user is clicked, the userlist disappears
  useEffect(() => {
    if (isSmallScreen && userToDisplay._id) {
      setShowUserContainer(false);
    } else if (!isSmallScreen) {
      setShowUserContainer(true);
    }
  }, [isSmallScreen, userToDisplay._id]);

  // get all the users from my match list
  useEffect(() => {
    const getMatch = async () => {
      const meInfo = await getUser(myId, authToken);
      if (!meInfo.ok) return;
      const meInfoJson = await meInfo.json();
      setMe((prevMe) => ({
        ...prevMe,
        ...meInfoJson,
      }));
    };
    getMatch();
  }, [myId, authToken]);

  return (
    <Box sx={{ width: { lg: 1200 }, margin: "0 auto" }}>
      <Typography variant="h3">Start Chatting with friends!</Typography>
      {loggedIn ? (
        <div>
          {me.matches?.length !== 0 && (
            // if I have matched users, show the users and the messages
            <Box className="chat-container">
              {showUserContainer && (
                // show the user lists on big screen. on small screens, once a user is clicked, the user list disappears, only showing the messages
                <Box sx={{ width: { xs: "100%", sm: "30%" } }}>
                  {me.matches?.map((yourId) => (
                    <UserContainer
                      yourId={yourId}
                      key={yourId}
                      myId={myId}
                      userToDisplay={userToDisplay}
                      setUserToDisplay={setUserToDisplay}
                      authToken={authToken}
                      isSmallScreen={isSmallScreen}
                      matchesUsers={matchesUsers}
                      setMatchedUsers={setMatchedUsers}
                    />
                  ))}
                </Box>
              )}

              {userToDisplay._id && (
                <MessageContainer
                  you={userToDisplay}
                  me={me}
                  authToken={authToken}
                  showUserContainer={showUserContainer}
                  setShowUserContainer={setShowUserContainer}
                  setUserToDisplay={setUserToDisplay}
                />
              )}
            </Box>
          )}
          {!matchesUsers.length && (
            <p style={{ textAlign: "center", padding: 10 }}>
              You don't have any matched users yet. Keep exploring!
            </p>
          )}
        </div>
      ) : (
        <p style={{ textAlign: "center", padding: 10 }}>You've logged out.</p>
      )}
    </Box>
  );
}
