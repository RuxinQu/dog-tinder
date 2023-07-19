import React, { useState } from "react";
import { DogCard } from "../components/DogCard";
import { Header } from "../components/Header";
// import { MatchList } from "../components/MatchList";
// import { Chat } from "../components/Chat";
import { UserContainer } from "../container/UserContainer";
import Box from "@mui/material/Box";

export default function Dashboard() {
  const [showHeader, setShowHeader] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const handleToggleHeader = () => {
    showHeader ? setShowHeader(false) : setShowHeader(true);
  };
  const handleToggleChat = () => {
    showChat ? setShowChat(false) : setShowChat(true);
  };
  return <DogCard />;
}
