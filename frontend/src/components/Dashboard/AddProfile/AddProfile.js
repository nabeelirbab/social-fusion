import React from "react";
import "./AddProfile.css";
import FbImg from "../../../images/fb.png"
import AddIcon from "../../../images/add.png"
import FacebookLoginButton from "../../Facebook/facebook-login";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const AddProfile = () => {
const navigate=useNavigate();
   const handleLoginSuccess = (response) => {
     console.log('Facebook Login Success:', response);
      axios.post('/api/auth/connect-facebook', { facebookId: response.userID, accessToken: response.accessToken })
        .then((res) => {
      console.log(res.json());
      // Redirect or update the UI to show that the user has connected their Facebook account
    })
    .catch((error) => {
      console.log('Error connecting Facebook account:', error);
    });
    // You can call your API to connect the Facebook account here
  };

  const handleLoginFailure = () => {
    console.log('Facebook Login Failure');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    if (window.history && window.history.pushState) {
      window.history.pushState('', null, './');
      window.onpopstate = function() {
        window.history.pushState('', null, './');
      };
    }
  };

  return (
    <>
      <div className="addprofile-main">
        <div>
          <h2>Add your Profile </h2>
          <p>Connect social profiles you’d like to manage.</p>
        </div>
        <button onClickCapture={logout}>Logout</button>

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
