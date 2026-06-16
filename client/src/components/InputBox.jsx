function InputBox({ value, onChange, onSend, disabled }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="input-container">
      <input
        className="message-input"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={disabled}
      />
      <button className="send-button" onClick={onSend} disabled={disabled}>
        {disabled ? "..." : "Send"}
      </button>
    </div>
  );
}

export default InputBox;
