import React from "react";
import "./Footer.css";
import ArrowBtn from "../../images/Landing/arrow.png";

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
          <button className="footer-btn">Start Today
            <img src={ArrowBtn} alt=""/>
          </button>
        </div>
      </div>
      <div className="sep">
      </div>
      {/* <div className="footer-low">
        <span>English</span>
        
        <span>English</span>
      </div> */}
    </div>
  );
};

export default Footer;
