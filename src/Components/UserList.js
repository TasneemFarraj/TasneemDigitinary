import React, { useContext } from "react";
import ChatContext from "../Context/ChatContext";

const UserList = () => {
  const { isTyping } = useContext(ChatContext);

  return <div className="typing-indicator">{isTyping && "User is typing.."}</div>;
};

export default UserList;
