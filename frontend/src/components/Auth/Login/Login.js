import React from "react";
import "./Login.css";
import LoginImg from "../../../images/login-img.png";
import FbIcon from "../../../images/fb-vector.png";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");

  function validateEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateEmail(email)) {
      console.log("Email is Valid");
      setEmail("");
    } else {
      alert("Please enter a valid email address.");
    }
  }
  
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-inner">
          <img src={LoginImg} alt="login-img" />
          <p>
            “We've been using Later for a little over 2 years. The visual
            planner is one of the tools that has helped us become more efficient
            and it's an important part of our marketing toolkit.”
          </p>
          <span>Cam</span>
          <p className="img-name">Founder and CEO of GREATS</p>
        </div>
      </div>
      <div className="login-main">
        <div className="login-inner">
          <h1>Social Fusion</h1>
          <h2>Login</h2>
        </div>
        <form className="form-main" onSubmit={handleSubmit}>
          <div style={{ marginTop: "20px" }}>
            <label>Business Email</label> <br />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
          <button className="login-btn" onClick={handleSubmit}>
            Login
          </button>
          <span>or</span>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="fb-btn">
              <img src={FbIcon} alt="" />
              <p>Login with Facebook</p>
            </button>
          </div>

          <div className="signup">
            <p>New to SocialFusion? </p>
            <a href="/signup">Sign Up</a>
          </div>
        </form>
        <label />
      </div>
    </>
  );
};

export default Login;
