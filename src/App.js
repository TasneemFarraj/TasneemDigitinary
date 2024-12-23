import React, { useState } from "react";
import { ChatProvider } from "./Context/ChatContext";
import ChatWindow from "./Components/ChatApp/ChatWindow";
import MessageInput from "./Components/ChatApp/MessageInput";
import UserList from "./Components/ChatApp/UserList";
import UserForm from "./Components/Form/UserForm";
import "./App.css";

function App() {
  const [activeView, setActiveView] = useState("home");

  const changeView = (view) => {
    setActiveView(view);
  };

  return (
    <div className="app">
      <div className="card-container">
        <div className="card" onClick={() => changeView("chat")}>
          <h4>Chat App</h4>
        </div>
        <div className="card" onClick={() => changeView("form")}>
          <h4>User Form</h4>
        </div>
      </div>

      {activeView === "home" }
      {activeView === "chat" && (
        <ChatProvider>
          <ChatWindow />
          <MessageInput />
          <UserList />
        </ChatProvider>
      )}
      {activeView === "form" && <UserForm />}
    </div>
  );
}

export default App;
