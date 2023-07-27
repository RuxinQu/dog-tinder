import { Link } from "react-router-dom";
export function Yourchat({ content, user }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Link to={`/detail/${user._id}`}>
        <img
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            margin: "1px 10px",
          }}
          src={user.imgs[0]?.original}
          alt={user?.name || "user" + user._id.slice(3, 7)}
        />
      </Link>
      <span style={{ border: "solid 1px black" }}>{content}</span>
    </div>
  );
}
