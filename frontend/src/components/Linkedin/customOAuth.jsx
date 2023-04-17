import React, { useEffect } from "react";

const OAuthPopup = ({
  url,
  onCode,
  onClose,
  callbackName,
  width = 500,
  height = 500,
  connectLinkedinStatus,
}) => {
  const handleClick = () => {
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    const popup = window.open(
      url,
      "oauth-popup",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    const checkPopupClosed = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(checkPopupClosed);
        onClose();
      }
    }, 100);
  };

  useEffect(() => {
    window[callbackName] = onCode;

    return () => {
      delete window[callbackName];
    };
  }, [callbackName, onCode]);

  return !connectLinkedinStatus ? (
    <button onClick={handleClick}>Connect Profile</button>
  ) : (
    "Connected with Linkedin"
  );
};

export default OAuthPopup;
