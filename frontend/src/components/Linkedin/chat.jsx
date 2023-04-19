import { useState, useEffect, useRef } from "react";
import './style.css'
import { getChat, sendChat, sendMessage } from "./helperFunctions";

export default function Chat({ conversation }) {
    
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
    // if (!conversation) return null;
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
    

  const handleSendMessage = async (event) => {
    event.preventDefault();

    sendChat(conversation?.profileId, messageInput)
      // .then((data) => {
// setMessages(data);   });
      setMessageInput("")
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (conversation) {
      getChat(conversation?.profileId).then((data) => {
        setMessages(data);
      });
    }
  }, [conversation]);

  return (
  <div className="chat">
  {messages
  ?.filter((message) => message?.text && message?.text?.trim())
  .reverse()
  ?.map((message) => {
    const { text, sentFrom, messageType, mediaUrl } = message;
    const fromMe = sentFrom.profileId !== conversation?.profileId;
    const className = fromMe ? "chat-bubble chat-bubble-me" : "chat-bubble chat-bubble-other";

    let content;
    switch (messageType) {
      case "text":
        content = <div className="chat-text">{text}</div>;
        break;
      case "image":
        content = (
          <div className="chat-media">
            <img src={mediaUrl} alt="Image" />
          </div>
        );
        break;
      case "video":
        content = (
          <div className="chat-media">
            <video src={mediaUrl} controls />
          </div>
        );
        break;
      default:
        content = <div className="chat-text">{text}</div>;
        break;
    }

    return (
      <div className={className}>
        {!fromMe && <div className="chat-from">{sentFrom.firstName}</div>}
        {content}
      </div>
    );
})}

        {/* </div> */}
      {/* ); */}
     {/* })} */}
    <form onSubmit={handleSendMessage}>
      <input
        type="text"
        placeholder="Type a message..."
        value={messageInput}
        onChange={(event) => setMessageInput(event.target.value)}
      />
      <button type="submit">Send</button>
    </form>
    <div ref={messagesEndRef} />
  </div>
);

}
