import { Mychat } from "./MyChat";
import { Yourchat } from "./YourChat";

export function ChatDisplay({ message, you, me, setShowDetail }) {
  return message.map((m) => {
    return m.fromUser === me._id ? (
      <Mychat key={m.timeSent} content={m.content} user={me} />
    ) : (
      <Yourchat
        key={m.timeSent}
        content={m.content}
        user={you}
        setShowDetail={setShowDetail}
      />
    );
  });
}
