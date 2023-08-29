import React, { useEffect, useState } from "react";
import { FaUsers, FaMoneyBillWave } from "react-icons/fa";
import { CgArrowLongRight } from "react-icons/cg";
import { HiClipboardDocumentCheck } from "react-icons/hi2";
import { MdEditDocument } from "react-icons/md";
import { Link } from "react-router-dom";
import Clients from "../../Components/clients";
import SideBar from "../../Components/SideBar";
import { axiosCoach } from "../../util/axios-config";

const Coach = () => {

  const [number, setNumber] = useState(0);  
  const [completed, setCompleted] = useState(0);
  const [noCompleted, setNoCompleted] = useState(0);
  const [price, setPrice] = useState(0);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getClientsNumber();
    console.log(number);
    getCompletedStatus();
    getPrice() ;
  },[]);
  
    ////////////////////////// GET CLIENTS NUMBER ////////////////////////
    const getClientsNumber = async () => { 
      try {
        const response = await axiosCoach.get(`/getclientsnumber`);
        console.log(response.data.clientsNumber) ;
        setNumber(response.data.clientsNumber); 
      } catch (err) {
        console.log(err);
      }
    };

        ////////////////////////// GET COMPLTED ANDNOCOMPLETED PROGRAMS ////////////////////////
        const getCompletedStatus = async () => { 
          try {
            const response = await axiosCoach.get(`/getplansstatus`);
            console.log(response.data) ;
            setCompleted(response.data.completed);
            setNoCompleted(response.data.noCompleted);
          } catch (err) {
            console.log(err);
          }
        };


            ////////////////////////// GET CLIENTS NUMBER ////////////////////////
    const getPrice = async () => { 
      try {
        const response = await axiosCoach.get(`/getprice`);
        setPrice(response.data.price); 
        console.log(response.data.price) ;
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className={`flex`}>
      <SideBar />
      <div className={`w-[80%] left-0`}>
        <div className="px-11 pt-14 space-y-4">
          <h1 className=" text-left text-principal uppercase font-bold text-5xl">
            {user.firstName} {user.lastName}
          </h1>
          <h2 className="text-left font-bold text-2xl">
            Coach welcome to your space
          </h2>
        </div>

        <div className={`w-full `}>
          <div className="relative pt-14 w-full pb-14 bg-blueGray-500">
            <div className="px-4 md:px-6  mx-auto w-full">
              <div className="">
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-[#28282B] hover:bg-[#1A1A1C] rounded-lg mb-6 xl:mb-0 shadow-2xl">
                      <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className=" text-principal uppercase font-bold text-lg">
                              Clients Number{" "}
                            </h5>
                            <span className="font-bold text-white text-3xl">
                              {number}
                            </span>
                          </div>
                          <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-principal bg-red-500">
                              <FaUsers className=" w-full h-full" />
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-white  mt-4">
                          <Link to='/coach' className="text-emerald-500 items-center hover:text-principal font-bold w-full no-underline flex">
                            See more{" "}
                            <CgArrowLongRight
                              size="1rem"
                              className=" ml-2 mt-1"
                            />
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words rounded-lg mb-6 xl:mb-0 shadow-2xl">
                      <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className=" text-[#28282B] uppercase font-bold text-lg">
                              Completed Programs{" "}
                            </h5>
                            <span className="font-bold text-principal text-3xl">
                              {completed}
                            </span>
                          </div>
                          <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#28282B] bg-red-500">
                              <HiClipboardDocumentCheck
                                color="#FFC800"
                                className=" w-full h-full"
                              />
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-[#28282B]  mt-4">
                          <Link to='/coach' className="text-emerald-500 items-center hover:text-principal font-bold w-full no-underline flex">
                            See more{" "}
                            <CgArrowLongRight
                              size="1rem"
                              className=" ml-2 mt-1"
                            />
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-wihte rounded-lg mb-6 xl:mb-0 shadow-2xl">
                      <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className=" text-[#28282B] uppercase font-bold text-lg">
                              Incompleted Programs{" "}
                            </h5>
                            <span className="font-bold text-principal text-3xl">
                             {noCompleted}
                            </span>
                          </div>
                          <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#28282B] bg-red-500">
                              <MdEditDocument
                                color="#FFC800"
                                className=" w-full h-full"
                              />
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-[#28282B]  mt-4">
                          <Link to='/coach' className="text-emerald-500 items-center hover:text-principal font-bold w-full no-underline flex">
                            See more{" "}
                            <CgArrowLongRight
                              size="1rem"
                              className=" ml-2 mt-1"
                            />
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-wihte rounded-lg mb-6 xl:mb-0 shadow-2xl">
                      <div className="flex-auto p-4">
                        <div className="flex flex-wrap">
                          <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                            <h5 className=" text-[#28282B] uppercase font-bold text-lg">
                            6 weeks plans price{" "}
                            </h5>
                            <span className="font-bold text-principal text-3xl">
                              {price} DT
                            </span>
                          </div>
                          <div className="relative w-auto pl-4 flex-initial">
                            <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-[#28282B] bg-red-500">
                              <FaMoneyBillWave
                                color="#FFC800"
                                className=" w-full h-full"
                              />
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-[#28282B]  mt-4">
                          <Link to='/wallet' className="text-emerald-500 items-center hover:text-principal font-bold w-full no-underline flex">
                            See more{" "}
                            <CgArrowLongRight
                              size="1rem"
                              className=" ml-2 mt-1"
                            />
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Clients  />
      </div>
    </div>
  );
};

export default Coach;
