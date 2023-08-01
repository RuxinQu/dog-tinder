import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { DogCard } from "../components/DogCard";
import { getUsers, getUser } from "../util/Api";
import Auth from "../util/auth";

export default function Dashboard({ myId }) {
  const authToken = Cookies.get("AuthToken");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      if (!Auth.loggedIn(authToken)) {
        Auth.logOut();
      }
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
  });

  return (
    <div className="dashboard">
      {users.length ? (
        <DogCard myId={myId} users={users} authToken={authToken} />
      ) : (
        <h3 style={{ textAlign: "center" }}>
          You have sent match requests to all the dogs, wait for their replies!
        </h3>
      )}
    </div>
  );
}
