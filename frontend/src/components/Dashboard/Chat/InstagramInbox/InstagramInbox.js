import React, { useState } from "react";
import "./Instagram.css";
import NewPostIcon from "../../../../images/Inbox/new-post.png";
import InstaUser from "../../../../images/Inbox/instaUser.png";
import DirectMsgIcon from "../../../../images/Inbox/directMsg.png";
import InstaModal from "../../InstagramModal/InstaModal";
import InstaVideoIcon from "../../../../images/Inbox/insta-video.png";
import InstaCallIcon from "../../../../images/Inbox/insta-call.png";
import InstaInfoIcon from "../../../../images/Inbox/insta-info.png";
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
  {
    id: 6,
    img: InstaUser,
    name: "Peter",
    message: "Thanks for your help!",
  },
  {
    id: 7,
    img: InstaUser,
    name: "Cosmo",
    message: "That's look interesting",
  },
  {
    id: 8,
    img: InstaUser,
    name: "Cosmo",
    message: "That's look interesting",
  },
  {
    id: 9,
    img: InstaUser,
    name: "Jack Lee",
    message: "Thanks Paul for reaching out",
  },
];

const InstagramInbox = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chat, setChat] = useState(false);

  const handleInstaModal = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleNewChat = () => {
    setChat(true);
  };

  return (
    <>
      <div className="instachat-main">
        <div className="left-inbox col-3">
          <div className="header">
            <h5 className="">Alexandar</h5>
            <img
              style={{ cursor: "pointer" }}
              onClick={handleInstaModal}
              src={NewPostIcon}
              alt=""
              className="img-fluid"
            />
          </div>
          {ConversationData.map((conversation) => (
            <div className="insta-conversations" key={conversation.id}>
              <img src={conversation.img} alt="" className="" />
              <div>
                <h5>{conversation.name}</h5>
                <span>{conversation.message}- 8h</span>
              </div>
            </div>
          ))}
        </div>

        {chat === true ? (
          <>
            <div className="col-9">
              <div className="instabox-header">
                <div>
                  <h5>Morris</h5>
                </div>
                <div className="d-flex align-items-center">
                  <img src={InstaCallIcon} alt="" />
                  <img
                    style={{ cursor: "pointer" }}
                    src={InstaVideoIcon}
                    alt=""
                  />
                  <img src={InstaInfoIcon} alt="" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="col-9 new-message">
            <div>
              <img src={DirectMsgIcon} alt="" />
              <h5>Your Messages</h5>
              <p>Send private photos and messages to friends and group</p>
              <button onClick={handleNewChat}>Send Message</button>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && <InstaModal onClose={handleModalClose} />}
    </>
  );
};

export default InstagramInbox;
