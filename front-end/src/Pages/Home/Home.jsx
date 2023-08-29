import React from "react";
import "./Home.css";
import NavBar from "../../Components/NavBar/NavBar.jsx";
import Hero from "../../Components/Hero/Hero.jsx";
import ContentSection from "../../Components/contentSection/contentSection.jsx";
import Footer from "../../Components/Footer";
import Contact from "../../Components/Contact";
import Services from "../../Components/Services";


const Home = () => {

  return (
    <div>
      <div className=" flex flex-col items-center">
        {/* <NavBar /> */}
        <Hero />
        <div>
          <div className="">
            <h1 className="text-center text-3xl">
              Everything you need to grow your <br />
              <span className=" text-principal "> coaching business </span> or
              your <span className=" text-principal "> healthy life </span>
            </h1>
          </div>
        </div>
        <ContentSection />
        <Services />
        <Contact />
        
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
