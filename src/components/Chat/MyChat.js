import { Link } from "react-router-dom";
export function Mychat({ content, user }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <span style={{ border: "solid 1px black" }}>{content}</span>
      <Link to={"/profile"}>
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
    </div>
  );
}
