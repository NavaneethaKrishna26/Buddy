import React, { useState } from "react";
import "../styles/askai.css";
import buddy from "../assets/buddy.jpg";

function AskAI() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    const query = input.trim().toLowerCase();
    if (!query) return;

    // Add user message to chat
    const newUserMessage = {
      type: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setChatHistory((prev) => [...prev, newUserMessage]);

    // Call Dictionary API
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${query}`);
      const data = await response.json();

      console.log("API response:", data); // Debug API response in console

      let definition = "Sorry, I couldn't find the definition.";

      if (Array.isArray(data) && data.length > 0 && data[0].meanings && data[0].meanings.length > 0) {
        definition = data[0].meanings[0].definitions[0].definition;
      } else if (data.title && data.title === "No Definitions Found") {
        definition = "No definitions found for that word.";
      }

      const botMessage = {
        type: "bot",
        text: definition,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);

      const botMessage = {
        type: "bot",
        text: "Oops! Something went wrong while fetching the definition.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setChatHistory((prev) => [...prev, botMessage]);
    }

    // Clear input box
    setInput("");
  };

  return (
    <div className="ask-buddy-container">
      <div className="ask-buddy-header">
        <img src={buddy} alt="Buddy AI" className="ask-buddy-icon" />
        <h1 className="ask-buddy-title">Ask Buddy </h1>
      </div>

      <p className="ask-buddy-subtext">
        Your smart study companion. Ask anything — definitions, explanations, examples!
      </p>

      {/* Chat History */}
      <div className="ask-buddy-chat">
        {chatHistory.map((message, index) => (
          <div key={index} className={`chat-bubble ${message.type}`}>
            <img
              src={buddy}
              alt={message.type === "user" ? "User" : "Buddy AI"}
              className="avatar"
            />
            <div className="message-content">
              <p className="message-text">{message.text}</p>
              <span className="timestamp">{message.timestamp}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="ask-buddy-input-area">
        <textarea
          className="ask-buddy-textarea"
          placeholder="Type your question… e.g. Define polymorphism, Explain Newton’s laws"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button className="ask-buddy-send-btn" onClick={handleSend}>
          <span>Ask Buddy</span>
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}

export default AskAI;
