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
  }, [myId, authToken]);

  return (
    loggedIn && (
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "30%" },
            border: "5px solid #e6a7b2",
            borderRadius: "20px 0 0 20px",
          }}
        >
          {me.matches?.map((yourId) => (
            <ChatContainer
              yourId={yourId}
              key={yourId}
              myId={myId}
              userToDisplay={userToDisplay}
              setUserToDisplay={setUserToDisplay}
              authToken={authToken}
            />
          ))}
        </Box>
        <MessageContainer you={userToDisplay} me={me} />
      </Box>
    )
  );
}
