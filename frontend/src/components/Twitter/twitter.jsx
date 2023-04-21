// SignInWithTwitter.js
import React from 'react';
import axios from 'axios';
const ConnectTwitter = () => {
  const signIn = async () => {
    const token = localStorage.getItem('token')
    console.log('>>',token);
    window.location.href = `http://localhost:3300/api/twitter/auth?myAccessToken=${token}`;
    // const data = await response.json();
    //   console.log(response);
    // window.location.href = data.url;
  };

  return (
    <button onClick={signIn}>
      Sign in with Twitter
    </button>
  );
};

export default ConnectTwitter;
