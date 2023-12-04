import React, { useState, useEffect } from "react";
import { ChatDisplay } from "../components/Chat/ChatDisplay";
import { ChatInput } from "../components/Chat/ChatInput";
import { getMessage } from "../util/Api";
import Box from "@mui/material/Box";

export const MessageContainer = ({ you, me, authToken }) => {
  const [allMessage, setAllMessage] = useState([]);
  const [messagesInOrder, setMessageInOrder] = useState([]);
  useEffect(() => {
    const getMessages = async () => {
      if (you) {
        const myMessage = await getMessage(me._id, you._id, authToken);
        if (!myMessage.ok) return;
        const myMessageJson = await myMessage.json();
        const yourMessage = await getMessage(you._id, me._id, authToken);
        const yourMessageJson = await yourMessage.json();
        setAllMessage([...myMessageJson, ...yourMessageJson]);
        const message = allMessage.sort(
          (a, b) => new Date(a.timeSent) - new Date(b.timeSent)
        );
        setMessageInOrder(message);
      }
    };
    getMessages();
  }, [authToken, allMessage, me._id, you]);

  return (
    <Box sx={{ borderLeft: "5px solid #e6a7b2" }}>
      {you && (
        <h3
          style={{
            textAlign: "center",
            padding: 15,
            marginBottom: 15,
            backgroundColor: "#fec8a7",
          }}
          className="kalam"
        >
          {you.name || "user" + you._id.slice(3, 7)}
        </h3>
      )}
      <ChatDisplay message={messagesInOrder} you={you} me={me} />
      {you && (
        <ChatInput myId={me._id} yourId={you._id} authToken={authToken} />
      )}
    </Box>
  );
};
