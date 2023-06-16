import React, { useState, useEffect } from "react";
import { ChatDisplay } from "../components/Chat/ChatDisplay";

export function ChatContainer({ myId, yourId }) {
  const [allMessage, setAllMessage] = useState([]);
  useEffect(() => {
    const getMessage = async () => {
      const myMessage = await fetch(
        `http://localhost:3001/message/one?fromId=${myId}&receiveId=${yourId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const myMessageJson = await myMessage.json();
      const yourMessage = await fetch(
        `http://localhost:3001/message/one?fromId=${yourId}&receiveId=${myId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const yourMessageJson = await yourMessage.json();
      setAllMessage([...myMessageJson, ...yourMessageJson]);
    };
    getMessage();
  }, [yourId, allMessage]);

  const message = allMessage.sort(
    (a, b) => new Date(a.timeSent) - new Date(b.timeSent)
  );

  return (
    <>
      {allMessage.length && (
        <ChatDisplay message={message} myId={myId} yourId={yourId} />
      )}
    </>
  );
}
