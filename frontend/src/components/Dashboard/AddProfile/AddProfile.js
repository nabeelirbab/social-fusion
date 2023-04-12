import React from "react";
import "./AddProfile.css";
import FbImg from "../../../images/fb.png"
import AddIcon from "../../../images/add.png"
import FacebookLoginButton from "../../Facebook/facebook-login";

const AddProfile = () => {

   const handleLoginSuccess = (response) => {
    console.log('Facebook Login Success:', response);
    // You can call your API to connect the Facebook account here
  };

  const handleLoginFailure = () => {
    console.log('Facebook Login Failure');
  };

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
            <FacebookLoginButton onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure}/>
        </div>
      </div>
    </>
  );
};

export default AddProfile;
