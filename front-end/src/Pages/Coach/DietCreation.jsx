import React, { useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import SideBar from "../../Components/SideBar";
import Food from "../../Components/Food";
import AddMeal from "../../Components/AddMeal";
import { axiosCoach } from "../../util/axios-config";
import { BiCheckCircle } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import AddFood from "../../Components/AddFood";
import UpdateMeal from "../../Components/UpdateMeal";
import Sprinner from "../../Components/Sprinner";

const DietCreation = () => {
  const client = JSON.parse(localStorage.getItem("client"));
  const [isLoading, setIsLoading] = useState(false);
  const handleIsLoading = (data) => {
    setIsLoading(data);
  };



  const [showModal, setShowModal] = useState(false);
  const [meals, setMeals] = useState([]);
  const [done, setDone] = useState(false);


  function updateModal() {
    setShowModal(false);
  }

  useEffect(() => {
    getMeals();
    getCompleted() ;
    console.log(meals);
  }, []);

  ////////////////////// GET WORKOUTS ///////////
  const getMeals = async () => {
    try {
      const response = await axiosCoach.get(`/getmeals/${client.dietPlan}`);
      setMeals(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  


    ///////////////////////////////////////////////////////////////////////////

        ////////////////////// SET COMPLETED ///////////
        const setCompleted  = async (e) => { 
          e.preventDefault() ; 
    
          try {
            const response = await axiosCoach.patch(`/setdplandone/${client.dietPlan}`);
            setDone(response.data.completed);  
            console.log(done); 
          } catch (err) {
            console.log(err);
          }
        };
    
          ////////////////////// GET COMPLETED STATUS ///////////
      const getCompleted = async () => { 
        try {
          const response = await axiosCoach.get(`/getdplandone/${client.dietPlan}`);
          setDone(response.data.completed);  
        } catch (err) {
          console.log(err);
        }
      };
    
      ///////////////////////////////////////////////////////////////////////////


    function handleAddClick(id) {

      const updatedMeals = meals.map((meal) =>
        meal._id === id ? { ...meal, showForm: true } : meal
      );
      setMeals(updatedMeals);
      console.log(updatedMeals) ;
    }
  
    // function handleFormSubmit(id, duration) {
    //   const updatedWorkouts = workouts.map((workout) =>
    //     workout.id === id ? { ...workout, duration: workout.duration + duration, showForm: false } : workout
    //   );
    //   setWorkouts(updatedWorkouts);
    // }
  
    function handleFormCancel(id) {
      const updatedMeals = meals.map((meal) =>
        meal._id === id ? { ...meal, showForm: false } : meal
      );
      setMeals(updatedMeals);
    }
  
    ///////////////////////////////////////////////////////////////////////////

      ////////////////////// GET WORKOUTS /////////////////////////
  const deleteMeal = async (mealid) => {
    // e.preventDefault() ; 
    try {
      const response = await axiosCoach.delete(`/deletemeal/meal/${mealid}/dietplan/${client.dietPlan}`);
      window.location.reload();
      console.log(response) ;
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

        const updatedMeals = meals.map((meal) =>
          meal._id === id ? { ...meal, showUpdate: true } : meal
        );
        setMeals(updatedMeals);
      }
    
      function handleFormCancelupdate(id) {
        const updatedMeals = meals.map((meal) =>
          meal._id === id ? { ...meal, showUpdate: false } : meal
        );
        setMeals(updatedMeals);
      }
    
      ///////////////////////////////////////////////////////////////////////////

  return (
    <>
      <div className="flex">
        <SideBar />
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="  w-[90%] mt-3.5 flex flex-col justify-center items-start py-10 pl-14 font-bold space-y-2 text-white text-start rounded-3xl bg-dietplan bg-cover ">
            <div className="">
              <p className="uppercase text-[35px] font-extrabold font-poppins ">
                {client.firstName}'S NUTRITION PLAN{" "}
              </p>
            </div>
            <div className="">
              <p className="text-[20px]">
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
            <div className="flex flex-col break-words items-center w-full shadow-2xl bg-principal bg-cover rounded-3xl">
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
                      NUTRITION PLAN
                    </h2>
                    {done ? (
                  <h3 className="font-bold text-2xl flex items-center text-green justify-center text-blueGray-700">
                  <BiCheckCircle  />  completed
                  </h3> 
                  ) : null}
                 {!done ? ( <h3 className="font-bold flex items-center text-2xl text-redc justify-center text-blueGray-700">
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
                  <CiCirclePlus size={"22px"} /> <h3> ADD MEAL</h3>
                </button>
              </div>
              {showModal ? <AddMeal onUpdate={updateModal} /> : null}
              <div className="block w-full p-6 space-y-3 overflow-x-auto">
                {meals.map((meal) => (
                  <div
                    key={meal._id}
                    className="bg-[#28282B] backdrop-blur-lg flex rounded-3xl pt-4 h-fit pb-4"
                  >
                    <div className=" w-full flex flex-col items-center justify-between">
                      <div className=" flex w-full h-fit items-center justify-between px-6 ">
                        <p className="text-start text-lg mb-2 uppercase ">
                          {meal.name}
                        </p>
                        <div className="flex space-x-2">
                          <button
                            className="text-white flex font-bold uppercase h-12 text-sm  py-3 rounded-2xl shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => {handleAddClick(meal._id)}}
                          >
                            <CiCirclePlus
                              className="text-white"
                              size={"22px"}
                            />
                            &nbsp; ADD &nbsp; |
                          </button>
                          <button
                            onClick={() => handleAddClickupdate(meal._id)}
                            className="text-white flex font-bold uppercase h-12 text-sm py-3 rounded-2xl shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                          >
                            <FaRegEdit className="text-white" size={"22px"} />
                            &nbsp; UPDATE &nbsp;|
                          </button>
                          <button
                           onClick={() => deleteMeal(meal._id)}
                            className="text-white flex font-bold uppercase h-12 text-sm  py-3 rounded-2xl shadow hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                          >
                            <AiTwotoneDelete
                              className=" text-white"
                              size={"22px"}
                            />
                            &nbsp; DELETE
                          </button>
                        </div>
                      </div>
                      <hr className="" />
                      {meal.showUpdate ? ( 
                  <UpdateMeal
                     className="mt-2" onUpdate={() => handleFormCancelupdate(meal._id)} mealid={meal._id} 
                     />
                  ) : null}
                       {meal.showForm ? (
                  <AddFood className="mt-2" handleIsLoading={handleIsLoading} onUpdate={() => handleFormCancel(meal._id)} mealid={meal._id} />
                  ) : null} 

                      <div className=" flex flex-col justify-center items-center px-6 w-full ">
                        <Food handleIsLoading={handleIsLoading}  mealid={meal._id} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>




{ isLoading === true &&  
<>
<Sprinner/>
</>
}





    </>
  );
};

export default DietCreation;
