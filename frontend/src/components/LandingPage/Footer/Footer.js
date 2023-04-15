import React from "react";
import "./Footer.css";
import ArrowBtn from "../../../images/Landing/arrow.png";
import FbImg from "../../../images/Landing/fb-footer.png";
import TwitterImg from "../../../images/Landing/twitter-footer.png";
import LinkedImg from "../../../images/Landing/linked-footer.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-inner">
        <div className="col-3">
          <h3>Social Fusion</h3>
        </div>
        <div className="col-3">
          <h5>Product</h5>
          <ul>
            <li>Home</li>
            <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li>
          </ul>
        </div>
        <div className="col-3">
          <h5>Resources</h5>
          <ul>
            <li>Blog</li>
            <li>Help Center</li>
          </ul>
        </div>
        <div className="col-3">
          <h5>Try It Today</h5>
          <p>Get Started for Free</p>
          {/* <div className="button">
            <a href="">Start Today</a>
            <img src={ArrowBtn} alt="" />
          </div> */}
          <button className="footer-btn">
            Start Today
            <img src={ArrowBtn} alt="" />
          </button>
        </div>
      </div>
      <div className="sep"></div>
      <div className="footer-low">
        <div>
          <span>English</span>
          <span>Terms & Privacy</span>
          <span>Security</span>
          <span>Status</span>
          <span>©2023 SocialFusion</span>
        </div>

        <div className="footer-img">
          <img src={FbImg} alt="" />
          <img src={TwitterImg} alt="" />
          <img src={LinkedImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
