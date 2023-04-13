import React from "react";
import "./Signup.css";
// import LoginImg from "../../../images/login-img.png";
import FbIcon from "../../../images/fb-vector.png";
import { useState } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("")

  return (
    <>
      {/* <div className="sidebar">
        <div className="sidebar-inner">
          <img src={LoginImg} alt="login-img" />
          <p>
            “We've been using Later for a little over 2 years. The visual
            planner is one of the tools that has helped us become more efficient
            and it's an important part of our marketing toolkit.”
          </p>import SignUp from './SignUp';

          <span>Ryan Babenzien</span>
          <p className="img-name">Founder and CEO of GREATS</p>
        </div>
      </div> */}
      <div className="signup-main">
        <div className="signup-inner">
          <h1>Social Fusion</h1>
          <h2>Welcome Abroad</h2>
        </div>
        <form className="form-main" >
          <div style={{ marginTop: "20px" }}>
            <label>Business Email</label> <br />
            <input
              type="email"
              value={confirmEmail}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@gmail.com"
            />
          </div>
          <div style={{ marginTop: "20px" }}>
            <label>Confirm Business Email</label> <br />
            <input
              type="email"
              value={email}
              onChange={(event) => setConfirmEmail(event.target.value)}
              placeholder="name@gmail.com"
            />
          </div>
          <div>
            <div className="forgot">
              <label>Password</label>
              <a href="./dasd">Forgot Password ?</a>
            </div>
            <br />
            <input placeholder="******" />
          </div>
          <button className="signup-btn" >
            SignUp
          </button>
          <span>or</span>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="fb-btn">
              <img src={FbIcon} alt="" />
              <p>Login with Facebook</p>
            </button>
          </div>

          <div className="signup">
            <p>Already have an account? </p>
            <a href="/">Login</a>
          </div>
        </form>
        <label />
      </div>
    </>
  );
};

export default SignUp;
