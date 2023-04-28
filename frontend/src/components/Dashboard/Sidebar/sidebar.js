import React, { useState } from "react";
import "./sidebar.css";
import MainLogo from "../../../images/logo.png";
import InboxImg from "../../../images/inbox.png";
import FeedIcon from "../../../images/feed.png";
import NotificationsIcon from "../../../images/notifications.png";
import PostIcon from "../../../images/post.png";
import ProfileIcon from "../../../images/user.png";
import HomeImg from "../../../images/home.png";
import Profile from "../../../images/profile.png";
import Home from "../Home/Home";
import Chat from "../Chat/Chat";  

const tabs = [
  {
    id: "home",
    label: "Home",
    icon: HomeImg,
    component: Home,
    title: "Social Profile Overview",
  },
  {
    id: "inbox",
    label: "Inbox",
    icon: InboxImg,
    component: Chat,
    title: "Inbox",
  },
  { id: "feed", label: "Feed", icon: FeedIcon, title: "Feed" },
  {
    id: "create-post",
    label: "Create Post",
    icon: PostIcon,
    title: "Create Post",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: NotificationsIcon,
    title: "Notifications",
  },
  { id: "profile", label: "Profile", icon: ProfileIcon, title: "Profile" },
];

function Sidebar() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [title, setTitle] = useState(activeTab.title);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setTitle(tab.title);
  };

  return (
    <div className="main-dashboard">
      <div className="sidebars ">
        <div className="sidebar-logo">
          <img src={MainLogo} alt="" className="img-fluid" />
          <h5>Social Fusion</h5>
        </div>
        <div>
          <ul>
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={activeTab.id === tab.id ? "active" : ""}
                onClick={() => handleTabClick(tab)}
              >
                <img
                  src={tab.icon}
                  alt={tab.label}
                  className={activeTab.id === tab.id ? "active-image" : ""}
                />
                <a
                  href="#"
                  className={activeTab.id === tab.id ? "active-link" : ""}
                >
                  {tab.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="main-content">
        <div className="dash-header">
          {activeTab.id === "inbox" ? (
            <>
              <h2>{activeTab.title}</h2>
              <img src={Profile} alt="profile" />
            </>
          ) : (
            <>
              <h2>{activeTab.title}</h2>
              <img src={Profile} alt="profile" />
            </>
          )}
        </div>
        <div className="content">
          {activeTab.component ? <activeTab.component /> : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
