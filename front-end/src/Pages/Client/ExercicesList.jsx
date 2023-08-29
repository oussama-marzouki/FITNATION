import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import coach from "../../assets/coach1.jpg";
import { axiosCoach } from "../../util/axios-config";
import { BiArrowToLeft } from "react-icons/bi";
import { GoAlert } from "react-icons/go";
import DetailPhoto from "../../Components/DetailPhoto";

const ExercicesList = () => {
  let { state } = useLocation();
  console.log(state) ;

  const [exercices, setExercices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    getExercices();
    console.log(exercices);
  }, []);

  const getExercices = async () => {
    try {
      const response = await axiosCoach.get(`/getexercices/${state.id}`);
      setExercices(response.data);
      console.log(exercices);
    } catch (err) {
      console.log(err);
    }
  };

  return (

    <>
    <div className=" flex justify-center items-center flex-col">

      <div className="w-[67%] flex justify-between text-5xl bg-clientw bg-cover text-white rounded-2xl p-6 uppercase items-center h-fit mt-14 font-extrabold  ">
     <h1>{state.name} : {state.day}</h1> 
     <Link to='/clientworkout' className=" no-underline text-lg flex items-center space-x-1 bg-white bg-opacity-40 px-3 py-1 rounded-2xl font-[Montserrat]"> <BiArrowToLeft size={'22px'} /> <h1>Go Back</h1> </Link>
      </div>
      <div className="grid grid-cels-3 gap-x-0 w-[70%] px-6 py-8 rounded-2xl place-items-center mt-2 gap-y-5 ">
      {exercices.map((exercice) => ( 
        <div className=" flex items-center space-x-7 justify-start pl-6 text-white bg-[#28282B] backdrop-blur-lg w-full py-4 rounded-3xl gap-1 shadow-xl hover:shadow-2xl hover:scale-105 duration-300 px-3 overflow-hidden">
              <img
               onClick={() => {
                setShowModal(true) ;
                setPhoto(exercice.photo) ;
              }}
                src={exercice.photo}
                className=" h-24 w-24 bg-white rounded-2xl border p-1"
                alt="..."
              />
          <div>
            <div className=" text-2xl font-bold uppercase">{exercice.name}</div>
            <div className=" text-lg"><span className=" font-bold text-principal">reps :</span> {exercice.reps} <span className=" font-bold text-principal"> sets : </span>{exercice.sets}</div>
            <div className=""><span className=" font-bold text-principal">Description : </span>  {exercice.description} </div>
          </div>
        </div>
            ))} 
      </div>
      {exercices.length === 0 &&
      <div className=" h-fit py-6 flex flex-col rounded-3xl mt-6 bg-principal w-[50%] justify-center items-center ">
        <GoAlert size={'50px'} className=" text-white" />
      <h1 className=" text-white p-4  text-2xl w-full font-poppins font-bold uppercase"> currently you don't have a exercices in your workout wait your coach!</h1>
      </div>
      }
    </div>


    {showModal ? (
        <>
          <div
          onClick={() => setShowModal(false)}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed bg-black bg-opacity-30 backdrop-blur-lg inset-0 z-50 outline-none focus:outline-none"
          >
            
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
    
              <div className="border-0  w-[550px] h-[550px]   relative flex flex-col  outline-none focus:outline-none">
              <div className="overlay  mr-2 mt-2 text-black " onClick={() => setShowModal(false)}></div>
                <img className="rounded-3xl shadow-3xl " src={photo} alt="" />

              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black">oussama</div>

        </>
      ) : null}


    </>
  );
};

export default ExercicesList;
