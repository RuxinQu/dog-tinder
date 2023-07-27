import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import UndoIcon from "@mui/icons-material/Undo";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export const Detail = ({ user, handleTurnCard, turn }) => {
  const navigate = useNavigate();
  return (
    <div className="detailContainer">
      <Fab
        size="small"
        color="secondary"
        sx={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}
        onClick={() => (turn ? handleTurnCard() : navigate(-1))}
      >
        <UndoIcon />
      </Fab>
      <div style={{ maxWidth: 320 }}>
        {user.imgs?.length ? (
          <ImageGallery items={user.imgs} />
        ) : (
          <img
            alt={user._id}
            src="https://www.bil-jac.com/Images/DogPlaceholder.svg"
          />
        )}
      </div>
      <div className="detailInfo">
        <h2>I am~~~{user.name || "user" + user._id.slice(3, 7)} </h2>
        <Button variant="outlined" color="secondary" size="small">
          {user.breed || "unknown"}
        </Button>
        <Button variant="outlined" color="secondary" size="small">
          {user.age || "unknown"}
        </Button>
        <Button variant="outlined" color="secondary" size="small">
          {user.size || "unknown"}
        </Button>

        <Typography variant="body1" sx={{ mt: 3 }}>
          {user.description || "Information was not provided yet."}
        </Typography>
      </div>
    </div>
  );
};