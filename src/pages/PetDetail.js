import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Auth from "../util/auth";
import { getUser } from "../util/Api";
import { idbPromise } from "../util/idbHelper";
import { Detail } from "../components/Detail";

export default function PetDetail() {
  const authToken = Cookies.get("AuthToken");
  const loggedIn = Auth.loggedIn(authToken);
  const { userId } = useParams();
  const [user, setUser] = useState();
  useEffect(() => {
    const getUserProfile = async () => {
      const localUser = await idbPromise("dog", "getOne", userId);
      if (!localUser || localUser.expiry < new Date().getTime()) {
        console.log("========making an api call ========");
        const user = await getUser(userId, authToken);
        if (!user.ok) return;
        const userJson = await user.json();
        const cachedData = {
          ...userJson,
          expiry: new Date().getTime() + 3600 * 1000,
        };
        idbPromise("dog", "add", cachedData);
        setUser(cachedData);
      } else {
        console.log("========retrieving data from idb========");
        setUser(localUser);
      }
    };
    getUserProfile();
  }, [authToken, userId]);

  return loggedIn && user && <Detail user={user} goBack={true} />;
}
