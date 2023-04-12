import React from "react";
import "./Signup.css";
// import LoginImg from "../../../images/login-img.png";
import FbIcon from "../../../images/fb-vector.png";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validateCredentials } from "../helperfunctions";
import axios from 'axios'
const SignUp = () => {
  const [credentials, setCredentials] = useState({
    email:'',
    password:''
  });
  const [businessEmail,setBusinessEmail] = useState('')
  const baseUrl='http://localhost:3300/api'
   function handleSubmit(event) {
     event.preventDefault();
     if (credentials.email === businessEmail) {
       if (validateCredentials(credentials)) {
      console.log(credentials);
      // setEmail("");
      setCredentials({
        email: credentials.email,
        password: credentials.password
      })
      handleSignUp()
      setCredentials({
        email: '',
        password:''
      })
      setBusinessEmail('')
    } else {
      alert("Please enter a valid email address.");
    }
     }
     else {
             alert("Emails not matched");
     }
    
   }
  
  const handleSignUp = async () => {
     try{
       const res = await axios.post(`${baseUrl}/auth/register`, credentials)
       if (res.data) {
         console.log(res.data)
         toast.success(`${res.data.message}`)
       }
     }
     catch (error) {
       toast.error('Registration failed')
    }

  }
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
          <div style={{ marginTop: "20px" }}>
            <label>Confirm Business Email</label> <br />
            <input
              type="email"
              value={businessEmail}
              onChange={(e) => setBusinessEmail(e.target.value)}
              placeholder="name@gmail.com"
            />
          </div>
          <div>
            <div className="forgot">
              <label>Password</label>
              <a href="./dasd">Forgot Password ?</a>
            </div>
            <br />
            <input placeholder="******"  value={credentials.password} onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}/>
          </div>
          <button className="signup-btn">
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
