import React from "react";
import "./VideoModal.css";
import CloseIcon from "../../../images/Inbox/close.png";
import InstantIcon from "../../../images/Inbox/instant.png";
import CalenderIcon from "../../../images/Inbox/calendar.png";
import ArrowIcon from "../../../images/arrow.png";
import LinkedinIcon from "../../../images/linkedIn.png";

const Modal = ({ onClose }) => {


  return (
    <div className="videomodal-overlay" onClick={onClose}>
      <div className="videomodal-contents" onClick={(e) => e.stopPropagation()}>
        <div className="videomodal-inner">
          <h5>Create a Video Meeting</h5>
          <img src={CloseIcon} onClick={onClose} alt="" />
        </div>
        <hr />
        <div className="meeting">
          <img src={InstantIcon} alt="" />
          <p>Send an instant meeting</p>
        </div>
        <div className="meeting-later">
          <div className="d-flex">
            <img src={CalenderIcon} alt="" />
            <p>schedule meeting for later</p>
          </div>
          <img src={ArrowIcon} alt="" />
        </div>
        <div className="footer-modal">
          <div className="d-flex">
            <img src={LinkedinIcon} alt="" />
            <p>You’re using LinkedIn video meetings</p>
          </div>
          <span>Select a different Provider</span>
        </div>
      </div>
    </div>
  );
};

export default Modal;
