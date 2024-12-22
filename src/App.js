import React from "react";
import { ChatProvider } from "./Context/ChatContext";
import ChatWindow from "./Components/ChatWindow";
import MessageInput from "./Components/MessageInput";
import UserList from "./Components/UserList";
import "./App.css";

function App() {
  return (
    <ChatProvider>
        <ChatWindow />
        <MessageInput />
        <UserList />
    </ChatProvider>
  );
}

export default App;
