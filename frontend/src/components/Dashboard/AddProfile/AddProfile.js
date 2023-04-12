import React from "react";
import "./AddProfile.css";
import FbImg from "../../../images/fb.png"
import AddIcon from "../../../images/add.png"

const AddProfile = () => {
  return (
    <>
      <div className="addprofile-main">
        <div>
          <h2>Add your Profile </h2>
          <p>Connect social profiles you’d like to manage.</p>
        </div>

        <div className="ap-card">
            <div className="card-inner">
                <img src={FbImg} alt=""/>
                <img src={AddIcon} alt=""/>
            </div>
            <p>Facebook <br/>Profile</p>
        </div>
      </div>
    </>
  );
};

export default AddProfile;
