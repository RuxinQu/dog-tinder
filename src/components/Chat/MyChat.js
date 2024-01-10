import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";

export function Mychat({ content, user }) {
  return (
    <div
      style={{
        justifyContent: "flex-end",
      }}
      className="chat-box"
    >
      <span className="message-box">{content}</span>
      <Link to={"/profile"}>
        <Avatar
          sx={{ width: 50, height: 50, margin: "1px 10px" }}
          src={user.imgs[0]?.original || "./placeholder-img.png"}
          alt={user?.name || "user" + user._id.slice(3, 7)}
        />
      </Link>
    </div>
  );
}
