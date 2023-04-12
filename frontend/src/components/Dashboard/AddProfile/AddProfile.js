import React from "react";
import "./AddProfile.css";
import FbImg from "../../../images/fb.png"
import AddIcon from "../../../images/add.png"
import FacebookLoginButton from "../../Facebook/facebook-login";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddProfile = () => {
  const baseUrl='http://localhost:3300/api'
  const navigate = useNavigate();
   const accessToken = localStorage.getItem('token');
   const handleLoginSuccess = (response) => {
     console.log('Facebook Login Success:', response);
      axios.post(`${baseUrl}/connect-facebook`, { facebookId: response.userID, accessToken: response.accessToken,email:response.email },{
        headers: {
          token: accessToken
        }
})
        .then((res) => {
          console.log(res);
          toast.success('profile successfully added!')
    })
    .catch((error) => {
      console.log('Error connecting Facebook account:', error);
      if (error.message === 'Request failed with status code 409') {
        toast.error('Profile Already Added')
      }
      else {
        toast.error('Could not add profile')

      }
    });
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
