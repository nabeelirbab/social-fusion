import React, { useState } from "react";
import "./AddProfile.css";
import FbImg from "../../../images/fb.png";
import instaImg from "../../../images/insta.png";
import twitterImg from "../../../images/twitter.png";
import linkedInImg from "../../../images/linkedIn.png";
import AddIcon from "../../../images/add.png";
import Modal from "../Modal/Modal";

const profiles = [
  {
    imageUrl: FbImg,
    name: "Facebook Profile",
  },
  {
    imageUrl: instaImg,
    name: "Instagram Profile",
  },
  {
    imageUrl: twitterImg,
    name: "Twitter Profile",
  },
  {
    imageUrl: linkedInImg,
    name: "LinkedIn Profile",
  },
];

const AddProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="addprofile-main">
        <div className="addprofile-inner">
          <h2>Add your Profile </h2>
          <p>Connect social profiles you’d like to manage.</p>
        </div>

        {profiles.map((profile, index) => {
          return (
            <div className="ap-card" key={index}>
              <div className="card-inner">
                <img src={profile.imageUrl} alt="social-img" />
                <img
                  style={{cursor:'pointer'}}
                  onClick={handleAddProfileClick}
                  src={AddIcon}
                  alt=""
                />
              </div>
              <p>{profile.name}</p>
            </div>
          );
        })}
      </div>

      {isModalOpen && <Modal onClose={handleModalClose} />}
    </>
  );
};

export default AddProfile;
