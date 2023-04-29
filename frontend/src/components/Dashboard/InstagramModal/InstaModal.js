import React, { useState } from "react";
import CloseIcon from "../../../images/Inbox/close.png";
import "./InstaModal.css";
import InstaUser from "../../../images/Inbox/instaUser.png";

const InstaModal = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeConversation, setActiveConversation] = useState(null);

  const ConversationData = [
    {
      id: 1,
      img: InstaUser,
      name: "Everik",
      message: "Can you send me the invoice",
    },
    {
      id: 2,
      img: InstaUser,
      name: "Emiley",
      message: "Sure, no Problem",
    },
    {
      id: 3,
      img: InstaUser,
      name: "Peter",
      message: "Thanks for your help!",
    },
    {
      id: 4,
      img: InstaUser,
      name: "Cosmo",
      message: "That's look interesting",
    },
    {
      id: 5,
      img: InstaUser,
      name: "Emiley",
      message: "Sure, no Problem",
    },
  ];

  const filteredConversationData = ConversationData.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConversationClick = (id) => {
    setActiveConversation(id);
  };

  return (
    <>
      <div className="instamodal-overlay" onClick={onClose}>
        <div
          className="instamodal-contents"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="instamodal-inner">
            <img src={CloseIcon} onClick={onClose} />
            <h5>New Messages</h5>
            <button>Next</button>
          </div>
          <hr />
          <div className="instamodal-search">
            <span>To: </span>
            <input
              placeholder="search...."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="suggest">
            <h5>Suggested</h5>
            {filteredConversationData.map((conversation) => (
              <div className="suggested-conversations" key={conversation.id}>
                <div className="d-flex">
                  <img src={conversation.img} alt="" className="" />
                  <div>
                    <h5>{conversation.name}</h5>
                    <span>{conversation.message}</span>
                  </div>
                </div>
                <button
                  className={`round-select-button ${
                    activeConversation === conversation.id ? "active" : ""
                  }`}
                  onClick={() => handleConversationClick(conversation.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InstaModal;
