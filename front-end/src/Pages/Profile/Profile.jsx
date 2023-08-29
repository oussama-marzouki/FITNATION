import React, { useEffect } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate , Link, Navigate } from "react-router-dom";
import Logo from "../../assets/Logof.png";
import ProfileCard from "../../Components/ProfileCard/ProfileCard";
import UpdateUser from "../../Components/UpdateUser/UpdateUser";

const Profile = () => {
  

  return (
    <div>
      {/* <NavBar /> */}
      <div className=" mx-28 my-8 font-poppins">
        <div className=" flex space-x-5 w-full">
          <div className="w-1/3 space-y-5">
            <ProfileCard />
            <div className="flex bg-black rounded-2xl w-full h-[233px] bg-test bg-contain items-center justify-center shadow-2xl shadow-gray">
            {/* <img src={Logo} alt="" className="w-full h-full p-20 " /> */}
            </div>
          </div>
          <UpdateUser />

        </div>
      </div>
    </div>
  );
};

export default Profile;
