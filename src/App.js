import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import ChatWindow from "./Components/ChatApp/ChatWindow";
import MessageInput from "./Components/ChatApp/MessageInput";
import UserList from "./Components/ChatApp/UserList";
import UserForm from "./Components/Form/UserForm";
import TaskForm from "./Components/TaskManagement/TaskForm";
import TaskList from "./Components/TaskManagement/TaskList";
import { ChatProvider } from "./Context/ChatContext";
import { TaskProvider } from "./Context/TaskContext";
import HomePage from "./Components/HomePage";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
        <Route path="/" element={<HomePage />} />

          <Route
            path="/chat"
            element={
              <ChatProvider>
                <ChatWindow />
                <MessageInput />
                <UserList />
              </ChatProvider>
            }
            
          />
          <Route path="/user-form" element={<UserForm />} />
          <Route
            path="/tasks"
            element={
              <TaskProvider>
                <div className="task-manager-container">
                  <TaskForm />
                  <TaskList />
                </div>
              </TaskProvider>
              
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
