import React, { useEffect, useState } from "react";
import { getUser } from "../util/Api";
import { ChatContainer } from "../container/ChatContainer";
import { MessageContainer } from "../container/MessageContainer";

import Box from "@mui/material/Box";

export default function Chat({ myId, authToken }) {
  const [userToDisplay, setUserToDisplay] = useState("");
  const [me, setMe] = useState({});
  useEffect(() => {
    const getMatch = async () => {
      const meInfo = await getUser(myId, authToken);
      const meInfoJson = await meInfo.json();
      setMe(meInfoJson);
    };
    getMatch();
  }, [myId]);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      <Box sx={{ width: { xs: "100%", sm: "30%" }, border: "1px solid black" }}>
        {me.matches?.map((yourId) => (
          <ChatContainer
            yourId={yourId}
            key={yourId}
            myId={myId}
            setUserToDisplay={setUserToDisplay}
            authToken={authToken}
          />
        ))}
      </Box>
      <MessageContainer you={userToDisplay} me={me} authToken={authToken} />
    </Box>
  );
}
