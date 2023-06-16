import React, { useState, useMemo, useRef } from "react";
import TinderCard from "react-tinder-card";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

const db = [
  {
    name: "Richard Hendricks",
    url: "https://images.dog.ceo/breeds/saluki/n02091831_8843.jpg",
  },
  {
    name: "Erlich Bachman",
    url: "https://images.dog.ceo/breeds/bouvier/n02106382_1000.jpg",
  },
  {
    name: "Monica Hall",
    url: "https://images.dog.ceo/breeds/mix/dog1.jpg",
  },
  {
    name: "Jared Dunn",
    url: "https://images.dog.ceo/breeds/spitz-japanese/tofu.jpg",
  },
  {
    name: "Dinesh Chugtai",
    url: "https://images.dog.ceo/breeds/setter-english/n02100735_7731.jpg",
  },
];

export const DogCard = () => {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
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
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <Box className="tinder-card">
      <link
        href="https://fonts.googleapis.com/css?family=Damion&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css?family=Alatsi&display=swap"
        rel="stylesheet"
      />

      <div className="cardContainer">
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: "url(" + character.url + ")" }}
              className="card"
            >
              <h3>{character.name}</h3>
            </div>
          </TinderCard>
        ))}
      </div>
      <div className="buttons">
        <Fab size="small" disabled={!canSwipe} onClick={() => swipe("left")}>
          <CloseIcon color="error" />
        </Fab>
        <Fab size="small" disabled={!canGoBack} onClick={() => goBack()}>
          <ReplayIcon color="warning" />
        </Fab>
        <Fab size="small" disabled={!canSwipe} onClick={() => swipe("right")}>
          <FavoriteOutlinedIcon color="success" />
        </Fab>
      </div>
      {lastDirection && (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      )}
    </Box>
  );
};
