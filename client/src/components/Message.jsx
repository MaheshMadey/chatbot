function Message({ role, text }) {
  return (
    <div className={`message ${role === "user" ? "user-message" : "bot-message"}`}>
      <div className="message-content">{text}</div>
    </div>
  );
}

export default Message;
