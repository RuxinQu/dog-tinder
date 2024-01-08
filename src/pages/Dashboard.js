import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Auth from "../util/auth";
import { DogCard } from "../components/Dashboard/DogCard";
import { getUsers, getUser } from "../util/Api";

export default function Dashboard({ myId }) {
  const authToken = Cookies.get("AuthToken");
  const loggedIn = Auth.loggedIn(authToken);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      // get all the users
      const usersResponse = await getUsers(authToken);
      if (!usersResponse.ok) return;
      const usersJson = await usersResponse.json();
      // get my matches array
      const meResponse = await getUser(myId, authToken);
      if (!meResponse.ok) return;
      const meJson = await meResponse.json();
      const substractArr = [...meJson.matches, myId];

      // userArr doesn't contain matched users or myself
      const userArr = usersJson.filter(
        (item) => !substractArr.includes(item._id)
      );
      setUsers([...userArr]);
    };
    getAllUsers();
  }, [authToken, myId]);

  return loggedIn ? (
    <div className="dashboard">
      {users.length ? (
        <DogCard myId={myId} users={users} authToken={authToken} />
      ) : (
        <h3 style={{ textAlign: "center" }}>
          You have sent match requests to all the dogs, wait for their replies!
        </h3>
      )}
    </div>
  ) : (
    <p style={{ textAlign: "center", padding: 10 }}>You've logged out.</p>
  );
}
