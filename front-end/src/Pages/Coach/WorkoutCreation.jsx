import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar";
import { CiCirclePlus } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import { TiDeleteOutline } from "react-icons/ti";
import { axiosCoach } from "../../util/axios-config";
import Exercices from "../../Components/Exercices";
import AddWorkout from "../../Components/AddWorkout";
import AddExercice from "../../Components/AddExercice";
import UpdateExercice from "../../Components/UpdateExercice";
import { BiCheckCircle } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import UpdateWorkout from "../../Components/UpdateWorkout";
import Sprinner from "../../Components/Sprinner";
import { toast } from "react-toastify";

const WorkoutCreation = () => {
  // const { id } = useParams();

  // const { client } = useSelector((state) => state.clientData);
  const client = JSON.parse(localStorage.getItem("client"));

  const [isLoading, setIsLoading] = useState(false);
  const handleIsLoading = (data) => {
    setIsLoading(data);
  };

  
  const [showModal, setShowModal] = useState(false);

  function updateModal() {
    setShowModal(false);
  }

  const [workouts, setWorkouts] = useState([]);
  const [done, setDone] = useState(false);
  
  // const [workoutid , setWorkoutid] = useState('');

  useEffect(() => {

    getWorkouts();
    getCompleted();
    console.log(done) ;
  },[]);

  ////////////////////// GET WORKOUTS ///////////
  const getWorkouts = async () => { 
    try {
      const response = await axiosCoach.get(`/getworkouts/${client.workoutPlan}`);
      setWorkouts(response.data);  
    } catch (err) {
      console.log(err);
    }
  };

    ////////////////////// SET COMPLETED ///////////
    const setCompleted  = async (e) => { 
      e.preventDefault() ; 

      try {
        const response = await axiosCoach.patch(`/setplandone/${client.workoutPlan}`);
        setDone(response.data.completed);  
        console.log(done); 
      } catch (err) {
        console.log(err);
      }
    };

      ////////////////////// GET COMPLETED STATUS ///////////
  const getCompleted = async () => { 
    try {
      const response = await axiosCoach.get(`/getplandone/${client.workoutPlan}`);
      setDone(response.data.completed);  
    } catch (err) {
      console.log(err);
    }
  };

  ///////////////////////////////////////////////////////////////////////////


  function handleAddClick(id) {

    const updatedWorkouts = workouts.map((workout) =>
      workout._id === id ? { ...workout, showForm: true } : workout
    );
    setWorkouts(updatedWorkouts);
  }

  // function handleFormSubmit(id, duration) {
  //   const updatedWorkouts = workouts.map((workout) =>
  //     workout.id === id ? { ...workout, duration: workout.duration + duration, showForm: false } : workout
  //   );
  //   setWorkouts(updatedWorkouts);
  // }

  function handleFormCancel(id) {
    const updatedWorkouts = workouts.map((workout) =>
      workout._id === id ? { ...workout, showForm: false } : workout
    );
    setWorkouts(updatedWorkouts);
  }

  ///////////////////////////////////////////////////////////////////////////



  ////////////////////// GET WORKOUTS /////////////////////////
  const deleteWorkout = async (workoutid) => {
    // e.preventDefault() ; 
    try {
      setIsLoading(true) ; 
      const response = await axiosCoach.delete(`/deleteworkout/workout/${workoutid}/workoutplan/${client.workoutPlan}`);
      window.location.reload();
      setIsLoading(false) ;

    } catch (err) {
      console.log(err);
    }
  };


  const ageCalculate = (year) => {
    var currentTime = new Date() ;
    var currentyear = currentTime.getFullYear() ;
    year = parseInt(year) ; 
    console.log(typeof(currentyear)) ;

    return currentyear - year ; 
  }

    ////////////////////////////////// Update workout  /////////////////////////////////////////


    function handleAddClickupdate(id) {

      const updatedWorkouts = workouts.map((workout) =>
        workout._id === id ? { ...workout, showUpdate: true } : workout
      );
      setWorkouts(updatedWorkouts);
    }
  
    function handleFormCancelupdate(id) {
      const updatedWorkouts = workouts.map((workout) =>
        workout._id === id ? { ...workout, showUpdate: false } : workout
      );
      setWorkouts(updatedWorkouts);
    }
  
    ///////////////////////////////////////////////////////////////////////////


  return (

    <>

    <div className="flex">
      <SideBar />
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="  w-[90%] mt-3.5 flex flex-col justify-center items-start py-10 pl-14 font-bold space-y-2 text-white text-start rounded-3xl bg-workoutbg bg-cover ">
          <div className="">
            <p className="uppercase text-[35px] font-extrabold font-poppins ">
              {client.firstName}'S WORKOUT PLAN{" "}
            </p>
          </div>
          <div className="">
            <p className="text-[20px] space-x-3">
              <span className=" text-principal"> weight : </span>
              {client.weight}
              <span className=" text-principal"> height : </span> 
              {client.height} 
              <span className=" text-principal"> age : </span>
              {ageCalculate(client.age.substring(0,4))}
              <span className=" text-principal"> gender : </span>
              {client.gender}
              <span className=" text-principal"> goal : </span>
              {client.goal}
            </p>
          </div>
        </div>
        {/* 
          <div className='w-[90%] mt-3.5 flex flex-col justify-center h-full items-start py-10 pl-14 font-bold space-y-2 text-white text-start rounded-3xl bg-[#28282B]'>
backdrop-blur-lg bg-opacity-50 bg-white

            <h1>oussama marzouki</h1>

          </div> */}
        <div className="w-[90%] mt-3.5 flex flex-col justify-center items-center h-full p-6 font-bold space-y-2 backdrop-blur-lg bg-opacity-40 bg-white bg-cover text-white rounded-3xl ">
          <div
            className='flex flex-col break-words items-center w-full shadow-2xl bg-principal bg-cover rounded-3xl'
          >
            <div className="px-6 py-4 flex space-x-64 justify-center border-0">
            <button
                onClick={(e) => {setCompleted(e)}}
                className="text-white bg-[#28282B] h-12 flex font-bold uppercase text-sm px-6 py-3 rounded-2xl shadow hover:shadow-lg outline-none focus:outline-none ml-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                VALIDATE
              </button>
              <div className="flex flex-wrap items-center">
                <div className="relative w-full max-w-full flex-grow flex-1">
                  <h2 className=" font-extrabold text-black text-2xl text-blueGray-700">
                    WORKOUT PLAN
                  </h2>
                  {done === true ? (
                  <h3 className="font-bold text-2xl flex items-center text-green justify-center text-blueGray-700">
                  <BiCheckCircle  />  completed
                  </h3> 
                  ) : null}
                 {done === false ? ( <h3 className="font-bold flex items-center text-2xl text-redc justify-center text-blueGray-700">
                  <TiDeleteOutline  />  incompleted
                  </h3> 
                  ) : null}
                </div>
              </div>
              <button
                  className="text-white flex bg-principal space-x-2 font-bold uppercase text-sm px-6 py-3 h-fit rounded-2xl shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(true)}
              >
                  <CiCirclePlus size={'22px'} />  <h3> ADD WORKOUT</h3>
              </button>
            </div>
            {showModal ? (
            <AddWorkout handleIsLoading={handleIsLoading} onUpdate={updateModal}/>
            ) : null}
            <div className="block w-full p-6 space-y-3 overflow-x-auto">
            {workouts.map((workout) => (
              <div key={workout._id} className="bg-[#28282B] backdrop-blur-lg flex rounded-3xl pt-4 h-fit pb-4">
                <div className=" w-full flex flex-col items-center">
                  <div className=" flex h-fit w-full  items-center justify-between px-3  ">
                    <p className="text-start text-lg mb-2 uppercase ">
                      {workout.name} : {workout.day}
                    </p>
                    <div className="flex space-x-2">
                      <button
                        className="text-white flex font-bold uppercase h-12 text-sm  py-3 rounded-2xl shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {handleAddClick(workout._id)}}
                      >
                        <CiCirclePlus className="text-white" size={"22px"} />
                        &nbsp; ADD &nbsp; |
                      </button>
                      <button
                       onClick={() => handleAddClickupdate(workout._id)}
                        className="text-white flex font-bold uppercase h-12 text-sm py-3 rounded-2xl shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        <FaRegEdit className="text-white" size={"22px"} />
                        &nbsp; UPDATE &nbsp;|
                      </button>
                      <button
                       onClick={() => deleteWorkout(workout._id)}
                        className="text-white flex font-bold uppercase h-12 text-sm  py-3 rounded-2xl shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        <AiTwotoneDelete className=" text-white" size={"22px"} />
                        &nbsp; DELETE
                      </button>
                    </div>
                  </div>
                  <hr className="" />
                  {workout.showUpdate ? ( 
                  <UpdateWorkout
                     className="mt-2" onUpdate={() => handleFormCancelupdate(workout._id)} workoutid={workout._id} 
                     />
                  ) : null}
                  {workout.showForm ? (
                  <AddExercice handleIsLoading={handleIsLoading} className="mt-2" onUpdate={() => handleFormCancel(workout._id)} workoutid={workout._id} />
                  ) : null}
     

                  <div className=" flex flex-col justify-center items-center px-6 w-full ">
 
                    <Exercices handleIsLoading={handleIsLoading} workoutid={workout._id} />

                  </div>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>





{  isLoading === true &&  
<>
<Sprinner/>
</>
}






    </>
  );
};

export default WorkoutCreation;
