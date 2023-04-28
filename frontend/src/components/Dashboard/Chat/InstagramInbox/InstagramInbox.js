import React from "react";
import "./Instagram.css";
import NewPostIcon from "../../../../images/Inbox/new-post.png";
import InstaUser from "../../../../images/Inbox/instaUser.png";
import DirectMsgIcon from "../../../../images/Inbox/directMsg.png";

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
];

const InstagramInbox = () => {
  return (
    <>
      <div className="instachat-main">
        <div className="left-inbox col-3">
          <div className="header">
            <h5 className="">Alexandar</h5>
            <img
              style={{ cursor: "pointer" }}
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
        <div className="col-9 new-message">
          <div>
            <img src={DirectMsgIcon} alt="" />
            <h5>Your Messages</h5>
            <p>Send private photos and messages to friends and group</p>
            <button>Send Message</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InstagramInbox;
