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
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [you, setYou] = useState([]);
  const [match, setMatch] = useState(false);
  // go through the match list of the user in my match list. Only display the user from my match list that also has me included in their match list
  useEffect(() => {
    const getMatch = async () => {
      const youInfo = await getUser(yourId, authToken);
      const youInfoJson = await youInfo.json();
      setYou(youInfoJson);
      const yourMatch = youInfoJson.matches;
      if (yourMatch.includes(myId)) {
        setMatch(true);
      } else {
        setMatch(false);
      }
    };
    getMatch();
  }, [yourId, match, authToken, myId]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const setBg = () => {
    if (userToDisplay._id === you._id || isHovered) {
      return "#fdfdfd";
    } else {
      return "#c9e3ef";
    }
  };

  return (
    // the matched users avatar and name
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: 10,
        backgroundColor: setBg(),
        borderRadius: "20px 0 0 20px",
      }}
      onClick={() => setUserToDisplay(you)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Avatar
        alt={you.name}
        src={
          you.imgs?.[0]?.original ||
          "https://www.bil-jac.com/Images/DogPlaceholder.svg"
        }
      />
      <span style={{ padding: "0 5px" }}>
        {you.name || "user" + you._id?.slice(3, 7)}
      </span>
    </div>
  );
}