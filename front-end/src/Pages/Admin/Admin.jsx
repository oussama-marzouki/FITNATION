import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar";
import coach from "../../assets/coach1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { axiosAthlete } from "../../util/axios-config";
import { RiAdminLine } from "react-icons/ri";
import { logout, reset } from "../../Redux/features/authSlice";
import { useDispatch } from "react-redux";

const Admin = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  ////// LOGOUT ///////////////
const logoutHandler = () => {
  dispatch(logout());
  dispatch(reset());
  navigate("/");
};

  return (
    <div className={`flex`}>
      <div className={`w-[100%] left-0 flex flex-col justify-center mt-14 mb-14 items-center`}>

        <div className=" py-8 pl-2 flex items-center space-x-5 justify-start bg-adminb bg-cover shadow-2xl rounded-3xl w-[82%] mb-11 space-y-4">
        <div className=" "> <RiAdminLine size={'100px'} /> </div>
        <div className="flex flex-col">
          <h1 className=" text-start text-principal uppercase font-bold text-5xl">
            {user.firstName} {user.lastName}
          </h1>
          <h2 className="text-start uppercase font-bold text-3xl">
            Administrative Space
          </h2>
          <div className="flex">
            <button onClick={logoutHandler} className=" rounded-2xl font-poppins items-center space-x-1 flex p-2 font-bold font text-principal">
              <BiLogOut /> <h2>Logout</h2>
            </button>
            <button className=" rounded-2xl font-poppins px-3 text-white font-bold bg-principal">
              <Link to="/profile" className="no-underline">
                Profile
              </Link>
            </button>
          </div>
          </div>
 
        </div>

        {/* <div className="relative w-[95%] rounded-3xl p-6 ml-11 mt-8 flex flex-col shadow-2xl bg-cover bg-bgc ">
          <div className="flex-col flex justify-center py-6 space-y-6 h-full items-center">
            <h1 className=" text-white text-3xl uppercase">
              for the moment you do not have a coach
            </h1>
          </div>
        </div> */}

        <div className=" w-[82%] flex flex-col bg-principal bg-opacity-50 shadow-xl space-y-4 justify-center items-center rounded-3xl ">
          {/* <h1 className=" uppercase text-[40px] text-[#28282B]">
            Your <span className=" text-principal">Plans</span>
          </h1> */}
          <div className="bg-opacity-50 space-x-4 px-6 justify-center items-center flex w-full h-fit pt-7">
            <div className="w-2/4 h-52 rounded-3xl flex justify-center items-center bg-bgadmin bg-cover ">
              <div className=" w-full h-full  rounded-3xl flex justify-center items-center hover:bg-opacity-30 hover:bg-white">
                <Link to="/acoaches" className=" no-underline">
                  <h1 className=" text-white text-4xl hover:text-principal p-28 w-full h-full font-[Montserrat] font-bold uppercase">
                    COACHES
                  </h1>
                </Link>
              </div>
            </div>

            <div className="w-2/4 h-52 rounded-3xl flex justify-center items-center bg-bgadmin bg-cover ">
              <div className=" w-full h-full  rounded-3xl flex justify-center items-center hover:bg-opacity-30 hover:bg-white">
                <Link to="/aclients" className=" no-underline">
                  <h1 className=" text-white text-4xl hover:text-principal p-28 w-full h-full font-[Montserrat] font-bold uppercase">
                    CLIENTS
                  </h1>
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-opacity-50 space-x-4 px-6 justify-center items-center flex w-full h-fit pb-7">
            <div className="w-2/4 h-52 rounded-3xl flex justify-center items-center bg-bgadmin bg-cover ">
              <div className=" w-full h-full  rounded-3xl flex justify-center items-center hover:bg-opacity-30 hover:bg-white">
                <Link to="/addadmin" className=" no-underline">
                  <h1 className=" text-white text-4xl hover:text-principal p-28 w-full h-full font-[Montserrat] font-bold uppercase">
                    ADD ADMIN
                  </h1>
                </Link>
              </div>
            </div>

            <div className="w-2/4 h-52 rounded-3xl flex justify-center items-center bg-bgadmin bg-cover ">
              <div className=" w-full h-full  rounded-3xl flex justify-center items-center hover:bg-opacity-30 hover:bg-white">
                <Link to="/contacts" className=" no-underline">
                  <h1 className=" text-white text-4xl hover:text-principal p-28 w-full h-full font-[Montserrat] font-bold uppercase">
                    CONTACTS
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
