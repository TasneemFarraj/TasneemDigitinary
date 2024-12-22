import React from "react";
import { ChatProvider } from "./Context/ChatContext";
import ChatWindow from "./Components/ChatWindow";
import MessageInput from "./Components/MessageInput";
import UserList from "./Components/UserList";
import "./App.css";
import UserForm from "./Components/UserForm";
import FormInput from "./Components/FormInput";

function App() {
  return (
    <ChatProvider>
        <ChatWindow />
        <MessageInput />
        <UserList />
         <UserForm/>
         <FormInput/>
    </ChatProvider>
   
  );
}

export default App;
