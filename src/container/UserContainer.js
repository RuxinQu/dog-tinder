import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { MatchUsers } from "../components/Chat/MatchUsers";
import { ChatContainer } from "./ChatContainer";
import { ChatInput } from "../components/Chat/ChatInput";

export function UserContainer() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const myId = cookies.UserId;

  const [users, setUsers] = useState([]);
  const [yourId, setYourId] = useState("");
  const [showbox, setShowbox] = useState(false);

  useEffect(() => {
    const getAllUser = async () => {
      const allUser = await fetch("http://localhost:3001/user/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const allUserJson = await allUser.json();
      const otherUser = allUserJson?.filter((u) => u._id !== myId);
      setUsers([...otherUser]);
    };
    getAllUser();
  }, [users]);

  return (
    <>
      {users?.map((u) => (
        <MatchUsers
          key={u._id}
          u={u}
          setShowbox={setShowbox}
          setYourId={setYourId}
          myId={myId}
        />
      ))}

      <div style={{ border: "solid 1px black", width: "100%" }}>
        {showbox && (
          <>
            <span onClick={() => setShowbox(false)}>X</span>
            <ChatContainer myId={myId} yourId={yourId} />
            <ChatInput myId={myId} yourId={yourId} />
          </>
        )}
      </div>
    </>
  );
}
