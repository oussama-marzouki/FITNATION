import React, { useEffect, useState } from "react";
import SideBar from "../../Components/SideBar";
import { FaNutritionix } from "react-icons/fa";
import { axiosCoach } from "../../util/axios-config";
import Result from "../../Components/Result";
import { toast } from "react-toastify";

const Macros = () => {
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const [activity, setActivity] = useState();
  const [goal, setGoal] = useState("");

  const [protein, setProtein] = useState();
  const [carbs, setCarbs] = useState();
  const [fat, setFat] = useState();

//  const calculeMacros = async (event) => { 
//   event.preventDefault();

//     const response = await axiosCoach.get('/calculemacros');
//     console.log(response.data.carbs) ;
  
// };

const calculateMacros = (e , weight, height, age, gender, activityFactor, objectives) => {
  e.preventDefault() ; 

  // Calculate BMR based on Harris-Benedict Equation
  let bmr;    //
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else if (gender === 'female') {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  } else {
    console.log('Invalid gender!');
    return;
  }

  // Calculate daily calorie needs based on activity factor
  const calorieNeeds = bmr * activityFactor;

  // Determine macronutrient ratios based on objectives
  let proteinRatio, carbRatio, fatRatio;
  switch (objectives) {
    case 'weightLoss':
      proteinRatio = 0.35;
      carbRatio = 0.45;
      fatRatio = 0.20;
      break;
    case 'muscleGain':
      proteinRatio = 0.25;
      carbRatio = 0.40;
      fatRatio = 0.35;
      break;
    case 'maintenance':
      proteinRatio = 0.25;
      carbRatio = 0.50;
      fatRatio = 0.25;
      break;
    case 'custom':
      // Define your own custom macronutrient ratios here
      // Make sure proteinRatio + carbRatio + fatRatio = 1
      break;
    default:
      console.log('Invalid objectives!');
      return;
  }

  // Calculate macros
  const protein = (calorieNeeds * proteinRatio) / 4; // 4 calories per gram of protein
  const carbs = (calorieNeeds * carbRatio) / 4; // 4 calories per gram of carbohydrate
  const fat = (calorieNeeds * fatRatio) / 9; // 9 calories per gram of fat
console.log(protein , carbs) ;
setProtein(protein.toFixed(2)) ; 
setCarbs(carbs.toFixed(2)); 
setFat(fat.toFixed(2));
  // Return the result as an object
  // return {
  //   protein: protein.toFixed(2), // Round to 2 decimal places
  //   carbs: carbs.toFixed(2),
  //   fat: fat.toFixed(2)
  // };

}



  return (
    <div className="flex ">
      <SideBar />
      <div className="w-[600px] px-10 py-9 space-y-3 mt-8 rounded-2xl bg-macros ml-72 shadow-2xl shadow-gray">
        <form className=" w-full" onSubmit={(e) => {
          if (weight && height && age && goal && gender && activity) {          
          calculateMacros(e, weight , height , age , gender , activity , goal) ;
        } else { 
          toast.error("fill in all the fields") ; 
        }
          }}>
          <div className="flex flex-col w-full items-start gap-6">
            <div className="flex space-x-4 w-full space-y-2 items-center justify-center">
              <FaNutritionix size={"45px"} color="white" className="" />
              <h1 className=" font-extrabold text-3xl h-9 text-white font-poppins ">
                Macros Calculator
              </h1>
            </div>
            <div className="mt-4 w-full grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Weight"
                    name="weight"
                    id="first-name"
                    onChange={(e) => setWeight(e.target.value)}
                    className="block w-full text-xs placeholder:text-sm rounded-2xl border-0 py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Height"
                    name="height"
                    id="last-name"
                    onChange={(e) => setHeight(e.target.value)}
                    className="block w-full rounded-2xl border-0 py-1.5 pl-2 text-xs placeholder:text-sm text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <input
                    type="Number"
                    name="age"
                    placeholder="Age"
                    id="first-name"
                    onChange={(e) => setAge(e.target.value)}
                    className="block w-full rounded-2xl text-xs placeholder:text-sm border-0 py-1.5 pr-2 pl-2 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <div className="mt-2">
                  <select
                    name="gender"
                     onChange={(e) => setGender(e.target.value)}
                    className="block w-full rounded-2xl border-0 py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="none" selected disabled hidden>
                      Gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-full">
                <div className="mt-2">
                  <select
                    name="activity"
                    id="last-name"
                    onChange={(e) => setActivity(e.target.value)}
                    className="block w-full rounded-2xl border-0 py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="none" selected disabled hidden>
                  Daily activity
                </option>
                    <option value={1.4}>
                      Light : exercice 1-3 times/week
                    </option>
                    <option value={1.6}>
                      Moderate : exercice 4-5 tiems/week
                    </option>
                    <option value={1.7}>
                      Active : daily exercice or intense exercice 3-4 tiems/week
                    </option>
                    <option value={1.9}>
                      Very Active : intense exercices 6-7 tiems/week
                    </option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-full">
                <div className="mt-2">
                  <select
                    name="goal"
                    id="first-name"
                    onChange={(e) => setGoal(e.target.value)}
                    className="block w-full rounded-2xl border-0 py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="none" selected disabled hidden>
                  Goal
                </option>
                    <option value="muscleGain" >lean muscle gain</option>
                    <option value="weightLoss" >weight loss</option>
                    <option value="maintenance" >maintain weight</option>

                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-9 flex items-center justify-center gap-x-6">
            {/* <button
              type="submit"
              className="rounded-md bg-indigo-600 bg-principal px-3 py-2 text-lg w-40 font-bold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Calculate
            </button> */}
            {weight && height && age && goal && gender && activity ?  
            <Result protein={protein} fat={fat} carbs={carbs} />
            : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Macros;
