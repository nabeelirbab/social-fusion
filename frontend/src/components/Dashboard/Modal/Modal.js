import React from "react";
import "./Modal.css";
import VerifyIcon from "../../../images/verify.png"

const Modal = ({ onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-contents" onClick={(e) => e.stopPropagation()}>
        <div className="modal-inner">
          <img src={VerifyIcon} alt=""/>
          <h4>Please verify your email address</h4>
          <p>Email has been sent to your account!</p>
        </div>
        <button onClick={onClose} className="verify-btn">
          Verify
        </button>
      </div>
    </div>
  );
};

export default Modal;
