import React, { useState, useEffect } from "react";
import { DogCard } from "../components/DogCard";
import { getUsers } from "../util/Api";

export default function Dashboard({ myId, authToken }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await getUsers(authToken);
      const responseJson = await response.json();
      const userArr = responseJson.filter((u) => u._id !== myId);
      setUsers([...userArr]);
    };
    getAllUsers();
  }, []);

  return (
    users.length && <DogCard myId={myId} users={users} authToken={authToken} />
  );
}
