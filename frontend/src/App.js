import "./App.css";
// import { Router, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUp from "./components/Auth/SignUp/SignUp";
import AddProfile from "./components/Dashboard/AddProfile/AddProfile";
import { ToastContainer } from 'react-toastify';
import Linkedin from "./components/Linkedin/linkedin";
import Conversations from "./components/Linkedin/Conversations";
import LinkedinConnect from "./components/Linkedin/connect";
import ConnectTwitter from "./components/Twitter/twitter";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/signup",
      element: <SignUp />,
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
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
