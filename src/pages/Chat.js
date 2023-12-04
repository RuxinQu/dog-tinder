import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Auth from "../util/auth";
import { getUser } from "../util/Api";
import { ChatContainer } from "../container/ChatContainer";
import { MessageContainer } from "../container/MessageContainer";
import Box from "@mui/material/Box";

export default function Chat({ myId }) {
  const authToken = Cookies.get("AuthToken");
  const loggedIn = Auth.loggedIn(authToken);
  const [userToDisplay, setUserToDisplay] = useState("");
  const [me, setMe] = useState({});
  useEffect(() => {
    // get all the users from my match list
    const getMatch = async () => {
      const meInfo = await getUser(myId, authToken);
      if (!meInfo.ok) return;
      const meInfoJson = await meInfo.json();
      setMe(meInfoJson);
    };
    getMatch();
  });

  const [showBorder, setShowBorder] = useState(false);
  return loggedIn ? (
    me.matches?.length !== 0 ? (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "90%",
          margin: "0 auto",
          border: showBorder && "5px solid #e6a7b2",
          borderRadius: "5px",
        }}
      >
        <Box sx={{ width: { xs: "100%", sm: "30%" } }}>
          {me.matches?.map((yourId) => (
            // this is the box that contains all the matched users
            <ChatContainer
              yourId={yourId}
              key={yourId}
              myId={myId}
              userToDisplay={userToDisplay}
              setUserToDisplay={setUserToDisplay}
              authToken={authToken}
              setShowBorder={setShowBorder}
            />
          ))}
        </Box>
        <Box sx={{ width: { xs: "100%", sm: "70%" } }}>
          <MessageContainer you={userToDisplay} me={me} authToken={authToken} />
        </Box>
      </Box>
    ) : (
      <p style={{ textAlign: "center", padding: 10 }}>No matches yet</p>
    )
  ) : (
    <p style={{ textAlign: "center", padding: 10 }}>You've logged out.</p>
  );
}
