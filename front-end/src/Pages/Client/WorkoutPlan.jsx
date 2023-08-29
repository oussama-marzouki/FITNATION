import React, { useEffect, useState } from "react";
import CoachCard from "../../Components/CoachCard";
import { Link } from "react-router-dom";
import { AiTwotoneCalendar } from "react-icons/ai";
import { FiArrowRight } from "react-icons/fi";
import Workout from "../../Components/Workout";
import { axiosAthlete } from "../../util/axios-config";
import { BiArrowBack } from "react-icons/bi";
import { GoAlert } from "react-icons/go";


const WorkoutPlan = () => {

  const client = JSON.parse(localStorage.getItem("client"));
  const [athworkouts, setAthWorkout] = useState([]);

  useEffect(() => {
    getWorkouts();
    console.log(athworkouts);
  },[]);

    ////////////////////////// GET WORKOUTS ////////////////////////
    const getWorkouts = async () => { 
      try {
        const response = await axiosAthlete.get(`/getworkouts`);
        setAthWorkout(response.data); 
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className=" flex flex-col justify-center items-center">
     <div className=" flex items-center justify-center space-x-60 pr-72 "> <Link to='/client'><BiArrowBack size={'28px'} /></Link> <h1 className=" text-5xl uppercase my-5">Workout Plan</h1></div> 
      <div className="grid grid-cols-3 gap-x-0 w-[62%] mt-6 gap-y-5 ">
      {athworkouts.map((athworkout) => (
          <Workout name={athworkout.name} day={athworkout.day} id={athworkout._id} /> 
      ))} 
      </div>
      {athworkouts.length === 0 &&
      <div className=" h-fit py-6 flex flex-col rounded-3xl mt-6 bg-principal w-[50%] justify-center items-center ">
        <GoAlert size={'50px'} className=" text-white" />
      <h1 className=" text-white p-4  text-2xl w-full font-poppins font-bold uppercase"> currently you don't have a workout wait your coach or chose a coach if you don't have one! </h1>
      <div className="h-fit space-x-2">
<Link to='/coaches' className=" no-underline rounded-2xl p-3 text-white font-bold bg-white bg-opacity-30 uppercase">
  Other Coaches
</Link>
</div>
      </div>
      }

    </div>
  );
};

export default WorkoutPlan;
