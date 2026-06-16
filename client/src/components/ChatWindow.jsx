import { useRef, useEffect } from "react";
import Message from "./Message";

function ChatWindow({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages-container">
      {messages.map((msg, i) => (
        <div key={i}>
          <Message role="user" text={msg.user} />
          <Message role="bot" text={msg.bot} />
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

export default ChatWindow;
