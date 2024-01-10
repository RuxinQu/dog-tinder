import React, { useState, useEffect } from "react";
import { ChatDisplay } from "../components/Chat/ChatDisplay";
import { ChatInput } from "../components/Chat/ChatInput";
import { getMessage } from "../util/Api";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Fab from "@mui/material/Fab";

export const MessageContainer = ({
  you,
  me,
  authToken,
  showUserContainer,
  setShowUserContainer,
  setUserToDisplay,
}) => {
  const [allMessage, setAllMessage] = useState([]);
  const [messagesInOrder, setMessageInOrder] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      if (you._id) {
        const myMessage = await getMessage(me._id, you._id, authToken);
        if (!myMessage.ok) return;
        const myMessageJson = await myMessage.json();
        const yourMessage = await getMessage(you._id, me._id, authToken);
        if (!yourMessage.ok) return;
        const yourMessageJson = await yourMessage.json();
        setAllMessage([...myMessageJson, ...yourMessageJson]);
        const message = allMessage.sort(
          (a, b) => new Date(a.timeSent) - new Date(b.timeSent)
        );
        setMessageInOrder(message);
      }
    };
    getMessages();
  }, [authToken, allMessage, me._id, you._id]);

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "70%" },
        backgroundColor: "#E8F8FF",
        borderRadius: "20px",
        position: "relative",
      }}
    >
      {!showUserContainer && (
        <Fab
          size="small"
          color="secondary"
          sx={{ position: "absolute", left: 0 }}
          onClick={() => {
            setShowUserContainer(true);
            setUserToDisplay({ _id: "", imgs: [] });
          }}
        >
          <ArrowBackIcon />
        </Fab>
      )}

      <h3
        style={{
          textAlign: "center",
          padding: 20,
          marginBottom: 15,
          backgroundColor: "#c9e3ef",
          borderRadius: "20px 20px 0 0",
        }}
      >
        {you.name || "user" + you._id.slice(3, 7)}
      </h3>
      <ChatDisplay message={messagesInOrder} you={you} me={me} />
      <ChatInput myId={me._id} yourId={you._id} authToken={authToken} />
    </Box>
  );
};
