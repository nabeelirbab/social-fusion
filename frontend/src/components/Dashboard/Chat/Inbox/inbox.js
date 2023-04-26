import React, { useState } from "react";
import "./inbox.css";
import MessageIcon from "../../../../images/Inbox/message.png";
import Settings from "../../../../images/Inbox/Oval.png";
import SearchIcon from "../../../../images/Inbox/SearchIcon.png";
import MoreIcon from "../../../../images/Inbox/more.png";
const Inbox = () => {
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const handleFocus1 = () => {
    setIsFocused1(true);
  };

  const handleBlur1 = () => {
    setIsFocused1(false);
  };

  const handleFocus2 = () => {
    setIsFocused2(true);
  };

  const handleBlur2 = () => {
    setIsFocused2(false);
  };

  return (
    <>
      <div className="lichat-main">
        <div className="left-inbox col-3">
          <div className="heading">
            <h2>Messaging</h2>
            <div>
              <button>
                <img src={Settings} alt="" />
              </button>
              <a href="/">
                <img src={MessageIcon} alt="" />
              </a>
            </div>
          </div>
          <div className="search">
            <div>
              <img src={SearchIcon} alt="" />
              <input placeholder="Search Messages" />
            </div>
            <img src={MoreIcon} alt="" />
          </div>
          <div className="focused">
            <button
              className={isFocused1 ? "focused-btn" : "focused-button"}
              onFocus={handleFocus1}
              onBlur={handleBlur1}
            >
              Focused
            </button>
            <button
              className={isFocused2 ? "focused-btn" : "focused-button"}
              onFocus={handleFocus2}
              onBlur={handleBlur2}
            >
              Other
            </button>
          </div>
        </div>
        <div className="col-9">dasd</div>
      </div>
    </>
  );
};

export default Inbox;
