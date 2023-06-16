export function Yourchat({ content }) {
  return (
    <div style={{ textAlign: "left" }}>
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
        alt="user"
      />
      <span style={{ border: "solid 1px black" }}>{content}</span>
    </div>
  );
}
