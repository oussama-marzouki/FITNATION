import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { axiosAdmin } from '../../util/axios-config';
import { Link } from 'react-router-dom';

const AddAdmin = () => {

const [firstName , setFirstName] = useState("") ; 
const [lastName , setLastName] = useState("") ; 
const [email , setEmail] = useState("") ; 
const [password1 , setPassword] = useState("") ; 
const [gender , setGender] = useState("") ; 
const [age , setAge] = useState(null) ; 

const addAdmin = async (e) => { 
    e.preventDefault() ; 
   try {
    console.log({firstName , lastName ,email ,  password1 , gender , age}) ;
    const response = await axiosAdmin.post(`/addadmin`, {
        firstName : firstName , 
        lastName : lastName , 
        email : email , 
        password1 : password1 , 
        gender : gender , 
        age : age
    });
    console.log(response) ; 
   //window.location.reload();
    toast.success('Admin Added sccessfuly !');
    } catch (err) {
   toast.error(err.response.data.message);
    //console.log(error) ;
}
}


  return (
    <div className="w-full  pb-14  flex justify-center items-center">
    <div className="w-[65%] pb-16 text-white pt-12 space-y-11 mt-14 flex flex-col border-2 border-black rounded-2xl bg-[#28282B] shadow-2xl shadow-gray">
    <h1 className=" uppercase font-[Montserrat] font-bold  text-4xl">ADD ADMIN</h1>
    <form
    onSubmit={addAdmin}
    className="w-full flex flex-col justify-center items-center space-y-5 ">
      <div className=" flex flex-col w-full justify-center items-center space-y-5">
        <input
          className="pl-3 border placeholder:text-sm w-[70%] h-16"
          type="text"
          placeholder="First Name"
          name=""
          id=""
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          className="pl-3 border placeholder:text-sm w-[70%] h-16"
          type="text"
          placeholder="Last Name"
          min={0}
          name=""
          id=""
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          className="pl-3 border placeholder:text-sm w-[70%] h-16"
          type="email"
          placeholder="Email"
          name=""
          id=""
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="pl-3 border placeholder:text-sm w-[70%] h-16"
          type="password"
          placeholder="Password"
          name=""
          id=""
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className=" flex w-[70%] mb-4 space-x-2 justify-center items-center">
      <input
          className="pl-3 px-4 border placeholder:text-sm w-full h-16"
          type="date"
          placeholder="Date of birth"
          name=""
          id=""
          onChange={(e) => setAge(e.target.value)}
        />
        <select
          name="goal"
          id="first-name"
          onChange={(e) => setGender(e.target.value)}
          className="w-full border h-16 rounded-[48px]  pl-3 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
        <option value="none" selected disabled hidden>
          Gender
            </option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </div>
     
       <div className= 'h-fit w-[68%] flex justify-start space-x-3 items-center  pt-5 '> 
      <Link to='/admin'  className="  text-principal hover:bg-opacity-0 no-underline  rounded-2xl py-3 font-bold font-[Montserrat] uppercase">Go Back</Link>
      <button type="submit" className=" bg-principal text-white hover:bg-opacity-0 hover:border-2 hover:text-principal hover:border-principal rounded-2xl py-3 px-8 font-bold font-[Montserrat] uppercase">ADD KNOW</button>
       </div> 
      
    </form>
  </div>
  </div>
  )
}

export default AddAdmin
