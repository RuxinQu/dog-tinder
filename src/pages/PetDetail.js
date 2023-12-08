import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Auth from "../util/auth";
import { getUser } from "../util/Api";
import { Detail } from "../components/Detail";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function PetDetail() {
  const navigate = useNavigate();
  const authToken = Cookies.get("AuthToken");
  const loggedIn = Auth.loggedIn(authToken);
  const { userId } = useParams();
  const [user, setUser] = useState();
  useEffect(() => {
    const getUserProfile = async () => {
      const user = await getUser(userId, authToken);
      if (!user.ok) return;
      const userJson = await user.json();
      setUser(userJson);
    };
    getUserProfile();
  }, [authToken, userId]);
  console.log(user);
  return (
    loggedIn &&
    user && (
      <div>
        <Fab
          size="small"
          color="secondary"
          // sx={{ position: "absolute", top: 10, left: 10, zIndex: 10 }}
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIcon />
        </Fab>
        <Box>
          <p>Name: {user.name || "user" + user._id.slice(3, 7)}</p>
          <p>Breed: {user.breed || "unknown"}</p>
          <p>Size: {user.size || "unknown"}</p>
          <p>{user.description || "Information was not provided yet."}</p>
        </Box>
        <Box>
          {user.imgs?.length ? (
            user.imgs.map((i) => <img src={i.original} alt={user._id} />)
          ) : (
            <img
              alt={user._id}
              src="https://www.bil-jac.com/Images/DogPlaceholder.svg"
            />
          )}
        </Box>
      </div>
    )
  );
}
