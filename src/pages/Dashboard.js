import Cookies from "js-cookie";
import Auth from "../util/auth";
import { DogCard } from "../components/Dashboard/DogCard";

export default function Dashboard({ users, myId }) {
  const authToken = Cookies.get("AuthToken");
  const loggedIn = Auth.loggedIn(authToken);

  return loggedIn ? (
    <div className="dashboard">
      {users.length ? (
        <DogCard myId={myId} users={users} authToken={authToken} />
      ) : (
        <h3 style={{ textAlign: "center" }}>Loading...</h3>
      )}
    </div>
  ) : (
    <p style={{ textAlign: "center", padding: 10 }}>You've logged out.</p>
  );
}
