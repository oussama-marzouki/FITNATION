import React from "react";
import logoNav from '../assets/Logof.png'
import { FaMoneyBillWave, FaUserAlt, FaUsers } from "react-icons/fa";
import { MdCalculate } from "react-icons/md";
import { RiLogoutBoxFill } from "react-icons/ri" ;
import { GiTeamUpgrade } from "react-icons/gi" ;
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../Redux/features/authSlice";

const SideBar = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
 
   const user = useSelector((state) => state.auth.user);
   console.log(user);
 
   const logoutHandler = () => {
     dispatch(logout());
     dispatch(reset());
     navigate("/");
   };

  return (
    <div className=" mr-60 bg-principal  ml-2 ">

<aside id="default-sidebar" className="fixed top-32 z-40 w-64 h-[90%] transition-transform -translate-x-[full] justify-start sm:translate-x-0" aria-label="Sidebar">
   <div className=" px-3 pb-8 h-full pt-10 p rounded-2xl shadow-xl overflow-y-auto bg-[#28282B] text-white ml-4 dark:bg-gray-800">

      <ul className=" space-y-6 font-medium  ">
         <li>
         <Link className="no-underline" to='/coach'>   <a href="#" className="flex items-center  p-2 text-gray-900 rounded-lg no-underline dark:text-white hover:bg-principal">
   <FaUsers className=' w-1/6 h-1/6'/>               
   <span className="ml-3">Clients</span>
            </a> </Link>
         </li>
         <li>
         <Link className="no-underline" to='/macrosCalculator'>  <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg no-underline dark:text-white hover:bg-principal">
               <MdCalculate className="w-1/6 h-1/6" />               
               <span className="flex-1 ml-3 whitespace-nowrap">Macros Calculator</span>
            </a>
         </Link>
         </li>
         {/* <li>
            <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg no-underline dark:text-white hover:bg-principal">
            <FaUsers className='w-1/6 h-1/6'/>    
             <span className="flex-1 ml-3 whitespace-nowrap">Incompleted Plans</span>
            </a>
         </li> */}
         <li>
         <Link className="no-underline" to='/wallet' > <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg no-underline dark:text-white hover:bg-principal">
         <FaMoneyBillWave className=' w-1/6 h-1/6' />
               <span className="flex-1 ml-3 whitespace-nowrap">Prices</span>
            </a>
            </Link>  

         </li>
         <li>
         <Link className="no-underline" to='/transformation' > <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg no-underline dark:text-white hover:bg-principal">

               <GiTeamUpgrade className=' w-1/6 h-1/6' />
               <span className="flex-1 ml-3 whitespace-nowrap">Transformations</span>
            </a>
            </Link>  
            <hr  className=" mt-8"/>
         </li>

         <li className="">
         <Link className="no-underline" to='/profile' > <a href="#" className="flex items-center p-2 text-gray-900 rounded-lg no-underline dark:text-white hover:bg-principal">
               <FaUserAlt className='w-1/6 h-1/6' />
               <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
            </a>
         </Link>   
         </li>
         <li>
            <a href="#" onClick={logoutHandler} className="flex items-center p-2 text-gray-900 rounded-lg no-underline dark:text-white hover:bg-principal">
               <RiLogoutBoxFill className=' w-1/6 h-1/6' />
               <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
            </a>
         </li>
      </ul>
   </div>
</aside>
   </div>
  );
};

export default SideBar;
