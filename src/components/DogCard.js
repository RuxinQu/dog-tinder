import React, { useState, useMemo, useRef } from "react";
import { Detail } from "./Detail";
import { addMatch } from "../util/Api";
import TinderCard from "react-tinder-card";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const DogCard = ({ myId, users, authToken }) => {
  const [turnCard, setTurnCard] = useState(false);
  const [userToDisplay, setUserToDisplay] = useState({});
  const [currentIndex, setCurrentIndex] = useState(users.length - 1);
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);
  const handleTurnCard = (character) => {
    setUserToDisplay(character);
    setTurnCard(true);
  };

  const childRefs = useMemo(
    () =>
      Array(users.length)
        .fill(0)
        .map((i) => React.createRef()),
    [users.length]
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };
  const canSwipe = currentIndex >= 0;
  // set last direction and decrease current index
  const swiped = (direction, character, index) => {
    updateCurrentIndex(index - 1);
    if (direction === "right") {
      addMatch(myId, character._id, authToken);
    }
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < users.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  return (
    <Box className="tinder-card board">
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />

      <div className="card-container">
        {users?.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character._id}
            onSwipe={(dir) => swiped(dir, character, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            {turnCard ? (
              <Detail user={userToDisplay} setTurnCard={setTurnCard} />
            ) : (
              <div
                style={{
                  backgroundImage: character.imgs[0]?.original
                    ? "url(" + character.imgs[0]?.original + ")"
                    : "url(https://www.bil-jac.com/Images/DogPlaceholder.svg)",
                }}
                className="card"
              >
                <Fab
                  color="secondary"
                  size="small"
                  sx={{ float: "right" }}
                  onClick={() => handleTurnCard(character)}
                >
                  <MoreVertIcon />
                </Fab>
              </div>
            )}
          </TinderCard>
        ))}
      </div>
      {!turnCard && (
        <div className="buttons">
          <Fab size="small" disabled={!canSwipe} onClick={() => swipe("left")}>
            <CloseIcon color="" />
          </Fab>
          <Fab size="small" disabled={!canSwipe} onClick={() => swipe("right")}>
            <FavoriteOutlinedIcon color="error" />
          </Fab>
        </div>
      )}
    </Box>
  );
};
