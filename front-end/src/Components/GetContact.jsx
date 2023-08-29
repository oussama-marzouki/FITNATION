import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { axiosAdmin } from '../util/axios-config';

const GetContact = (props) => {

  const deleteContact = async (id) => { 
     
    try {
    console.log(id) ;
    const response = await axiosAdmin.delete(`/deletecontact/${id}`);
    window.location.reload();
    toast.success('Coach deleted successfuly');
    } catch (err) {
    toast.error(err.response.data.message);
    console.log(err) ;
}
}


  return (
    <div className=" flex flex-col bg-white backdrop-blur-lg w- pt-6 pb-5  rounded-3xl gap-1 shadow-md hover:shadow-xl  overflow-hidden">
    <div>
      <h2 className=" text-principal border-b-2 pb-3 pl-4 font-poppins w-full flex flex-col justify-center items-start ">
        <h1 className=" text-sm font-poppins">
          {" "}
          Message from : {props.name}
        </h1>
        <h2 className=" text-sm font-poppins">{props.email}</h2>
      </h2>
    </div>
    <div className=' min-h-[120px]'>
      <h2 className="flex items-center justify-start pl-4 text-start px-2 font-poppinsm my-4 text-black text-lg space-x-2">
        {props.text}
      </h2>
    </div>

    <Link className=" border-t-2 pt-4 border-principal w-full no-underline flex pl-4 justify-start items-center">
      <button 
      onClick={() => deleteContact(props.id)}
      className="text-sky-400 px-2 py-1 bg-principal w-fit space-x-1 text-black rounded-md">
        <h1>DELETE</h1>
      </button>
    </Link>
  </div>

  )
}

export default GetContact
