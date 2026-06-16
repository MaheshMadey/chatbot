import { useState } from "react";
import axios from "axios";
import "./App.css";
import ChatWindow from "./components/ChatWindow";
import InputBox from "./components/InputBox";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

document.body.style.backgroundColor = "#1a1b26";
document.body.style.margin = "0";
document.body.style.padding = "0";

function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.post(`${API_URL}/api/chat`, { message: input });
      setChat((prev) => [...prev, { user: input, bot: res.data.reply }]);
      setInput("");
    } catch {
      setError("Failed to get a response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>🤖 AI Assistant</h1>
      </header>
      <ChatWindow messages={chat} />
      {error && <p className="error-message">{error}</p>}
      <InputBox
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onSend={sendMessage}
        disabled={isLoading}
      />
    </div>
  );
}

export default App;
