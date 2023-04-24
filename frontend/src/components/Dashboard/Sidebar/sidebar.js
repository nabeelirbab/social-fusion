import React from "react";
import "./sidebar.css";
import MainLogo from "../../../images/logo.png";
import { useState } from "react";
import InboxImg from "../../../images/inbox.png";
import FeedIcon from "../../../images/feed.png";
import NotificationsIcon from "../../../images/notifications.png";
import PostIcon from "../../../images/post.png";
import ProfileIcon from "../../../images/user.png";
import HomeImg from "../../../images/home.png";
import Profile from "../../../images/profile.png";
import Home from "../Home/Home";
import Inbox from "../Inbox/Inbox";

const tabs = [
  { id: "home", label: "Home", icon: HomeImg, component: Home },
  { id: "inbox", label: "Inbox", icon: InboxImg, component: Inbox },
  { id: "feed", label: "Feed", icon: FeedIcon },
  { id: "create-post", label: "Create Post", icon: PostIcon },
  {
    id: "notifications",
    label: "Notifications",
    icon: NotificationsIcon,
  },
  { id: "profile", label: "Profile", icon: ProfileIcon },
];

function Sidebar() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
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
          <h2>Social Profile Overview </h2>
          <img src={Profile} alt="profile" />
        </div>
        <div className="content">
          {activeTab.component ? <activeTab.component /> : null}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
