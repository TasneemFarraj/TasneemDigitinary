import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./redux/store";
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
import FavoriteTasksAPI from "./Components/TaskManagement/FavoriteTasksAPI";
import FavoriteTasksRedux from "./Components/TaskManagement/FavoriteTaskRedux";

import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TaskProvider>
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
                    <div className="task-manager-container">
                      <TaskForm />
                      <TaskList />
                    </div>
                  }
                />
                <Route path="/favorites" element={<FavoriteTasksAPI />} />
                <Route path="/favorites-redux" element={<FavoriteTasksRedux />} />
              </Routes>
            </div>
          </Router>
        </TaskProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
