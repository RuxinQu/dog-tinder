import React, { useState, useEffect } from "react";
import { DogCard } from "../components/DogCard";
import { getUsers, getUser } from "../util/Api";

export default function Dashboard({ myId, authToken }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const usersResponse = await getUsers(authToken);
      const usersJson = await usersResponse.json();
      const meResponse = await getUser(myId, authToken);
      const meJson = await meResponse.json();
      const substractArr = [...meJson.matches, myId];

      // userArr doesn't contain matched user or myself
      if (usersResponse.ok && meResponse.ok) {
        const userArr = usersJson.filter(
          (item) => !substractArr.includes(item._id)
        );
        setUsers([...userArr]);
      }
    };
    getAllUsers();
  }, [authToken, myId]);

  return users.length ? (
    <DogCard myId={myId} users={users} authToken={authToken} />
  ) : (
    <h3 style={{ textAlign: "center" }}>
      You have sent match requests to all the dogs, wait for their replies!
    </h3>
  );
}
