import React, { useState } from "react";
import { DateTime } from "luxon";

export function ChatInput({ myId, yourId, authToken }) {
  const [content, setContent] = useState("");
  const handleSubmit = async () => {
    const response = await fetch("/message/add-message", {
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
    <div>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "80%" }}
        required
      />
      <button onClick={handleSubmit}>send</button>
    </div>
  );
}
