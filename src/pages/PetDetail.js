import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Auth from "../util/auth";
import { getUser } from "../util/Api";
import { Detail } from "../components/Detail";

export default function PetDetail() {
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

  return loggedIn && user && <Detail user={user} goBack={true} />;
}
