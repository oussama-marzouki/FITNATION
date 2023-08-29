import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { axiosCoach } from "../util/axios-config";

const AddWorkout = (props) => {

  const client = JSON.parse(localStorage.getItem("client"));

  const [name, setName] = useState("");
  const [day, setDay] = useState("");



  function handleClick() {
    props.onUpdate(props.id);
  }

  const addWotkout = async (e) => {
    e.preventDefault() ; 

    try {
      const response = await axiosCoach.post(`/addworkout/${client.id}`, {name: name , day: day});
      console.log(response.data) ;
      window.location.reload(); 
    } catch (err) {
      console.log(err);
    }
  };

  return (

<>

<div className=" flex text-white shadow-2xl bg-[#28282B] items-center py-3 rounded-2xl h-fit px-8 mt-3 w-[95.5%] ">

<form action="" className=" flex items-center justify-center space-x-7 w-full" onSubmit={(e) => addWotkout(e)}>

<input type="text" name="" id="" placeholder="Name" className=" rounded-2xl pl-3 placeholder:text-xs w-1/3 h-11" onChange={(e) => setName(e.target.value)}/>
<select name="" id="" className=" rounded-2xl pl-3 text-xs w-1/3 h-11" onChange={(e) => setDay(e.target.value)} >
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

<button type="submit" className=" w-1/5 h-11 bg-principal rounded-2xl" >ADD</button>
</form>

<button onClick={handleClick}><RxCross2 size={'25px'}/></button>
</div>

</>

  );
};

export default AddWorkout;
