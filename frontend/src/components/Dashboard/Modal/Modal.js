import React from "react";
import "./Modal.css";

const Modal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-inner">
          <h2>SocialFusion is requesting access to:</h2>
          <span>Your name , profile picture and email address</span>
        </div>
        <button>Continue as Mike</button>
        <button onClick={onClose} className="cancel-btn">
          Cancel
        </button>
        <p>
          By continuing, SocialFusion will receive ongoing access to the
          information that you share and Facebook will record when SocialFusion
          accesses it. Learn more about this sharing and the settings you have.
          <br/>SocialFusion Privacy Policy and Terms
        </p>
      </div>
    </div>
  );
};

export default Modal;
