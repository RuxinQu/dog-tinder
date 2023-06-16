import { Mychat } from "./MyChat";
import { Yourchat } from "./YourChat";

export function ChatDisplay({ message, myId, yourId }) {
  return message.map((m) => {
    return m.fromUser === myId ? (
      <Mychat key={m.timeSent} content={m.content} />
    ) : (
      <Yourchat key={m.timeSent} content={m.content} />
    );
  });
}
