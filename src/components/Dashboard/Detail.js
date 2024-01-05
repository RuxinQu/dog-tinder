import React from "react";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import UndoIcon from "@mui/icons-material/Undo";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const Detail = ({ user, setTurnCard, goBack }) => {
  const navigate = useNavigate();
  return (
    <div className="detail">
      <Fab
        size="small"
        color="secondary"
        sx={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}
        onClick={() => {
          goBack ? navigate(-1) : setTurnCard(false);
        }}
      >
        {goBack ? <ArrowBackIcon /> : <UndoIcon />}
      </Fab>

      <div>
        <Typography variant="h3">
          {user.name || "user" + user._id.slice(3, 7)}
        </Typography>
        <p>Breed: {user.breed || "unknown"}</p>
        <p>Age: {user.age || "unknown"}</p>
        <p>Size: {user.size || "unknown"}</p>

        <Typography variant="body1" sx={{ mt: 3 }}>
          {user.description}
        </Typography>
      </div>
      <div>
        {user.imgs?.length ? (
          user.imgs.map((i) => (
            <img src={i.original} alt={user.name} className="detail-img" />
          ))
        ) : (
          <img
            alt={user.name}
            src="https://www.bil-jac.com/Images/DogPlaceholder.svg"
          />
        )}
      </div>
    </div>
  );
};
