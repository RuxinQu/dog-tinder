import React, { useState, useEffect } from "react";
import { ChatDisplay } from "../components/Chat/ChatDisplay";
import { ChatInput } from "../components/Chat/ChatInput";
import Box from "@mui/material/Box";

export const MessageContainer = ({ you, me }) => {
  const [allMessage, setAllMessage] = useState([]);
  const [messagesInOrder, setMessageInOrder] = useState([]);
  useEffect(() => {
    const getMessage = async () => {
      const myMessage = await fetch(
        `http://localhost:3001/message/one?fromId=${me._id}&receiveId=${you._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const myMessageJson = await myMessage.json();
      const yourMessage = await fetch(
        `http://localhost:3001/message/one?fromId=${you._id}&receiveId=${me._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const yourMessageJson = await yourMessage.json();
      setAllMessage([...myMessageJson, ...yourMessageJson]);
      const message = allMessage.sort(
        (a, b) => new Date(a.timeSent) - new Date(b.timeSent)
      );
      setMessageInOrder(message);
    };
    getMessage();
  }, [you, allMessage]);

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "60%" },
        border: "1px solid black",
      }}
    >
      {you && (
        <h3 style={{ textAlign: "center" }}>
          {you.name || "user" + you._id.slice(3, 7)}
        </h3>
      )}
      <ChatDisplay message={messagesInOrder} you={you} me={me} />
      {you && <ChatInput myId={me._id} yourId={you._id} />}
    </Box>
  );
};
