import React from "react";
import "./Login.css";
import LoginImg from "../../../images/login-main.png";
import Logo from "../../../images/logo.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { validateCredentials } from "../helperfunctions";
import { toast } from "react-toastify";
import MsgIcon from "../../../images/msgIcon.png";
import LockIcon from "../../../images/lockIcon.png";
import ViewIcon from "../../../images/view.png";
import HideIcon from "../../../images/hide.png";
import { Link } from "react-router-dom";
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const baseUrl = "http://localhost:3300/api";

  function handleSubmit(event) {
    event.preventDefault();
    if (validateCredentials(credentials)) {
      setCredentials({
        email: credentials.email,
        password: credentials.password,
      });
      handleLogin();
    } else {
      alert("Please enter a valid email address.");
    }
  }
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${baseUrl}/auth/login`, credentials);
      const data = res.data;
      const accessToken = data.access_token;
      const user = data.user;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", accessToken);
      navigate("/addprofile");
    } catch (error) {
      if (error.response.data.message === "User needs Verification")
        toast.error("User needs Verification!");
      if (error.response.data.message === "Password Incorrect")
        toast.error("Password Incorrect!");
      if (error.response.data.message === "No user found")
        toast.error("User Not Found!");
    }
  };
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <>
      <div className="sidebar col-4">
        <div className="sidebar-inner">
          <img className="login-img" src={LoginImg} />
        </div>
      </div>
      <div className="login-main col-8 ">
        <img src={Logo} alt="" />
        <div className="login-inner">
          <h5>Sign in</h5>
          <p>If you don’t have an account, register</p>
          <p>
            You can{" "}
            <Link
              style={{
                color: "#a66dfe",
                textDecoration: "none",
                fontWeight: 600,
              }}
              to="/signup "
            >
              Register here !{" "}
            </Link>{" "}
          </p>
          <form className="form-main" onSubmit={handleSubmit}>
            <div style={{ marginTop: 40 }}>
              <label> Email</label> <br />
              <div>
                <img src={MsgIcon} alt="" />
                <input
                  className="input"
                  type="email"
                  value={credentials.email}
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  placeholder="Enter you email address"
                />
                <div
                  style={{
                    borderBottom: "2px solid #ccc",
                    marginTop: "2px",
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div style={{ marginTop: 30 }}>
                <label>Password</label> <br />
                <div className="password">
                  <div>
                    <img src={LockIcon} alt="" />
                    <input
                      className="input"
                      placeholder="Enter Your Password"
                      type="password"
                      value={credentials.password}
                      onChange={(e) =>
                        setCredentials({
                          ...credentials,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                  <img src={ViewIcon} alt="" />
                </div>
                <div
                  style={{
                    borderBottom: "2px solid #ccc",
                    marginTop: "2px",
                  }}
                ></div>
              </div>
            </div>
            <div style={{ marginTop: 20 }}>
              <div className="forgot-pass">
                <div>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleChange}
                  />
                  <label className="px-3">{checked}Remember me</label>
                </div>

                <button>Forgot Password ?</button>
              </div>
            </div>
            <button className="login-btn">Login</button>
          </form>
        </div>
      </div>
    
    </>
  );
};

export default Login;
