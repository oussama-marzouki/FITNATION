import React, { useEffect, useState } from 'react'
import { AiTwotoneDelete } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'
import { axiosCoach } from '../util/axios-config';
import UpdateFood from './UpdateFood';

const Food = (props) => {

    const [foods, setFoods] = useState([]);
    const [showModal, setShowModal] = useState(false);

   const handleIsLoading = (data)  => 
   { 
      props.handleIsLoading(data) ;
    } 

    useEffect(() => {
      getFoods();

    }, []);
  
    const getFoods = async () => {
      try {
        const response = await axiosCoach.get(`/getfoods/${props.mealid}`);
        setFoods(response.data);
        // console.log(foods);
      } catch (err) {
        console.log(err);
      }
    };

    const deleteFood = async (id) => {
      // e.preventDefault() ;
      try {
        await axiosCoach.delete(
          `/deletefood/food/${id}/meal/${props.mealid}`
        );
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    };
  

        ///////////////////////////////////////////////////////////////////////////


        function handleAddClick(id) {

          const updatedFoods = foods.map((food) =>
          food._id === id ? { ...food, showForm: true } : food
          );
          console.log(updatedFoods) ;
          setFoods(updatedFoods);
        }
      
        // function handleFormSubmit(id, duration) {
        //   const updatedWorkouts = workouts.map((workout) =>
        //     workout.id === id ? { ...workout, duration: workout.duration + duration, showForm: false } : workout
        //   );
        //   setWorkouts(updatedWorkouts);
        // }
      
        function handleFormCancel(id) {
          const updatedFoods = foods.map((food) =>
          food._id === id ? { ...food, showForm: false } : food
          );
          setFoods(updatedFoods);
        }
      
        ///////////////////////////////////////////////////////////////////////////

  return (
    <>
     
     {foods.map((food) => ( 
    
        <div
          key={food._id}
          className=" flex flex-col text-black shadow-2xl  justify-between items-center rounded-2xl w-full "
        >
          <div className=" flex text-black shadow-2xl bg-principal justify-between items-center  rounded-2xl px-4 mt-3 w-full">
            <div className="flex w-1/4 items-center p-1 ">
              <img
                src={food.photo}
                className="h-14 w-14 rounded-full border bg-white p-1"
                alt="..."
              />
              <span className="ml-3 font-bold ">
                {food.name} 
                </span>
            </div>
            <div className="  w-1/6 text-start"> 
              {food.quantite} 
               </div>

            <div className="   w-1/6 text-start">
              <h2>
  
      {food.description}
               </h2>
            </div>
            <div className="flex space-x-2 items-center justify-center mt-1">
              <button
                onClick={() => {
                  // handleAddClick(food._id) ;
                  if(food.showForm === false || !food.showForm ) {
                    handleAddClick(food._id) ;
                    //  setShowModal(true);       
                  }else {
                    //  setShowModal(false); 
                    handleFormCancel(food._id) ;
                   }
                }}
                className="text-white flex font-bold uppercase h-12 text-sm py-3 rounded-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                <FaRegEdit className=" text-black" size={"22px"} />
              </button>
              <button
                onClick={() => deleteFood(food._id)}
                className="text-white flex font-bold uppercase h-12 text-sm  py-3 rounded-2xl outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                <AiTwotoneDelete className=" text-black" size={"22px"} />
              </button>
            </div>
          </div>
          {/* && exercice.showForm */}
          {food.showForm ? <div className=" flex text-black shadow-2xl bg-white justify-between items-center rounded-2xl px-4 mt-3 mb-3 w-full"> <UpdateFood handleIsLoading={handleIsLoading} onUpdate={() => handleFormCancel(food._id)} foodid={food._id} /> </div> : null}
          </div>    
      ))} 
    </>
  )
}

export default Food
