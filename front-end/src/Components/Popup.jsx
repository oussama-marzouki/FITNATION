import { React, useEffect, useState } from "react";
import Workout from '../assets/wokrout1.png';
import Diet from '../assets/diet1.png'
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setClientData } from "../Redux/features/clientSlice";

 
export default function Popup(props) {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    
    const data = {
    id: props.id,
    firstName: props.firstName,
    lastName: props.lastName,
    weight: props.weight,
    height: props.height,
    goal: props.goal,
    age: props.age, 
    gender: props.gender,
    workoutPlan : props.workoutPlan,
    dietPlan : props.dietPlan,
    workoutcompleted : props.workoutcompleted,
    dietcompleted : props.dietcompleted
    }
   
    console.log(data);
    dispatch(setClientData(data));  
 
  return (

    <>
    
    <button
        className="text-white bg-principal font-bold uppercase text-sm px-6 py-3 rounded-2xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        CHECK
      </button>
      {showModal ? (
        <>
          <div
            className=" fixed flex items-center justify-center backdrop-blur-lg inset-0 z-50 "
            onClick={() => setShowModal(false)}
          >

            <div className="relative w-2/5 justify-center h-80 space-x-3 items-center">
              {/*content*/}
              <div className="overlay text-black" onClick={() => setShowModal(false)}></div>
              <div className="border-0 rounded-2xl relative h-[90%] mt-6 flex w-[90%] space-x-3 bg-none outline-none focus:outline-none">
             
                {/*body*/}
                <div className="relative p-6 bg-[#28282B] flex flex-col justify-center items-center bg-opacity-70  bg-cover bg-center rounded-2xl flex-auto">
                <Link className="no-underline " to={`/WorkoutPlan/${props.id}`}  >
                <img src={Workout} alt="" />
                <h1 className=" text-principal text-2xl font-poppins font-extrabold">WORKOUT PLAN</h1>
               
                </Link>
                </div>
                {/*footer*/}
                
                <div className="relative p-6  bg-[#28282B] flex flex-col justify-center items-center bg-opacity-70 bg-cover bg-center rounded-2xl flex-auto">
                <Link className="no-underline " to={`/DietPlan/${props.id}`}  >
                <img src={Diet} alt="" />   
                <h1 className=" text-principal text-2xl font-poppins font-extrabold" >DIET PLAN</h1>
                </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black">
          </div>
        </>
      ) : null}
    
    </>
    
 
    
  );
}