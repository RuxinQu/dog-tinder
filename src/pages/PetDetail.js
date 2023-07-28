import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Detail } from "../components/Detail";
import { getUser } from "../util/Api";
import { idbPromise } from "../util/idbHelper";

export default function PetDetail({ authToken }) {
  const { userId } = useParams();
  const [user, setUser] = useState();
  useEffect(() => {
    const getUserProfile = async () => {
      const localUser = await idbPromise("dog", "getOne", userId);
      if (!localUser) {
        console.log("========making an api call ========");
        const user = await getUser(userId, authToken);
        const userJson = await user.json();
        idbPromise("dog", "add", userJson);
        setUser(userJson);
      } else {
        console.log("========retrieving data from idb========");
        setUser(localUser);
      }
    };
    getUserProfile();
  }, [authToken, userId]);

  return user && <Detail user={user} goBack={true} />;
}
