import React, { useEffect, useState } from "react";
import OAuthPopup from "./customOAuth";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Linkedin = ({ connectLinkedinStatus }) => {
  const [article, setArticle] = useState("");
  const token = localStorage.getItem("token");
  const clientId = "77e5zc91lfplxv";
  const redirectUri = "http://localhost:3000/linkedin-callback.html";
  const getProfile = async (token) => {
    const response = await axios.get(
      "http://localhost:3300/api/linkedin/get-profile",
      {
        headers: {
          token,
        },
      }
    );
    console.log(response.data);
  };
  useEffect(() => {
    getProfile(token);
  }, []);

  const handleLinkedInLogin = async (accessToken) => {
    const token = localStorage.getItem("linkedin_token");
    if (token) {
      accessToken = token;
    }
    if (!accessToken) {
      if (token) {
        accessToken = token;
      }
    }
    //         const res = await axios.get('http://localhost:3300/api/linkedin/posts',
    //     {
    //         headers: {
    //             accessToken,
    //         }
    // }
    // );
    //       console.log(res.data);
    // Save user data to the database and store the accessToken
    // const response = await axios.get('http://localhost:3300/api/linkedin/profile',
    //     {
    //         headers: {
    //             accessToken,
    //         }
    // }
    // );
    //       console.log(response.data);
    // Post an article
    try {
      const response = await axios.post(
        "http://localhost:3300/api/linkedin/post-article",

        { accessToken, article }
      );
      console.log(response);
      if (response.data.success === true) {
        console.log("Post Created Successfully");
        toast.success("Post Created Successfully");
      } else {
        toast.error("Error posting article");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const handleClose = () => {
    console.log("Popup closed");
  };
  const handleAuthorization = async (data, popup) => {
    try {
      const { code } = data;
      if (code) {
        // Exchange the code for an access token using your backend
        // Replace the URL with your backend URL
        const response = await axios.post(
          "http://localhost:3300/api/linkedin/exchange-token",
          {
            code,
            redirectUri,
            token,
          }
        );
        console.log(response);
        if (response.status === 201) {
          const { data } = await response;
          localStorage.setItem("linkedin_token", data);
          if (data) {
            toast.success("profile successfully added!");
          }
        } else {
          console.error("Error exchanging authorization code for access token");
        }
      }
    } catch (error) {
      if (error.message === "Request failed with status code 409") {
        toast.error("Profile Already Added");
      } else {
        toast.error("Could not add profile");
      }
    }
  };
  return (
    <div>
      <OAuthPopup
        url={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
          redirectUri
        )}&scope=r_liteprofile%20r_emailaddress%20w_member_social`}
        onCode={handleAuthorization}
        onClose={handleClose}
        callbackName="handleLinkedInAuthorization"
        width={600}
        height={800}
        connectLinkedinStatus={connectLinkedinStatus}
      >
        <button>Connect With Linkedin</button>
      </OAuthPopup>
      <br></br>
      {connectLinkedinStatus && (
        <>
          {" "}
          <textarea
            value={article}
            onChange={(e) => setArticle(e.target.value)}
          />
          <br />
          <button onClick={handleLinkedInLogin}>Post Article</button>
        </>
      )}
    </div>
  );
};

export default Linkedin;
