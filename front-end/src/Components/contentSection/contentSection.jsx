import React from "react";
import "./contentSection.css";
import { FiArrowRight } from "react-icons/fi";
import Content1 from '../../assets/c1.png' ;
import Content2 from '../../assets/c2.png'
import Content3 from '../../assets/c3.png'
import { Link } from "react-router-dom";

const contentSection = (props) => {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div id="content" className={`content ${props.opacity}`}>
      <div className="container h-fit justify-center p-11 space-y-9 flex flex-col">
        <div className="flex space-x-2 ">
          <div className="w-1/3"><img className="" src={Content1} alt="" /></div>
          <div className="text-start text-white p-6 pt-8 w-2/3">
            <div className=""><h1 className=" text-3xl text-start font-[Montserrat] font-bold">FIND YOUR <span className=" text-principal">COACH</span></h1></div>
            <div className=" mt-4"><p className="text-lg"> 
Finding a coach who understands your unique needs and challenges can be a game changer in achieving your personal or professional goals. With the rise of coaching web apps, it's easier than ever to connect with qualified coaches who can guide you along your journey.</p></div>
            {/* <div className=" mt-16 font-bold font-poppins"><Link className=" no-underline hover:underline flex w-fit">Learn More &nbsp; <FiArrowRight className="mt-1 font-bold" /></Link></div> */}
            
            
            {/* {user && user.role ==='coach' &&  <div className="mt-16 font-bold  font-poppins"><Link to='/coach' className=" no-underline hover:underline flex w-fit">Learn More &nbsp; <FiArrowRight className="mt-1" /></Link></div>}
            {user && user.role ==='client' &&  <div className="mt-16 font-bold  font-poppins"><Link to='/client' className=" no-underline hover:underline flex w-fit">Learn More &nbsp; <FiArrowRight className="mt-1" /></Link></div>}
            {user && user.role ==='admin' &&  <div className="mt-16 font-bold  font-poppins"><Link to='/admin' className=" no-underline hover:underline flex w-fit">Learn More &nbsp; <FiArrowRight className="mt-1" /></Link></div>}
            { !user &&  <div className="mt-16 font-bold  font-poppins"><Link to='/login' className=" no-underline hover:underline flex w-fit">Learn More &nbsp; <FiArrowRight className="mt-1" /></Link></div>}
             */}
            
            </div>
        </div>

        <div className="flex space-x-2">
        <div className="text-start text-white p-6 pt-8 w-2/3">
            <div className=""><h1 className=" text-3xl text-start font-[Montserrat] font-bold">COACH YOUR <span className=" text-principal">CLIENTS</span></h1></div>
            <div className=" mt-4"><p className="text-lg">Coaching web apps are a valuable tool for coaches looking to provide their clients with high-quality coaching services. These apps offer a wide range of features that enable coaches to effectively communicate with their clients, track progress, and provide personalized guidance and support.</p></div>
            
            
            {/* {user && user.role ==='coach' &&  <div className="mt-16 font-bold  font-poppins"><Link to='/coach' className=" no-underline hover:underline flex w-fit">Learn More &nbsp; <FiArrowRight className="mt-1" /></Link></div>}
            {user && user.role ==='client' &&  <div className="mt-16 font-bold  font-poppins"><Link to='/client' className=" no-underline hover:underline flex w-fit">Learn More &nbsp; <FiArrowRight className="mt-1" /></Link></div>}
            {user && user.role ==='admin' &&  <div className="mt-16 font-bold  font-poppins"><Link to='/admin' className=" no-underline hover:underline flex w-fit">Learn More &nbsp; <FiArrowRight className="mt-1" /></Link></div>}
            { !user &&  <div className="mt-16 font-bold  font-poppins"><Link to='/login' className=" no-underline hover:underline flex w-fit">Learn More &nbsp; <FiArrowRight className="mt-1" /></Link></div>}
            */}
           
            </div>
          <div className=" w-1/3"><img src={Content2} alt="" /></div>
        </div>
        <div className="flex space-x-2 p-4 rounded-3xl bg-principal">
          <div className=" w-1/3"><img  src={Content3} alt="" /></div>
          <div className="text-start text-black p-6 pt-8 w-2/3">
            <div className=""><h1 className=" text-3xl text-start font-[Montserrat] font-bold">GET THE SHAPE OF YOUR LIFE</h1></div>
            <div className=" mt-4"><p className="text-lg"> Getting in shape and achieving your fitness goals can be challenging, but a coaching web app can provide the support and guidance you need to make lasting changes in your life. These apps offer a range of features and tools that can help you develop a personalized fitness plan and track your progress towards your goals. </p></div>
            {/* <div className=" mt-16 font-bold font-poppins"><Link className=" no-underline hover:underline flex w-fit">Learn More &nbsp; <FiArrowRight className="mt-1" /></Link></div> */}
            
            
            {/* {user && user.role ==='coach' &&  <div className="mt-16 font-bold  font-poppins"><Link to='/coach' className=" no-underline hover:underline flex w-fit">Learn More &nbsp; <FiArrowRight className="mt-1" /></Link></div>}
            {user && user.role ==='client' &&  <div className="mt-16 font-bold  font-poppins"><Link to='/client' className=" no-underline hover:underline flex w-fit">Learn More &nbsp; <FiArrowRight className="mt-1" /></Link></div>}
            {user && user.role ==='admin' &&  <div className="mt-16 font-bold  font-poppins"><Link to='/admin' className=" no-underline hover:underline flex w-fit">Learn More &nbsp; <FiArrowRight className="mt-1" /></Link></div>}
            { !user &&  <div className="mt-16 font-bold  font-poppins"><Link to='/login' className=" no-underline hover:underline flex w-fit">Learn More &nbsp; <FiArrowRight className="mt-1" /></Link></div>}
             */}
            </div>
        </div>

      </div>
    </div>
  );
};

export default contentSection;
