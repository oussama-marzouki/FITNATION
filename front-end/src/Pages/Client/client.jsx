import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar";
import coach from "../../assets/coach1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { axiosAthlete } from "../../util/axios-config";
import MyRate from "../../Components/MyRate";
import { logout, reset } from "../../Redux/features/authSlice";
import { useDispatch } from "react-redux";

const Client = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [coach, setCoach] = useState({});
  const [exist, setExist] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    getCoach();
    getCoachExist();

    console.log(coach) ;
  },[]);

    ////////////////////////// GET COACH ////////////////////////
    const getCoach = async () => { 
      try {
        const response = await axiosAthlete.get(`/getcoach`);
        console.log(response.data) ;
        setCoach(response.data); 
        console.log(coach) ;
      } catch (err) {
        console.log(err);
      }
    };


        ////////////////////////// SET COACH RATE ////////////////////////
        const setRate = async (e , id , value) => { 
          e.preventDefault()
          try {
            const response = await axiosAthlete.post(`/setrate/${id}` , {star : value});
            console.log(id) ; 
            //console.log(coach) ;
          } catch (err) {
            console.log(err);
          }
        };
    
////// LOGOUT ///////////////
const logoutHandler = () => {
  dispatch(logout());
  dispatch(reset());
  navigate("/");
};

        ////////////////////////// GET COACH ////////////////////////
        const getCoachExist = async () => { 
          try {
            const response = await axiosAthlete.get(`/getcoachexist`);
            // console.log(response.data) ;
            setExist(response.data.exist); 
            console.log(exist) ;
          } catch (err) {
            console.log(err);
          }
        };

  return (
    <div className={`flex`}>
      <div className={`w-[100%] left-0`}>
        <div className="px-11 pt-14 space-y-4">
          <h1 className=" text-start text-principal uppercase font-bold text-5xl">
            {user.firstName} {user.lastName}
          </h1>
          <h2 className="text-start capitalize font-bold text-2xl">
            Dear Customer welcome to your space
          </h2>
          <div className=" flex">
              <button onClick={logoutHandler} className=" rounded-2xl font-poppins items-center space-x-1 flex p-2 font-bold font text-principal">
              <BiLogOut/>  <h2>Logout</h2> 
              </button>
              <button className=" rounded-2xl font-poppins px-3 text-white font-bold bg-principal">
              <Link to='/profile' className="no-underline">Profile</Link>  
              </button>
              </div>
        </div>
{ exist === true &&  <div className="relative w-[95%] rounded-3xl p-6 ml-11 mt-8 flex flex-col shadow-2xl bg-cover bg-bgc ">
          <div className="flex justify-between h-full items-center">
            <div className="flex h-full items-center">
              <img
                src={coach.photo}
                className=" h-28 w-28 object-cover rounded-full border-2 border-principal "
                alt="coach"
              />
              <div className=" ml-4 text-principal items-start font-[Montserrat] ">
                <h1 className="uppercase font-poppins font-extrabold  text-xl text-start">
                  Your coach is :
                </h1>
                <div className="flex space-x-2">
                <h1 className=" font-semibold text-3xl uppercase text-start text-white">
                  {coach.firstName} {coach.lastName}
                </h1>
                <div class="flex justify-center space-x-1 items-center">
    {/* {[1, 2, 3, 4, 5].map((value) => (
               <svg 
               key={value}
               onClick={(e) => setRate(e , coach.id , value)}
               style={{ cursor: 'pointer', color: value <= rate ? 'gold' : 'gray' }}
               aria-hidden="true" color="gold" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">      
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>    
        ))} */}
        <MyRate setRate={setRate} id={coach.id} />
        {/* <h1>( {coach.ratesnumber} )</h1> */}
</div>
</div>
                <h1 className="w-[600px] text-sm mt-1 text-start font-poppins text-white">
                {coach.bio}
                </h1>

              </div>
            </div>
            <div className=" h-[100px] space-x-2">

              <Link to='/coaches' className=" no-underline rounded-2xl p-3 text-white font-bold bg-principal">
                Other Coaches
              </Link>
            </div>
          </div>
        </div> }

 { exist === false && <div className="relative w-[95%] rounded-3xl p-6 ml-11 mt-8 flex flex-col shadow-2xl bg-cover bg-bgc ">
<div className="flex-col flex justify-center py-6 space-y-6 h-full items-center">
  <h1 className=" text-white text-3xl uppercase">for the moment you do not have a coach</h1>
  <div className="h-fit space-x-2">

    <Link to='/coaches' className=" no-underline rounded-2xl p-3 text-white font-bold bg-principal">
      Other Coaches
    </Link>
  </div>
</div>
</div> }


        <div className="relative w-[95%] ml-11 mb-6 mt-8 ">
          {/* <h1 className=" uppercase text-[40px] text-[#28282B]">
            Your <span className=" text-principal">Plans</span>
          </h1> */}
          <div className=" bg-principal bg-opacity-50 space-x-4 px-6 justify-center items-center flex w-full h-fit py-7 mt-8 rounded-3xl">
        
            <div className="w-2/4 h-72 rounded-3xl flex justify-center items-center bg-workoutp bg-cover ">
<div className=" w-full h-full  rounded-3xl flex justify-center items-center hover:bg-opacity-30 hover:bg-white">
            <Link to='/clientworkout' className=" no-underline">
              <h1 className=" text-white text-5xl hover:text-principal p-28 w-full h-full font-[Montserrat] font-bold uppercase">
                workout plan
              </h1>
              </Link>
</div>
            </div>
        
            <div className="w-2/4 h-72 rounded-3xl flex justify-center items-center bg-dietp bg-cover">
            <div className=" w-full h-full  rounded-3xl flex justify-center items-center hover:bg-opacity-30 hover:bg-white">
            <Link to='/clientdiet' className=" no-underline">
              <h1 className=" text-white text-5xl hover:text-principal p-28 w-full h-full font-[Montserrat] font-bold uppercase">
                diet plan
              </h1>
              </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Client;
