import React from "react";

const Message = ({ message }) => (
  <div className={`message ${message.type}`}>
    <div>{message.text}</div>
    <div className="timestamp">{message.timestamp}</div>
  </div>
);

export default Message;
