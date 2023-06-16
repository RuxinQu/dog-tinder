export function Mychat({ content }) {
  return (
    <div style={{ textAlign: "right" }}>
      <span style={{ border: "solid 1px black" }}>{content}</span>
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
        alt="user"
      />
    </div>
  );
}
