import React from "react";
import "./Hero.css";
import FbLogo from "../../images/Landing/facebook-logo.png";
import InstaLogo from "../../images/Landing/instagram-logo.png";
import TwitterLogo from "../../images/Landing/twitter-logo.png";
import LinkedInLogo from "../../images/Landing/linkedin-logo.png";
import GoogleLogo from "../../images/Landing/google-logo.png";
import YoutubeLogo from "../../images/Landing/youtube-logo.png";
import Analyze from "../../images/Landing/analyze.png";
import Visual from "../../images/Landing/visual.png";
import Schedule from "../../images/Landing/schedule.png";
import Link from "../../images/Landing/link.png";

const Array = [
  {
    CardImg: Visual,
    CardTitle: "Visual First",
    CardText: "Create, edit, & preview content",
    imageUrl: FbLogo,
  },
  {
    CardImg: Schedule,
    CardTitle: "Schedule Ahead",
    CardText: "Save time with automatic publishing",
    imageUrl: InstaLogo,
  },
  {
    CardImg: Link,
    CardTitle: "Boost Your Bio",
    CardText: "Send followers to your website, shop, & more",
    imageUrl: LinkedInLogo,
  },
  {
    CardImg: Analyze,
    CardTitle: "Analyze & Optimize",
    CardText: "Get data that helps you create better content",
    imageUrl: TwitterLogo,
  },
  {
    imageUrl: YoutubeLogo,
  },
  {
    imageUrl: GoogleLogo,
  },
];

const Hero = () => {
  return (
    <>
      <div className="hero-main">
        <div className="hero-inner">
          <h1>
            Manage All Your Social
            <br /> Media Accounts
          </h1>
          <p>
            Our team has a successful track record of helping brands scale
            profitably <br />
            based on high-performing strategies.
          </p>
          <div className="sign-btn">
            <button>Sign Up, It's free</button>
          </div>
          <span>Supported networks</span>
          <div className="img-logo">
            {Array.map((logo, index) => {
              return <img src={logo.imageUrl} alt="" key={index} />;
            })}
          </div>
        </div>
        <div className="card-sec">
          <p>Later social media management</p>
          {Array.map((card, index) => {
            return (
              <card key={index}>
                <img src={card.CardImg} alt="" />
                <h5>{card.CardTitle}</h5>
                <span>{card.CardText}</span>
              </card>
            );
          })}
        </div>
        <div className="text-sec">
          <h2>Lorem Ipsum is simply dummy text of the </h2>
          <p>
            Stay Lorem Ipsum has been the industry's standard dummy text ever{" "}
            <br />
            since the 1500s, When an standard dummy text text ever since the
            1500s, <br /> When an standard dummy text{" "}
          </p>
        </div>

        <div>
          <div className="Lorem-sec">
            <h4>View all social media account feed at one places</h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, When an{" "}
            </p>
            <button>Learn More</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
