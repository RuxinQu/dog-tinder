import React from "react";
import Typography from "@mui/material/Typography";

export const Detail = ({ character }) => {
  return (
    <div className="detail">
      <Typography variant="h3">
        {character.name || "user" + character._id.slice(3, 7)}
      </Typography>
      <div>
        <p>Breed: {character.breed || "unknown"}</p>
        <p>Age: {character.age || "unknown"}</p>
        <p>Size: {character.size || "unknown"}</p>
      </div>
      <div>
        {character.imgs?.length ? (
          character.imgs.map((i) => (
            <div
              key={i.original}
              className="detail-img-container"
              style={{
                backgroundImage: "url(" + i.original + ")",
              }}
            ></div>
          ))
        ) : (
          <div
            className="detail-img-container"
            style={{
              backgroundImage: "url(./transparent-placeholder-img.png)",
            }}
          ></div>
        )}
      </div>

      <Typography variant="body1" sx={{ p: 5 }}>
        {character.description}
      </Typography>
    </div>
  );
};
