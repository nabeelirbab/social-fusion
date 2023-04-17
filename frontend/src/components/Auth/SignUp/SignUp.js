import React from "react";
import "./Signup.css";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateCredentials } from "../helperfunctions";
import axios from "axios";
import { Link } from "react-router-dom";
import UserIcon from "../../../images/userIcon.png";
import MsgIcon from "../../../images/msgIcon.png";
import lockIcon from "../../../images/lockIcon.png";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // const baseUrl = "http://localhost:3300/api";
  // function handleSubmit(event) {
  //   event.preventDefault();
  //   if (credentials.email === businessEmail) {
  //     if (validateCredentials(credentials)) {
  //       setCredentials({
  //         email: credentials.email,
  //         password: credentials.password,
  //       });
  //       handleSignUp();
  //       setCredentials({
  //         email: "",
  //         password: "",
  //       });
  //       setBusinessEmail("");
  //     } else {
  //       alert("Please enter a valid email address.");
  //     }
  //   } else {
  //     alert("Emails not matched");
  //   }
  // }

  // const handleSignUp = async () => {
  //   try {
  //     const res = await axios.post(`${baseUrl}/auth/register`, credentials);
  //     if (res.data) {
  //       toast.success(`${res.data.message}`);
  //     }
  //   } catch (error) {
  //     toast.error("Registration failed");
  //   }
  // };
  return (
    <>
      <div className="signup-main">
        <div>
          <div className="signup-inner">
            <h2>Welcome Abroad</h2>
            <p>
              If you have an account, login <br /> You can{" "}
              <Link
                style={{
                  fontWeight: "600",
                  textDecoration: "none",
                  color: "#a66dfe",
                }}
                to="/login"
              >
                Login Here
              </Link>
            </p>
          </div>
          <form className="signup-form">
            <div style={{ marginTop: "10px" }}>
              <label>First Name</label> <br />
              <div className="d-flex align-items-center">
                <img src={UserIcon} alt="" />
                <input
                  className="input"
                  type="name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter Your First Name"
                />
              </div>
              <div
                style={{
                  borderBottom: "2px solid #ccc",
                  marginTop: "5px",
                }}
              ></div>
            </div>
            <div style={{ marginTop: "10px" }}>
              <label>Last Name</label> <br />
              <div className="d-flex align-items-center">
                <img src={UserIcon} alt="" />
                <input
                  className="input"
                  type="name"
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  placeholder="Enter Your last Name"
                />
              </div>
              <div
                style={{
                  borderBottom: "2px solid #ccc",
                  marginTop: "5px",
                }}
              ></div>
              <div style={{ marginTop: "10px" }}>
                <label>Username</label> <br />
                <div className="d-flex align-items-center">
                  <img src={UserIcon} alt="" />
                  <input
                    className="input"
                    type="name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter Username"
                  />
                </div>
                <div
                  style={{
                    borderBottom: "2px solid #ccc",
                    marginTop: "5px",
                  }}
                ></div>
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>
              <label>Email</label> <br />
              <div className="d-flex align-items-center">
                <img src={MsgIcon} alt="" />
                <input
                  className="input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                />
              </div>
              <div
                style={{
                  borderBottom: "2px solid #ccc",
                  marginTop: "5px",
                }}
              ></div>
            </div>

            <div style={{ marginTop: "10px" }}>
              <label>Password</label> <br />
              <div className="d-flex align-items-center">
                <img src={lockIcon} alt="" />
                <input
                  className="input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                />
              </div>
              <div
                style={{
                  borderBottom: "2px solid #ccc",
                  marginTop: "5px",
                }}
              ></div>
            </div>

            <div style={{ marginTop: "10px" }}>
              <label>Confirm Password</label> <br />
              <div className="d-flex align-items-center">
                <img src={lockIcon} alt="" />
                <input
                  className="input"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter Your Password"
                />
              </div>
              <div
                style={{
                  borderBottom: "2px solid #ccc",
                  marginTop: "5px",
                }}
              ></div>
            </div>

            <div style={{ marginTop: 20}}>
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
            <button className="signup-btn">Login</button>
            {/* <div style={{ marginTop: "10px" }}>
              <label>Business Email</label> <br />
              <input
                type="email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
                placeholder="name@gmail.com"
              />
            </div>
            <div style={{ marginTop: "10px" }}>
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
              <input
                placeholder="******"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </div> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
