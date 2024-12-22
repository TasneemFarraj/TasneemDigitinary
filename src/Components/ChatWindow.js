import React, { useContext } from "react";
import ChatContext from "../Context/ChatContext";
import Message from "./Message";

const ChatWindow = () => {
  const { messages, chatWindowRef } = useContext(ChatContext);

  return (
    <div className="chat-container">
        <div className="chat-header">Chat</div>
    <div className="chat-window" ref={chatWindowRef}>
      {messages.map((msg, index) => (
        <Message key={index} message={msg} />
      ))}
    </div>
</div>
  );
};

export default ChatWindow;
