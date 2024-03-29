import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = ({ onLoginSuccess, onLoginFailure }) => {
  const responseFacebook = (response) => {
    if (response.accessToken) {
      onLoginSuccess(response);
    } else {
      onLoginFailure();
    }
  };

  return (
    <FacebookLogin
      appId="156744197330354" 
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      icon="fa-facebook"
      textButton="Connect to Facebook"
    />
  );
};

export default FacebookLoginButton;