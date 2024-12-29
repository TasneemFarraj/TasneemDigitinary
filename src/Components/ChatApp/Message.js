import React from "react";
import '../../Style/ChatApp.css';

const Message = ({ message }) => (
  <div className={`message ${message.type}`}>
    <div>{message.text}</div>
    <div className="timestamp">{message.timestamp}</div>
  </div>
);

export default Message;
