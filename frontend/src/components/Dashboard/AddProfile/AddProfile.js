import React, { useEffect,useState } from "react";
import "./AddProfile.css";
import FbImg from "../../../images/fb.png"
import AddIcon from "../../../images/add.png"
import FacebookLoginButton from "../../Facebook/facebook-login";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Linkedin from "../../Linkedin/linkedin";
const AddProfile = () => {
  const baseUrl='http://localhost:3300/api'
  const navigate = useNavigate();
  const [connectFBStatus, setConnectFBStatus] = useState(false)
  const [connectLinkedinStatus, setConnectLinkedinStatus] = useState(false)
   const accessToken = localStorage.getItem('token');
  const handleLoginSuccess = (response) => {
    console.log(response)
      axios.post(`${baseUrl}/facebook/connect-facebook`, { facebookId: response.userID, accessToken: response.accessToken,email:response.email,expiresIn:response.expiresIn },{
        headers: {
          token: accessToken
        }
})
        .then((res) => {
          toast.success('profile successfully added!')
    })
    .catch((error) => {
      if (error.message === 'Request failed with status code 409') {
        toast.error('Profile Already Added')
      }
      else {
        toast.error('Could not add profile')

      }
    });
  };

  const handleLoginFailure = () => {
    toast.error('Login failed')
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
  const getFBProfileStatus = () => {
     axios.get(`${baseUrl}/facebook/connect-profile-status`, {
      headers: {
        token: accessToken
      }
    }).then((res) => {
      console.log(res);
      setConnectFBStatus(res.data.success)
      return res.data.success
    })
    .catch((error) => {
      console.log('something went wrong', error);
    });
  }

    const getLinkedinProfileStatus = () => {
     axios.get(`${baseUrl}/linkedin/connect-profile-status`, {
      headers: {
        token: accessToken
      }
    }).then((res) => {
      console.log(res);
      setConnectLinkedinStatus(res.data.success)
      return res.data.success
    })
    .catch((error) => {
      console.log('something went wrong', error);
    });
  }
  useEffect(() => {
    getFBProfileStatus()
    getLinkedinProfileStatus()
  },[])
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
                {/* <img src={FbImg} alt=""/>
                <img src={AddIcon} alt=""/> */}
            {!connectFBStatus ? <FacebookLoginButton onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure}/>: 'Connected with facebook'}
          </div>
          
           <div className="card-inner">
                {/* <img src={FbImg} alt=""/>
                <img src={AddIcon} alt=""/> */}
             <Linkedin connectLinkedinStatus={connectLinkedinStatus} />
            
            </div>
        </div>
      </div>
    </>
  );
};

export default AddProfile;
