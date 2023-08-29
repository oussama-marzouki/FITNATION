import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx';
import { axiosCoach } from '../util/axios-config';

const AddMeal = (props) => {

    const client = JSON.parse(localStorage.getItem("client"));
    const [name, setName] = useState("");

    function handleClick() {
      props.onUpdate(props.id);
    }

    const addMeal = async (e) => {
      e.preventDefault() ; 
  
      try {
        const response = await axiosCoach.post(`/addmeal/${client.id}`, {name: name});
        console.log(response.data) ;
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };

  return (

<>

<div className=" flex text-white shadow-2xl bg-[#28282B] items-center py-3 rounded-2xl h-fit px-8 mt-3 w-[95.5%] ">

<form action="" className=" flex items-center justify-center space-x-7 w-full" 
onSubmit={(e) => addMeal(e)}
>
<input type="text" name="" id="" placeholder="Name" className=" rounded-2xl pl-3 placeholder:text-xs w-[77%] h-11" onChange={(e) => setName(e.target.value)}/>
<button type="submit" className=" w-1/5 h-11 bg-principal rounded-2xl" >ADD</button>
</form>

<button 
onClick={handleClick}
><RxCross2 size={'25px'}/></button>
</div>

</>

  )
}

export default AddMeal
