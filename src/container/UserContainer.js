import React, { useEffect, useState } from "react";
import { getUser } from "../util/Api";
import Avatar from "@mui/material/Avatar";

// is the component that contains only one matched user
export function UserContainer({
  yourId,
  myId,
  userToDisplay,
  setUserToDisplay,
  authToken,
  setMatcheCount,
}) {
  const [isHovered, setIsHovered] = useState(false);
  // the state you is the user this component is currently displaying. Each userContainer has one user, clicking on the userContainer box will switch the current userToDisplay to the user stored in the corresponding userContainer
  const [you, setYou] = useState({ imgs: [], _id: "", matches: [] });

  // go through the match list of the user in my match list. Only display the user from my match list that also has me included in their match list
  useEffect(() => {
    const getMatch = async () => {
      const youInfo = await getUser(yourId, authToken);
      const youInfoJson = await youInfo.json();
      setYou((prevYou) => ({
        ...prevYou,
        ...youInfoJson,
      }));
      setMatcheCount((prev) => prev + 1);
    };
    getMatch();
  }, [authToken, yourId, setMatcheCount]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const setBg = () => {
    if (userToDisplay._id === you._id || isHovered) {
      return "#c9e3ef";
    } else {
      return "#FFE2B9";
    }
  };

  return (
    // the matched users avatar and name
    you.matches.includes(myId) && (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: 10,
          margin: "2px 0",
          backgroundColor: setBg(),
          borderRadius: "20px",
        }}
        onClick={() => setUserToDisplay(you)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Avatar
          alt={you.name}
          src={you.imgs?.[0]?.original || "./placeholder-img.png"}
        />
        <span style={{ padding: "0 5px" }}>
          {you.name || "user" + you._id?.slice(3, 7)}
        </span>
      </div>
    )
  );
}
