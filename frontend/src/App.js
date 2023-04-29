import "./App.css";
// import { Router, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUp from "./components/Auth/SignUp/SignUp";
import AddProfile from "./components/Dashboard/AddProfile/AddProfile";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Auth/Login/Login";
import { ToastContainer } from "react-toastify";
import Linkedin from "./components/Linkedin/linkedin";
import Sidebar from "./components/Dashboard/Sidebar/sidebar";

import Conversations from "./components/Linkedin/Conversations";
import LinkedinConnect from "./components/Linkedin/connect";
import ConnectTwitter from "./components/Twitter/twitter";
import Inbox from "./components/Dashboard/Chat/LinkedinInbox/LinkedinInbox";
import VerifyLinkedin from "./components/Dashboard/VerifyLinkedin/VerifyLinkedin";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/dashboard",
      element: <Sidebar />,
    },
    {
      path: "/addprofile",
      element: <AddProfile />,
    },
    {
      path: "/linkedin",
      element: <Linkedin />,
    },
    {
      path: "/chats",
      element: <Conversations />,
    },

    {
      path: "/connect-linkedin",
      element: <LinkedinConnect />,
    },
    {
      path: "/connect-twitter",
      element: <ConnectTwitter />,
    },
    {
      path: "/linkedin-inbox",
      element: <Inbox />,
    },
    {
      path: "/linkedin-verify",
      element: <VerifyLinkedin />,
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
