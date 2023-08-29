import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { axiosCoach } from "../util/axios-config";

const UpdateWorkout = (props) => {

  const client = JSON.parse(localStorage.getItem("client"));

  const [name, setName] = useState("");
  const [day, setDay] = useState("");



  function handleClick() {
    props.onUpdate(props.workoutid);
  }

  const updateWorkout = async (e) => {
    e.preventDefault() ; 

    try {
      const response = await axiosCoach.patch(`/updateworkout/${props.workoutid}`, {name: name , day: day});
      console.log(response.data) ;
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (

<>

<div className=" flex text-black shadow-2xl bg-white items-center py-3 rounded-2xl h-fit px-4 mt-3 w-[95.5%] ">

<form action="" className=" flex items-center mr-3 justify-center space-x-7 w-full" 
onSubmit={(e) => updateWorkout(e)}
>

<input type="text" name="" id="" placeholder="Name" className=" rounded-2xl pl-3 border placeholder:text-xs w-1/2 h-11" onChange={(e) => setName(e.target.value)}/>
<select name="" id="" className=" rounded-2xl pl-3 border text-xs w-1/3 h-11" onChange={(e) => setDay(e.target.value)} >
<option value="none" selected disabled hidden>
                  Day
                </option>

                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
                
</select>

<button type="submit" className=" w-1/5 h-11 bg-principal rounded-2xl" >UPDATE</button>
</form>

<button 
onClick={handleClick}
>
    <RxCross2 size={'25px'}/></button>
</div>

</>

  );
};

export default UpdateWorkout;
