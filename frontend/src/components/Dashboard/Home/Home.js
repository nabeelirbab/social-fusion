import React, { useState, useEffect } from "react";
import "./Home.css";
import DeleteIcon from "../../../images/delete.png";
import FbUser from "../../../images/fbuser.png";
import Post from "../../../images/post-dash.png";
import Notify from "../../../images/notifi.png";
import Settings from "../../../images/settings.png";
import Arrow from "../../../images/arrow.png";

const Home = () => {
  const [isActive, setIsActive] = useState(false);
  const [region, setRegion] = useState("");

  const handleClick = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setRegion(timezone);
    console.log(timezone);
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h5>Facebook</h5>
          <img src={DeleteIcon} className="img-fluid" alt="" />
        </div>
        <div className="card-dashboard">
          <div className="card-sidebar">
            <div className="mt-2">
              <img className="img-fluid" src={FbUser} alt="" />
            </div>
            <h5>Yiden Chan</h5>
            <p>React Dev</p>
            <p>Profile</p>
            <div className="d-flex justify-content-center pt-2 pb-2 align-items-center">
              <div>
                <span
                  style={{
                    fontSize: "14px",
                    paddingRight: "10px",
                    fontWeight: "400",
                  }}
                >
                  Running
                </span>
              </div>
              <div
                className={`toggle-button ${isActive ? "active" : ""}`}
                onClick={handleClick}
              >
                <div className="toggle-knob"></div>
              </div>
            </div>
            <div className="timezone">
              <span>Timezone: {region} </span>
            </div>
          </div>
          <div>
            <div className="d-flex">
              <div>
                <img src={Post} alt="" />
                <p>Next Post</p>
              </div>
              <div>
                <p>View all</p>
                <img src={Arrow} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
