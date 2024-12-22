import { useState, useContext } from "react";
import ChatContext from "../Context/ChatContext";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage } = useContext(ChatContext);

  const handleSend = () => {
      sendMessage(message);
      setMessage("");
  };

  return (
    <div className="chat-form">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default MessageInput;

//as a class component:

// import React, { Component } from "react";
// import ChatContext from "../Context/ChatContext";

// class MessageInput extends Component {
//   static contextType = ChatContext;

//   constructor(props) {
//     super(props);
//     this.state = {
//       message: "",
//     };
//   }

//   handleSend = () => {
//     const { sendMessage } = this.context;
//     sendMessage(this.state.message);
//     this.setState({ message: "" });
//   };

//   handleChange = (e) => {
//     this.setState({ message: e.target.value });
//   };

//   render() {
//     return (
//       <div className="chat-form">
//         <input
//           type="text"
//           value={this.state.message}
//           onChange={this.handleChange}
//           placeholder="Type a message"
//         />
//         <button onClick={this.handleSend}>Send</button>
//       </div>
//     );
//   }
// }

// export default MessageInput;
