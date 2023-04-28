import React from "react";
import "./Insights.css"
import Posts from "../../images/posts.png";
import Comments from "../../images/comment.png";
import Likes from "../../images/like.png";
import FbImg from "../../images/FbImg.png";
import InstaImg from "../../images/InstaImg.png";
import TwitterImg from "../../images/twitterImg.png";
import LinkedInImg from "../../images/LinkedInImg.png";

const insightsData = [
  {
    title: "Total Posts",
    count: 352,
    icon: Posts,
  },
  {
    title: "Comments",
    count: 1400,
    icon: Comments,
  },
  {
    title: "Total Likes",
    count: 3123,
    icon: Likes,
  },
  {
    title: "Friends on Facebook",
    count: 4678,
    icon: FbImg,
  },
  {
    title: "Followers on Instagram",
    count: 4678,
    icon: InstaImg,
  },
  {
    title: "Followers on Twitter",
    count: 4678,
    icon: TwitterImg,
  },
  {
    title: "Connections on LinkedIn",
    count: 4678,
    icon: LinkedInImg,
  },
];

const Insights = () => {
  return (
    <>
      <div className="insights">
        <h2>Insights</h2>
        <div className="row margin-insight">
          {insightsData.map((data, index) => (
            <div className={index < 3 ? "col-4 p-1" : "col-3 p-1"} key={index}>
              <div className="cal-card">
                <div className="cal-card-inner">
                  <div>
                    <h1>{data.count}</h1>
                    <span>{data.title}</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <img src={data.icon} alt="" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Insights;
