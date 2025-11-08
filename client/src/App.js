import { useState, useRef, useEffect } from "react";
import axios from "axios";
import './App.css';

// Add dark theme to body
document.body.style.backgroundColor = '#1a1b26';
document.body.style.margin = '0';
document.body.style.padding = '0';

function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/chat", { message: input });
      const reply = res.data.reply;
      setChat([...chat, { user: input, bot: reply }]);
      setInput("");
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h1>🤖 AI Assistant</h1>
      </header>
      
      <div className="messages-container">
        {chat.map((msg, i) => (
          <div key={i}>
            <div className="message user-message">
              <div className="message-content">
                {msg.user}
              </div>
            </div>
            <div className="message bot-message">
              <div className="message-content">
                {msg.bot}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <input
          className="message-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button 
          className="send-button"
          onClick={sendMessage}
          disabled={isLoading}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default App;
