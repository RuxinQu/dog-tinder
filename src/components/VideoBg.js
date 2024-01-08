import React from "react";

export const VideoBg = () => {
  const videoStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: -1,
    objectFit: "cover",
  };

  return (
    <video style={videoStyle} autoPlay muted loop>
      <source src={require("../assets/bg.mp4")} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};
