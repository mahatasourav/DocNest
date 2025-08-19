import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctor from "../components/TopDoctor";
import Banner from "../components/Banner";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="color">
      <Header></Header>
      <SpecialityMenu></SpecialityMenu>
      <TopDoctor></TopDoctor>
      <Banner></Banner>
    </div>
  );
};

export default Home;
