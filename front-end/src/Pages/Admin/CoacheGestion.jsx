import React, { useEffect, useState } from 'react'
import { axiosAdmin } from '../../util/axios-config';
import { AiFillDelete } from 'react-icons/ai';
import { BsChevronLeft } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const CoacheGestion = () => {


    const [coaches , setCoaches] = useState([]) ;
    /// PAGINATION 
    const items = 5 ; 
    const [current , setCurrent] = useState(1) ; 
    const NbPage = Math.ceil(coaches.length / items) ; 
    const startIndex = (current - 1) * items ; 
    const endIndex = startIndex + items ; 
  
    const dataPerPage = coaches.slice(startIndex , endIndex ) ; 
  
      useEffect(() => {
          getCoaches();
        },[]);
      
        const getCoaches = async () => { 
          try {
            const response = await axiosAdmin.get(`/getcoaches`);
            setCoaches(response.data); 
          } catch (err) {
            console.log(err);
          }
      }
  
      const deleteCoach = async (id) => { 
     
          try {
              console.log(id) ;
          const response = await axiosAdmin.delete(`/deletecoach/${id}`);
          window.location.reload();
          //console.log(response.data) ;
          toast.success('Coach deleted successfuly');
          } catch (err) {
          toast.error(err.response.data.message);
          console.log(err) ;
      }
  }


  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className=" flex flex-col justify-center space-y-5 w-[70%] px-6 rounded-3xl bg-opacity-70 mb-11 bg-black items-center py-6">
        <div className=" bg-principal flex flex-col space-y-6 justify-end pb-5 rounded-3xl text-5xl uppercase items-center w-full h-44">
          <h1 className="font-[montserrat] font-extrabold">Coaches List</h1>
          <Link className=' text-base flex items-center space-x-2 font-[Montserrat] no-underline font-bold' to='/admin'> <BsChevronLeft size={'15px'} /> <h1>Go Back </h1></Link>
        </div>
        <div className="w-full">
          <div className="w-full justify-center space-y-3 items-center flex flex-col">

            { dataPerPage.map((coach) => (
            <div key={coach._id} className=" w-full flex items-center justify-between space-x-2 rounded-3xl py-4 px-6 bg-white">
              <div className="flex space-x-3 items-center">
                <img src={coach.photo} className=" rounded-3xl w-20 h-20" alt="" />
                <div className="flex flex-col items-start">
                  <h1 className=" uppercase text-xl font-[Montserrat] font-semibold">{coach.firstName} {coach.lastName}</h1>
                  <h2>{coach.email}</h2>
                </div>
              </div>
              <button 
              onClick={()=>deleteCoach(coach._id)}
              className="bg-principal px-5 py-3 rounded-3xl text-white font-[Montserrat] font-semibold flex items-center space-x-2 uppercase">
                <AiFillDelete /> <h1>delete</h1>
              </button>
            </div>
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
      </div>
    </div>
  )
}

export default CoacheGestion
