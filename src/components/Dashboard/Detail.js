import React from "react";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import UndoIcon from "@mui/icons-material/Undo";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Detail = ({ user, setTurnCard, goBack }) => {
  const navigate = useNavigate();
  return (
    <div
      className="detail"
      onClick={() => {
        goBack ? navigate(-1) : setTurnCard(false);
      }}
      onTouchStart={() => {
        goBack ? navigate(-1) : setTurnCard(false);
      }}
    >
      <Fab
        size="small"
        color="secondary"
        sx={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}
      >
        {goBack ? <ArrowBackIcon /> : <UndoIcon />}
      </Fab>

      <Typography variant="h3">
        {user.name || "user" + user._id.slice(3, 7)}
      </Typography>
      <div className="detail-info">
        <p>Breed: {user.breed || "unknown"}</p>
        <p>Age: {user.age || "unknown"}</p>
        <p>Size: {user.size || "unknown"}</p>
      </div>
      <div>
        {user.imgs?.length ? (
          user.imgs.map((i) => (
            <div
              className="detail-img-container"
              style={{
                backgroundImage: "url(" + i.original + ")",
              }}
            ></div>
          ))
        ) : (
          <div
            className="detail-img-container"
            style={{ backgroundImage: "url(./placeholder-img.png)" }}
          ></div>
        )}
      </div>
      <Typography variant="body1" sx={{ p: 5 }}>
        {user.description}
      </Typography>
    </div>
  );
};
