import React, { useState } from "react";
import "./TwitterInbox.css";
import NewMsgIcon from "../../../../images/Inbox/twitter-msg.png";
import SearchIcon from "../../../../images/Inbox/SearchIcon.png";
import TwitterUserIcon from "../../../../images/Inbox/twitterUser.png";
import InstaModal from "../../InstagramModal/InstaModal";

const conversations = [
  {
    id: 1,
    name: "Kim",
    message: "You shared a tweet",
    img: TwitterUserIcon,
  },
  {
    id: 2,
    name: "Micheal",
    message: "You shared a tweet",
    img: TwitterUserIcon,
  },
  {
    id: 3,
    name: "Shawn",
    message: "You shared a tweet",
    img: TwitterUserIcon,
  },
  {
    id: 4,
    name: "Harry",
    message: "You shared a tweet",
    img: TwitterUserIcon,
  },
];

const TwittterInbox = () => {
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleInstaModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <div className="twitter-main">
        <div className="leftInbox-twitter col-3">
          <div className="header-twitter">
            <h5 className="">Messages</h5>
            <img
              style={{ cursor: "pointer" }}
              //   onClick={handleInstaModal}
              src={NewMsgIcon}
              alt=""
              className="img-fluid"
            />
          </div>
          <div className="twitter-search">
            <div>
              <img src={SearchIcon} alt="" />
              <input
                placeholder="Search Direct Messages"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          {filteredConversations.map((conversation) => (
            <div className="twitter-conversations" key={conversation.id}>
              <img src={conversation.img} alt="twitter-img" />
              <div>
                <h5>{conversation.name}</h5>
                <span>{conversation.message}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="col-9 twitter-new-message">
          <div>
            <h5>Select Message</h5>
            <p>
              Choose from your existing conversatoin, start a new one or just
              keep swimming
            </p>
            <button onClick={handleInstaModal}>New Message</button>
          </div>
        </div>
      </div>
      {isModalOpen && <InstaModal onClose={handleModalClose} />}
    </>
  );
};

export default TwittterInbox;
