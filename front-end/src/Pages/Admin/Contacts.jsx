import React, { useEffect, useState } from "react";
import Workout from "../../Components/Workout";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { AiTwotoneCalendar } from "react-icons/ai";
import GetContact from "../../Components/GetContact";
import { axiosAdmin } from "../../util/axios-config";
import { BiArrowBack } from "react-icons/bi";

const Contacts = () => {

const [contacts , setContacts] = useState([]) ; 


 /// PAGINATION 
 const items = 6 ; 
 const [current , setCurrent] = useState(1) ; 
 const NbPage = Math.ceil(contacts.length / items) ; 
 const startIndex = (current - 1) * items ; 
 const endIndex = startIndex + items ; 

 const dataPerPage = contacts.slice(startIndex , endIndex ) ; 


  useEffect(() => {
    getContacts();
  },[]);

  const getContacts = async () => { 
    try {
      const response = await axiosAdmin.get(`/getcontacts`);

      setContacts(response.data); 
    } catch (err) {
      console.log(err);
    }
}

  return (
    <div className=" flex flex-col pb-14 justify-center items-center">
      <div className=" flex items-center justify-center space-x-56 pr-72 mr-5 ">
        <Link to='/admin'><BiArrowBack size={'28px'} /></Link>
        <h1 className=" my-12 text-6xl text-black font-poppins font-extrabold"> All Messages </h1>
        </div>
      <div className="grid grid-cols-3 gap-x-5 w-[75%] mt-6 gap-y-5 ">
{ dataPerPage.map((contact) => (
  <GetContact text={contact.text} email={contact.email} name={contact.name} id={contact._id}  />
  ))}
      </div>
      <div className=" flex justify-center mt-4 space-x-4 items-center ">
         {
          Array.from( {length: NbPage}, (_, i) => i + 1).map(page => {
           return <div>  <button onClick={()=>setCurrent(page)} className=" px-4 rounded-3xl py-2 bg-principal">{page}</button> </div>  ;
          })
         }

        </div>
    </div>
  );
};

export default Contacts;
