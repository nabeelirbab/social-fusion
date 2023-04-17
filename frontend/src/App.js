import "./App.css";
// import { Router, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import SignUp from "./components/Auth/SignUp/SignUp";
import AddProfile from "./components/Dashboard/AddProfile/AddProfile";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Auth/Login/Login';
import { ToastContainer } from 'react-toastify';
import Linkedin from "./components/Linkedin/linkedin";
import Sidebar from './components/Dashboard/Sidebar/sidebar';


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
      path: "/dashboards",
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
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;