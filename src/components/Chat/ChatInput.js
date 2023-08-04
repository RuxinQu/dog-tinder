import React, { useState } from "react";
import { DateTime } from "luxon";
import Button from "@mui/material/Button";

export function ChatInput({ myId, yourId, authToken }) {
  const [content, setContent] = useState("");
  const handleSubmit = async () => {
    const response = await fetch(`http://localhost:3001/message/add-message`, {
      method: "POST",
      body: JSON.stringify({
        fromUser: myId,
        toUser: yourId,
        content,
        timeSent: DateTime.now().toString(),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    response.ok ? setContent("") : alert("Something went wrong");
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "10px 0",
      }}
    >
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          width: "70%",
          padding: 5,
          borderRadius: 20,
          fontSize: 20,
        }}
        required
      />
      <Button variant="contained" onClick={handleSubmit}>
        Send
      </Button>
    </div>
  );
}
