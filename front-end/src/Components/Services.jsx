import React from 'react'
import Workouti from "../assets/d1.png";
import Dieti from "../assets/w1.png";
import Coachi from "../assets/tr.png";
import Business from "../assets/portfolio.png";

const Services = () => {
  return (
    <div id='services' className=' w-[67%] flex space-x-5 items-center justify-center h-[500px] mt-12 mb-24'>
      <div className=' bg-services w-[40%] h-full flex flex-col justify-center items-center px-4 rounded-[48px] bg-cover ' > 
      <h3 className=' text-4xl text-principal font-[Montserrat]'>TRAINER + CLIENT</h3>
      <h3 className=' text-2xl text-white font-[Montserrat]'>System Management</h3>
      <h3 className=' text-xl mx-3 text-center mt-7 text-white font-[Montserrat]'>This all-in-one client management
 tool ensures that you, as a trainer
,are not missing any details to
 guide your clients perfectly.</h3>
       </div>
      <div className=' w-[60%] space-y-5 h-full ' >
        <div className=' h-[110px] flex justify-start pl-24 items-center space-x-8 rounded-3xl bg-white'><img src={Workouti} className=' w-24 h-24' alt=""/> <h1 className=' text-4xl font-[Montserrat]'>Workout Plan</h1></div>
        <div className=' h-[110px] flex justify-start pl-24 items-center  space-x-8 rounded-3xl bg-white'><img src={Dieti} className=' w-24 h-24' alt=""/> <h1 className=' text-4xl font-[Montserrat]'>Nutrition Plan</h1></div>
        <div className=' h-[110px] flex justify-start pl-24 items-center  space-x-8 rounded-3xl bg-white'><img src={Coachi} className=' w-24 h-24' alt=""/> <h1 className=' text-4xl font-[Montserrat]'>Pro Coaches</h1></div>
        <div className=' h-[110px] flex justify-start pl-24 items-center  space-x-8 rounded-3xl bg-white'><img src={Business} className=' w-24 h-24' alt=""/> <h1 className=' text-4xl font-[Montserrat]'>Coach Career</h1></div>
      </div>
      
    </div>
  )
}

export default Services
