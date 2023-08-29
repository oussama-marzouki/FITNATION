import React from "react";
import { GoAlert } from "react-icons/go";
import { Link } from "react-router-dom";

const FaildPayement = () => {
  return (
    <div className="flex justify-center items-center w-full h-[500px]">
      <div className=" h-fit py-12 flex flex-col rounded-3xl mt-6 bg-redc w-[60%] justify-center items-center ">
        <GoAlert size={"50px"} className=" text-white" />
        <h1 className=" text-white p-4  text-2xl w-full font-poppins font-bold uppercase">
          your payment has been declined. please check your details and try again or contact support 
        </h1>
        <button><Link className=" text-white" to='/coaches'> Repeat the process </Link></button>
      </div>
    </div>
  );
};

export default FaildPayement;
