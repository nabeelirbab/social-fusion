import React, { useState } from "react";
import "./chat.css";
import Facebook from "./FacebookInbox/FacebookInbox";
import LinkedinInbox from "./LinkedinInbox/LinkedinInbox";
import InstagramInbox from "./InstagramInbox/InstagramInbox"
import TwitterInbox from "./TwitterInbox/TwittterInbox"

const Chat = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabsData = [
    {
      id: 0,
      title: "Instagram",
        component: <InstagramInbox />,
    },
    {
      id: 1,
      title: "Messenger",
      component: <Facebook />,
    },
    {
      id: 2,
      title: "Twitter",
        component: <TwitterInbox />,
    },
    {
      id: 3,
      title: "LinkedIn",
      component: <LinkedinInbox />,
    },
  ];

  const handleClick = (id) => {
    setActiveTab(id);
  };

  return (
    <>
      <div className="chat-main">
        {tabsData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleClick(tab.id)}
            className={activeTab === tab.id ? "active" : "non-active"}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div style={{ border: "1px solid #D9D9D9", margin:"20px 0px 5px 0px" }}></div>
      <div className="tab-content">{tabsData[activeTab].component}</div>
    </>
  );
};

export default Chat;
