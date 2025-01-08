import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
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
import ProductList from "./Components/Product/ProductList"; 
import Login from "./Components/Auth/Login"; 
import Signup from "./Components/Auth/Signup"; 
import CartPage from "./Components/Product/CartPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import WelcomePage from "./Components/WelcomePage"; 
import "./App.css";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleGuestContinue = () => {
    setShowWelcome(false); 
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

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
                    <ProtectedRoute>
                      <ChatProvider>
                        <ChatWindow />
                        <MessageInput />
                        <UserList />
                      </ChatProvider>
                    </ProtectedRoute>
                  }
                />
                <Route path="/user-form" element={<UserForm />} />
                <Route
                  path="/tasks"
                  element={
                    <ProtectedRoute>
                      <div className="task-manager-container">
                        <TaskForm />
                        <TaskList />
                      </div>
                    </ProtectedRoute>
                  }
                />
                <Route path="/products" element={<ProductList />} /> 
                <Route path="/login" element={<Login />} /> 
                <Route path="/signup" element={<Signup />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/favorites" element={<FavoriteTasksAPI />} />
                <Route path="/favorites-redux" element={<FavoriteTasksRedux />} />
              </Routes>
              {showWelcome && (
                <div className="welcome-overlay"> 
                  <WelcomePage onGuestContinue={handleGuestContinue} />
                </div>
              )}
            </div>
          </Router>
        </TaskProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
