import React, { useState, useMemo, useRef, useEffect } from "react";
import { useCookies } from "react-cookie";
import { addMatch, getUser } from "../util/Api";
import TinderCard from "react-tinder-card";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

const db = [
  {
    id: "01",
    name: "Richard Hendricks",
    breed: "ddd",
    age: "1",
    description: "laalall",
    img: [
      { original: "https://images.dog.ceo/breeds/saluki/n02091831_8843.jpg" },
      { original: "https://images.dog.ceo/breeds/saluki/n02091831_8843.jpg" },
      { original: "https://images.dog.ceo/breeds/saluki/n02091831_8843.jpg" },
    ],
  },
  {
    name: "Erlich Bachman",
    id: "02",
    breed: "ddd",
    age: "1",
    description:
      "laalalllaalallaalallaalallaalallaalallaalallaalallaalallaalallaalallaalallaalallaalallaalallaalallaalallaalal",
    img: [
      { original: "https://images.dog.ceo/breeds/bouvier/n02106382_1000.jpg" },
      { original: "https://images.dog.ceo/breeds/bouvier/n02106382_1000.jpg" },
      { original: "https://images.dog.ceo/breeds/bouvier/n02106382_1000.jpg" },
    ],
  },
  // {
  //   name: "Monica Hall",
  //   id: "03",
  //   url: "https://images.dog.ceo/breeds/mix/dog1.jpg",
  // },
  // {
  //   name: "Jared Dunn",
  //   id: "04",
  //   url: "https://images.dog.ceo/breeds/spitz-japanese/tofu.jpg",
  // },
  // {
  //   name: "Dinesh Chugtai",
  //   id: "05",
  //   url: "https://images.dog.ceo/breeds/setter-english/n02100735_7731.jpg",
  // },
];

export const DogCard = () => {
  useEffect(() => {
    const getUsers = async () => {
      const response = await getUser();
      console.log(response);
    };
    getUsers();
  }, []);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const myId = cookies.UserId;
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
  const swiped = (direction, nameToDelete, characterId, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
    console.log(direction);
    addMatch(myId, characterId);
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
            onSwipe={(dir) => swiped(dir, character.name, character.id, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <Card className="card">
              <CardMedia>
                <ImageGallery items={character.img} loading="lazy" />
              </CardMedia>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {character.name}
                </Typography>
                <Typography gutterBottom variant="body1" component="div">
                  breed: {character.breed}
                  <br />
                  age: {character.age}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {character.description}
                </Typography>
              </CardContent>
            </Card>
          </TinderCard>
        ))}
      </div>
      <div className="buttons">
        <Fab size="small" disabled={!canSwipe} onClick={() => swipe("left")}>
          <CloseIcon color="error" />
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
