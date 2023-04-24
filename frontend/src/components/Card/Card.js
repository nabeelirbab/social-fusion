import React, { useState, useEffect } from "react";
import DeleteIcon from "../../images/delete.png";
import FbUser from "../../images/fbuser.png";
import Post from "../../images/post-dash.png";
import Notify from "../../images/notifi.png";
import Settings from "../../images/settings.png";
import Arrow from "../../images/arrow.png";
import "./Card.css";

const cards = [
  {
    title: "Facebook",
    postItems: [
      { icon: Post, title: "Next Post" },
      { icon: Notify, title: "Notifications" },
      { icon: Settings, title: "More Settings" },
    ],
  },
  {
    title: "Instagram",
    postItems: [
      { icon: Post, title: "Next Post" },
      { icon: Notify, title: "Notifications" },
      { icon: Settings, title: "More Settings" },
    ],
  },
  {
    title: "Twitter",
    postItems: [
      { icon: Post, title: "Next Post" },
      { icon: Notify, title: "Notifications" },
      { icon: Settings, title: "More Settings" },
    ],
  },
  {
    title: "LinkedIn",
    postItems: [
      { icon: Post, title: "Next Post" },
      { icon: Notify, title: "Notifications" },
      { icon: Settings, title: "More Settings" },
    ],
  },
];

const Card = () => {
  const [isActive, setIsActive] = useState(false);
  const [region, setRegion] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setCurrentView(showNotifications ? "dashboard" : "notifications");
  };

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setRegion(timezone);
    console.log(timezone);
  }, []);

  return (
    <>
      <div className="row">
        {cards.map((card, index) => (
          <div className="col-6 p-2">
            <div className="card" key={index}>
              <div className="card-header">
                <h5>{card.title}</h5>
                <button>
                  <img src={DeleteIcon} className="img-fluid" alt="" />
                </button>
              </div>
              <div className="card-dashboard">
                <div className="card-sidebar">
                  <div className="mt-2">
                    <div>
                      <img className="img-fluid" src={card.icon} alt="" />
                    </div>
                  </div>
                  <img src={FbUser} alt="" />
                  <h5>Yiden Chan</h5>
                  <p>React Dev</p>
                  <p>Profile</p>
                  <div className="d-flex justify-content-center pt-2 pb-2 align-items-center">
                    <div>
                      <span
                        style={{
                          fontSize: "14px",
                          paddingRight: "10px",
                          fontWeight: "400",
                        }}
                      >
                        Running
                      </span>
                    </div>
                    <div
                      className={`toggle-button ${isActive ? "active" : ""}`}
                      onClick={handleClick}
                    >
                      <div className="toggle-knob"></div>
                    </div>
                  </div>
                  <div className="timezone">
                    <span>Timezone: {region}</span>
                  </div>
                </div>
                {currentView === "dashboard" ? (
                  <div className="card-main">
                    {card.postItems.map((item, index) => (
                      <React.Fragment key={index}>
                        <div className="d-flex justify-content-between">
                          <div className="post">
                            <div>
                              <img src={item.icon} alt="" />
                            </div>
                            <span>{item.title}</span>
                          </div>
                          <button
                            className="view-all"
                            onClick={toggleNotifications}
                          >
                            <span>View All</span>
                            <img src={Arrow} alt="" />
                          </button>
                        </div>
                        {index !== card.postItems.length - 1 && (
                          <div className="border"></div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <div className="notification-list">
                    <h3>Notifications</h3>
                    <ul>
                      <li>Notification 1</li>
                      <li>Notification 2</li>
                      <li>Notification 3</li>
                    </ul>
                    <button onClick={toggleNotifications}>Back</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Card;
