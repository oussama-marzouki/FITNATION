import React, { useState } from 'react'
import { axiosAdmin } from '../util/axios-config';
import { toast } from 'react-toastify';

const Contact = () => {


  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [text , setText] = useState('');

  const addContact = async () => { 
     
    try {
    const response = await axiosAdmin.post(`/addcontact`, {name , email , text});
    console.log(response) ; 
   // window.location.reload();
    toast.success('Message sent successfuly !');
    } catch (err) {
    toast.error(err.response.data.message);
    console.log(err) ;
}
}


  return (

      
      <form action="" 
      onSubmit={addContact}
      id='contact'
      className=' bg-contact w-[86%] h-[700px] text-white flex flex-col space-y-6 items-center justify-center rounded-[48px] py-32 p-12'>
      <h3 className=' text-4xl font-[Montserrat]'>CONTACT</h3>
      <input 
      onChange={(e)=>setName(e.target.value)}
      placeholder='full name' 
      className=' bg-white border-white text-lg pl-3 text-black w-2/5' 
      type="text" name="" id="" />
      <input 
      onChange={(e)=>setEmail(e.target.value)}
      placeholder='email' 
      className='text-black bg-opacity-0 text-lg w-2/5 pl-3' 
      type="email" name="" id="" />
      <textarea
      onChange={(e)=>setText(e.target.value)}
      placeholder='message' 
      name="" id="" 
      className='opacity-50 text-black p-3 text-lg placeholder:text-black placeholder:text-lg rounded-2xl w-2/5' cols="30" rows="8"  ></textarea>
      <button type='submit' className=' bg-principal rounded-3xl text-xl w-[120px] px-5 py-2 '>Envoyer</button>
      </form>

  )
}

export default Contact
