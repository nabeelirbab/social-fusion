import React from "react";
import "./Login.css";
import LoginImg from "../../../images/login-img.png";
import FbIcon from "../../../images/fb-vector.png";
import { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { validateCredentials } from "../helperfunctions";
import { toast } from "react-toastify";
const Login = () => {
  const [credentials, setCredentials] = useState({
    email:'',
    password:''
  });
   const navigate = useNavigate();
  const baseUrl='http://localhost:3300/api'

  function handleSubmit(event) {
    event.preventDefault();
    if (validateCredentials(credentials)) {
      setCredentials({
        email: credentials.email,
        password: credentials.password
      })
      handleLogin()
    } else {
      alert("Please enter a valid email address.");
    }
  }
  const handleLogin = async () => {
    try{
    const res =await axios.post(`${baseUrl}/auth/login`, credentials)
    const data = res.data
      const accessToken= data.access_token
      const user = data.user
      localStorage.setItem('user',JSON.stringify(user))
      localStorage.setItem('token', accessToken)
      navigate('/addprofile')
    }
    catch (error) {
      if(error.response.data.message==='User needs Verification')
        toast.error('User needs Verification!')
      if (error.response.data.message === 'Password Incorrect')
        toast.error('Password Incorrect!')
      if (error.response.data.message === 'No user found')
        toast.error('User Not Found!')        
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
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              placeholder="name@gmail.com"
            />
          </div>
          <div>
            <div className="forgot">
              <label>Password</label>
              <a href="./dasd">Forgot Password ?</a>
            </div>
            <br />
            <input placeholder="password" type="password" value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}/>
          </div>
          <button className="login-btn" >
            Login
          </button>
          <span>or</span>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button className="fb-btn" onClick={handleLogin}>
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
