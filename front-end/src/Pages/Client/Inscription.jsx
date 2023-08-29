import React, { useState } from "react";
import { axiosAthlete } from "../../util/axios-config";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { GoAlert } from "react-icons/go";
import { useSelector } from 'react-redux';

const Inscription = () => {
  const [searchParams] = useSearchParams() ;
  const { id } = useParams();
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [goal, setGoal] = useState("");
  const [result , setResult] = useState("") ;

  // const id = useSelector((state) => state.id) ;
  // let { state } = useLocation();

useEffect(()=> {
    console.log(id);
    axiosAthlete.post(`/payement/${searchParams.get("payment_id")}`)
    .then((res) => {
      setResult(res.data.result.status);
      console.log(res.data.result.status) ;
    })
    .catch ((err)=>console.log(err)) ;
  },[])

  const navigate = useNavigate() ; 


  const inscription = async (e) => {
        e.preventDefault() ;
       
        try {
          console.log(id);
          const response = await axiosAthlete.patch(`/inscription/${id}`, {weight : weight, height : height, goal : goal });
          toast.success(response.data.message) ; 
          console.log(response.data.message) ; 
          navigate('/client') ; 
          console.log(response.data) ;
        } catch (err) {
          console.log(err);
        }
   

  }

  return (
    <div className="w-full  flex justify-center items-center">
  
    { result ==="SUCCESS" ? (
     <div className="w-[75%] pb-16 pt-12 space-y-11 mt-24 flex flex-col rounded-2xl bg-macros shadow-2xl shadow-gray">
        <h1 className=" uppercase font-[Montserrat] font-bold text-white text-4xl">subscription form</h1>
        <form onSubmit={inscription} className="w-full flex flex-col justify-center items-center space-y-5 ">
          <div className=" flex flex-col w-full justify-center items-center space-y-5">
            <input
              className="pl-3 placeholder:text-sm w-[70%] h-16"
              type="number"
              placeholder="Put Your Weight"
              min={0}
              name=""
              id=""
              onChange={(e) => setWeight(e.target.value)}
            />
            <input
              className="pl-3 placeholder:text-sm w-[70%] h-16"
              type="number"
              placeholder="Put Your Height"
              min={0}
              name=""
              id=""
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-center items-center">
            <select
              name="goal"
              id="first-name"
              onChange={(e) => setGoal(e.target.value)}
              className="w-[70%] h-16 rounded-[48px] border-0  pl-3 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
            <option value="none" selected disabled hidden>
              Your Goal
                </option>
              <option value="lean muscle gain">lean muscle gain</option>
              <option value="weight loss">weight loss</option>
              <option value="maintain weight">maintain weight</option>
            </select>
          </div>
          <button type="submit" className=" bg-principal rounded-3xl py-3 px-5 font-bold font-[Montserrat] uppercase">subscribe now</button>
        </form>
      </div>) :( null ) }
    </div>
  );
};

export default Inscription;
