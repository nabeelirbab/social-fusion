import React from "react";
import "./Login.css";
import { useState } from "react";
import LoginImg from "../../../images/login-main.png"
import Logo from "../../../images/logo.png"

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
      <div className="sidebar col-4">
       <div className="sidebar-inner">
        <img className="login-img" src={LoginImg}/>
       </div>
      </div>
      {/* <div className="login-main">    
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
        </form>
      </div> */}
      <div className="login-main col-8 ">
        <img  src={Logo} alt=""/>
        <div className="login-inner">
          <h5>Sign in</h5>
          <p>If you don’t have an account, register</p>
          <p>You can  Register here !</p>
        </div>
      </div>
    </>
  );
};

export default Login;
