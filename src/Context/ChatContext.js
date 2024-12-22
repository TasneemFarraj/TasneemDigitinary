import { createContext, useState, useEffect, useRef } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatWindowRef = useRef(null);

  const UserResponses = [
    "Hello!",
    "How are you?",
    "What's new?",
    "Nice to meet you!",
    "I hope you're having a great day!",
    "Can I help you with something?",
    "I am a repot",
    "Welcome",
    "Best wishes",
    "Tell me more!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(true);
      setTimeout(() => {
        const randomResponse =
        UserResponses[Math.floor(Math.random() * UserResponses.length)];
        const UserMessage = {
          text: randomResponse,
          author: "User",
          timestamp: new Date().toLocaleTimeString(),
          type: "user",
        };
        setMessages((prev) => [...prev, UserMessage]);
        setIsTyping(false);
      }, 2000);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (text) => {
    const userMessage = {
      text,
      author: "Tasneem",
      timestamp: new Date().toLocaleTimeString(),
      type: "Tasneem",
    };
    setMessages((prev) => [...prev, userMessage]);
  };

  return (
    <ChatContext.Provider value={{ messages, isTyping, sendMessage, chatWindowRef }}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContext;
