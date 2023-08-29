import React from "react";
import WhiteLogo from "../assets/whitelogo.png";
import Insta from "../assets/instagram.png";
import Face from "../assets/facebook.png";
import Whats from "../assets/whatsapp.png";
const Footer = () => {
  return (
    <div className="flex flex-col text-white font-poppins items-center justify-center bg-cover bg-footerbg w-full mt-52 h-fit py-28">
      <div className=" w-[80%]"> <img className=" w-80" src={WhiteLogo} alt="" /> </div>
      <div className=" flex mt-4 w-[80%]">
        <div className=" space-y-5 w-1/2 border-r-2 font-bold pt-3 ml-3 border-white">
        <h2>Email : marzoukioussama1@gmail.com</h2>
        <h2>Phone Number : 55894463</h2>
        <h2>Adress : Technopole de Borj Cédria, Route de Soliman </h2></div>
        <div className="w-1/2 space-y-6  pl-6 border-l-2 border-white">
            <div className="flex justify-center space-x-20">
                <img src={Insta} className=" h-14 w-14" alt="" />
                <img src={Face}  className=" h-14 w-14" alt="" />
                <img src={Whats} className=" h-14 w-14" alt="" />
            </div>
            <div>
                <h3>Track daily activities, set meal plans, manage workout programs, 
                and stay connected with your clients using fitnation -a coaching 
                system that will boost your business through the rooftop</h3>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Footer;
