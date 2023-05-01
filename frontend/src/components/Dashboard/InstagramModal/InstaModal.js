import React, { useState } from "react";
import CloseIcon from "../../../images/Inbox/close.png";
import "./InstaModal.css";
import InstaUser from "../../../images/Inbox/instaUser.png";


const InstaModal = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNames, setSelectedNames] = useState([]);

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
      name: "Donald",
      message: "Sure, no Problem",
    },
  ];

  const filteredConversationData = ConversationData.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConversationClick = (name) => {
    if (selectedNames.includes(name)) {
      // If the name is already selected, remove it from the selectedNames array
      setSelectedNames(
        selectedNames.filter((selectedName) => selectedName !== name)
      );
    } else {
      // If the name is not selected, add it to the selectedNames array
      setSelectedNames([...selectedNames, name]);
    }
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
            <span>To:</span>
            <div>
              {selectedNames.map((name) => (
                <p key={name}>{name}</p>
              ))}
              <input
                placeholder="search...."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
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
                    selectedNames.includes(conversation.name) ? "active" : ""
                  }`}
                  onClick={() => handleConversationClick(conversation.name)}
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
