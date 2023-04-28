import React from "react";
import "./Home.css";
import Card from "../../Card/Card";
import Insights from "../../Insights/Insights";
import AddProfile from "../AddProfile/AddProfile";



const Home = () => {
  return (
    <>
      <Card />
      <Insights/>
      {/* <AddProfile/> */}
    </>
  );
};

export default Home;
