import React, { useState, useEffect } from "react";
import { DogCard } from "../components/DogCard";
import { getUsers } from "../util/Api";
import { Header } from "../components/Header";
// import { MatchList } from "../components/MatchList";
// import { Chat } from "../components/Chat";
import { UserContainer } from "../container/UserContainer";
import Box from "@mui/material/Box";

export default function Dashboard({ myId }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const response = await getUsers();
      const responseJson = await response.json();
      const userArr = responseJson.filter((u) => u._id !== myId);
      setUsers([...userArr]);
    };
    getAllUsers();
  }, []);

  return users.length && <DogCard myId={myId} users={users} />;
}
