import Avatar from "@mui/material/Avatar";

export function Yourchat({ content, user, setShowDetail }) {
  return (
    <div
      style={{
        justifyContent: "flex-start",
      }}
      className="chat-box"
    >
      <span onClick={() => setShowDetail(true)}>
        <Avatar
          sx={{ width: 50, height: 50, margin: "1px 10px" }}
          src={user.imgs[0]?.original || "./placeholder-img.png"}
          alt={user?.name || "user" + user._id.slice(3, 7)}
        />
      </span>
      <span className="message-box" style={{ backgroundColor: "#F1B45C" }}>
        {content}
      </span>
    </div>
  );
}
