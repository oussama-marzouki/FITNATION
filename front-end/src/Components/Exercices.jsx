import React, { useEffect, useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { AiTwotoneDelete } from "react-icons/ai";
import { RxUpdate } from "react-icons/rx";
import { BiCheckCircle } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import { axiosCoach } from "../util/axios-config";
import UpdateExercice from "./UpdateExercice";
import DetailPhoto from "./DetailPhoto";

const Exercices = (props) => {
  const [exercices, setExercices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // const [workoutid , setWorkoutid] = useState('');

  function handleClick(id) {
    props.onUpdate(id);
    setShowModal(true);
  }

  const handelLoading = (data) => {
    props.handleIsLoading(data) ;
  }

  useEffect(() => {
    getExercices();
    console.log(exercices);

  }, []);


  const getExercices = async () => {
    try {
      const response = await axiosCoach.get(`/getexercices/${props.workoutid}`);
      setExercices(response.data) ;
      console.log(exercices);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteExercice = async (id) => {
    // e.preventDefault() ;
    try {
      await axiosCoach.delete(
        `/deleteexercice/exercice/${id}/workout/${props.workoutid}`
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

    ///////////////////////////////////////////////////////////////////////////


    function handleAddClick(id) {

      const updatedExercices = exercices.map((exercice) =>
      exercice._id === id ? { ...exercice, showForm: true } : exercice
      );
      setExercices(updatedExercices);
    }
  
    // function handleFormSubmit(id, duration) {
    //   const updatedWorkouts = workouts.map((workout) =>
    //     workout.id === id ? { ...workout, duration: workout.duration + duration, showForm: false } : workout
    //   );
    //   setWorkouts(updatedWorkouts);
    // }
  
    function handleFormCancel(id) {
      const updatedExercices = exercices.map((exercice) =>
      exercice._id === id ? { ...exercice, showForm: false } : exercice
      );
      setExercices(updatedExercices);
    }
  
    ///////////////////////////////////////////////////////////////////////////

  return (
    <>
      {exercices.map((exercice) => (
        <div
          key={exercice._id}
          className=" flex flex-col text-black shadow-2xl justify-between items-center rounded-2xl w-full "
        >
          <div className=" flex text-black shadow-2xl bg-principal justify-between items-center  rounded-2xl px-4 mt-3 w-full">
            <div className="flex w-1/4 items-center p-1 ">
              <img
                src={exercice.photo}
                className=" h-14 w-14 bg-white rounded-full border p-1"
                alt="..."
              />

              <span className="ml-3 font-bold w-56 ">{exercice.name}</span>
            </div>
            <div className="   w-1/6 text-center"> {exercice.sets} Sets </div>
            <div className="   w-1/6 text-start"> {exercice.reps} Reps </div>
            <div className="   w-1/3 text-start">
              <h2>{exercice.description} </h2>
            </div>
            <div className="flex space-x-2 items-center  w-1/7 text-center justify-center mt-1">
              <button
                onClick={() => {
                  // handleAddClick(food._id) ;
                  if(exercice.showForm === false || !exercice.showForm ) {
                    handleAddClick(exercice._id) ;
                    //  setShowModal(true);       
                  }else {
                    //  setShowModal(false); 
                    handleFormCancel(exercice._id) ;
                   }
                }}
                className="text-white flex font-bold uppercase h-12 text-sm py-3 rounded-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                <FaRegEdit className=" text-black" size={"22px"} />
              </button>
              <button
                onClick={() => deleteExercice(exercice._id)}
                className="text-white flex font-bold uppercase h-12 text-sm  py-3 rounded-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                <AiTwotoneDelete className=" text-black" size={"22px"} />
              </button>
            </div>
          </div>
          {/* showModal && */}
          { exercice.showForm ? <div className=" flex text-black shadow-2xl bg-white justify-between items-center rounded-2xl px-4 mt-3 mb-3 w-full"> <UpdateExercice handelLoading={handelLoading} onUpdate={() => handleFormCancel(exercice._id)} exerciceid={exercice._id} />  </div> : null}
          </div>    
      ))}
    </>
  );
};

export default Exercices;
