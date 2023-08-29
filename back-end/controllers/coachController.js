const asyncHandler = require('express-async-handler') ; 
const { Client , Coach , User , Workout , WorkoutPlan , Exercice, DietPlan, Meal, Food } = require('../models/clientModel') ;
const jwt = require('jsonwebtoken') ; 
const bcrypt = require('bcryptjs') ; 
const Token = require('../models/tokenModel');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const mongoose = require('mongoose');
const { cloudinary } = require('../utils/cloudinary');
const { generateEmailWorkout } = require('../utils/EmailWorkoutvalid');
const { generateEmailDiet } = require('../utils/EmailDietvalid');

const generateToken = (id , role) => {
     return jwt.sign({id , role}, process.env.JWT_SECRET , {expiresIn: "1d"}) ;

}; 


/////////////////////// ADD WORKOUT TO THE WORKOUT PLAN ///////////////////////
const addWorkout = asyncHandler(async (req , res) => {

    const clientId = req.params.clientid ;
    const { name , day } = req.body; 


    const client = await Client.findById(clientId) ;
    /// verifier client exist 
    if (!client) {
        res.status(404) ; 
        throw new Error("Client Not Found") ;
      }

    const workoutPlan = await WorkoutPlan.findById(client.workoutPlan) ; 
    if (!workoutPlan) {
        res.status(404) ; 
        throw new Error("Workout Plan Not Found") ;      
    }

    const workout = await Workout.create({ name : name , day : day });
    if (workout) {
        res.status(201).json({
            workout , 
            message: 'Workout added to workout plan successfully'         
        }) ;
        workoutPlan.workouts.push(workout._id);
        await workoutPlan.save();
        
    }

});

/////////////////////// ADD EXERCICE TO THE WORKOUT ///////////////////////
const addExercice = asyncHandler(async (req , res) => {

    const workoutId = req.params.workoutid ;
    const { name, reps, sets, description, photo } = req.body; 

        
    const cdcFile = req.files && req.files.cdcFile ? req.files.cdcFile[0] : "";

    console.log(workoutId) ;
    const workout = await Workout.findById(workoutId) ;
    /// verifier client exist 
    if (!workout) {
        res.status(404) ; 
        throw new Error("Client Not Found") ;
      }

      const cdc = cdcFile ? await cloudinary.uploader.upload(cdcFile.path) : photo ;
      const cdcfile = cdc && cdc.secure_url && cdc.secure_url ;
      console.log(cdcfile) ; 

    const exercice = await Exercice.create({ name : name, reps : reps, sets : sets, description : description, photo : cdcfile  });
    if (exercice) {
        res.status(201).json({
            exercice , 
            message: 'Exercice added to workout successfully'         
        }) ;
        console.log(workout._id) ;
        workout.exercises.push(exercice._id);
        await workout.save();
        
    }
    console.log(exercice) ;

});

/////////////////////// DELETE EXERCICE FROM WORKOUT  ///////////////////////
const deleteExercice = asyncHandler(async (req , res) => {

    const exerciceId = req.params.exerciceid;
    const workoutId = req.params.workoutid;
    const exercise = await Exercice.findById(exerciceId);
    const workout = await Workout.findById(workoutId) ;

      if (!exercise) {
        return res.status(404).json({ message: 'Exercice non trouvé.' });
      }
      if (exercise) {
        console.log(exercise) ;
      await Exercice.deleteOne({ _id : exerciceId });
      await Workout.findByIdAndUpdate(
        workoutId,
        { $pull: { exercises: exerciceId } },
        { new: true }
      )
      res.status(200).json({ message: 'Exercice supprimé avec succès.' });
      }
});

/////////////////////// DELETE WORKOUT FROM WORKOUT PLAN ///////////////////////
const deleteWorkout = asyncHandler(async (req , res) => {

  const workoutId = req.params.workoutid;
  const workoutPlanId = req.params.workoutplanid;

  const workoutPlan = await WorkoutPlan.findById(workoutPlanId);
  const workout = await Workout.findById(workoutId) ;

    if (!workout) {
      return res.status(404).json({ message: 'workout non trouvé.' });
    }
    if (workout) {
    await Workout.deleteOne({ _id : workoutId });
    await Exercice.deleteMany({_id : { $in: workout.exercises } }) ;
    await WorkoutPlan.findByIdAndUpdate(
      workoutPlanId,
      { $pull: { workouts: workoutId } },
      { new: true }
    ) ;
    res.status(200).json({ message: 'workout supprimé avec succès.' });
    }
});

/////////////////////// MODIFIER WORKOUT ///////////////////////
const modifierworkout = asyncHandler(async (req , res) => {

const {name , day} = req.body ;
const id = req.params.workoutid ; 
console.log(id); 
const workout = await Workout.findById( id ) ; 
console.log(workout)
if (workout) {
workout.name = name || workout.name ;
workout.day = day || workout.day ; 
const updatedWorkout = await workout.save() ; 
res.status(200).json({
  _id : updatedWorkout._id ,
  name : updatedWorkout.name , 
  day: updatedWorkout.day , 
}) 
}else {
  res.status(404) ; 
  throw new Error("Workout Not Found") ;  
}

});

/////////////////////// MODIFIER EXERCICE ///////////////////////
const modifierExercice = asyncHandler(async (req , res) => {



  const {name , reps , sets , description} = req.body ;
  const cdcFile = req.files && req.files.cdcFile ? req.files.cdcFile[0] : "";

  const id = req.params.exerciceid ; 
  console.log(id); 
  const exercice = await Exercice.findById( id ) ; 

  const cdc = cdcFile ? await cloudinary.uploader.upload(cdcFile.path) : exercice.photo ;
  const cdcfile = cdc && cdc.secure_url ? cdc.secure_url : "";
  console.log(cdcfile) ; 

  if (exercice) {

    exercice.name = name || exercice.name ;
    exercice.reps = reps || exercice.reps;
    exercice.sets = sets || exercice.sets ;
    exercice.description = description || exercice.description ;
    exercice.photo = cdcfile || exercice.photo  ;

  const updatedExercice= await exercice.save() ; 
  res.status(200).json({
    _id : updatedExercice._id ,
    name : updatedExercice.name , 
    description: updatedExercice.description ,
    reps: updatedExercice.reps ,
    sets: updatedExercice.sets ,
    photo: updatedExercice.photo , 
  }) 
  }else {
    res.status(404) ; 
    throw new Error("Exercice Not Found") ;  
  }
  
  });

/////////////////////// GET EXERCICES ///////////////////////
const getExercices = asyncHandler(async (req , res) => {

  const workoutId = req.params.workoutid;
  const workout = await Workout.findById(workoutId) ;

  const exercices = [];  

if (workout) {   
  console.log(workout.exercises);
for (let i = 0; i < workout.exercises.length; i++) {
    exercices[i] = await Exercice.findById(workout.exercises[i]) ;
  }

  console.log(exercices) ;
  res.status(200).json(exercices);
}
else {
  res.status(400) ; 
  throw new Error("Workout Not Found") ;
}


}); 
  
/////////////////////// GET WORKOUTS ///////////////////////
const getWorkouts = asyncHandler(async (req , res) => {

  const workoutPlanId = req.params.workoutplanid;
  const workoutPlan = await WorkoutPlan.findById(workoutPlanId) ;

  const workouts = [];  

if (workoutPlan) {   
  console.log(workoutPlan.workouts);
for (let i = 0; i < workoutPlan.workouts.length; i++) {
  workouts[i] = await Workout.findById(workoutPlan.workouts[i]) ;
  }

  console.log(workouts) ;
  res.status(200).json(workouts);
}
else {
  res.status(400) ; 
  throw new Error("Workout plan Not Found") ;
}

}); 

/////////////////////// MAKE WORKOUTPLAN COMPLETED ///////////////////////
const modifierworkoutplan = asyncHandler(async (req , res) => {

  const workoutPlanId = req.params.workoutplanid;
  const workoutPlan = await WorkoutPlan.findById(workoutPlanId) ;
  const client = await Client.findOne({workoutPlan : workoutPlanId}) ; 
  console.log(client) ;
  const user = await User.findById(client.user) ; 
  console.log(user) ; 

if (workoutPlan) {   
 
  workoutPlan.completed = true ; 
  const updatedWorkouplan = await workoutPlan.save() ; 

  if (updatedWorkouplan) {
    const message = generateEmailWorkout () ;
  // const message = `
  //   <h2> HELLO , ${user.firstName}</h2>
  //   <p> Your Workout plan is completed you can check it</p>
  //   <p>Regards...</p>
  //   <p>FitNation Team</p>
  //   ` ;

    const subject = "You workout plan is completed" ;
    const send_to = user.email ;
    const sent_from = process.env.EMAIL_USER ;

    await sendEmail(subject, message, send_to, sent_from) ;
   
  }

res.status(200).json({
  _id : updatedWorkouplan._id ,
  completed : updatedWorkouplan.completed , 
}) 
}
else {
  res.status(400) ; 
  throw new Error("Workout plan Not Found") ;
}

}); 

/////////////////////// GET CLIENTS ///////////////////////
const getClients = asyncHandler(async (req , res) => {

  const user = await User.findById(req.user._id) ;
  const coach = await Coach.findById(user.coach) ;

  const clients = [];  

if (coach) {   
  console.log(coach.clients);
for (let i = 0; i < coach.clients.length; i++) {
  const obj1 = await Client.findById(coach.clients[i]) ;
  const obj2 = await User.findById(obj1.user) ; 
  const obj3 = await WorkoutPlan.findById(obj1.workoutPlan) ; 
  const obj4 = await DietPlan.findById(obj1.dietPlan) ; 
  clients[i] = Object.assign({
    _id : obj1._id,
    firstName : obj2.firstName , 
    lastName : obj2.lastName , 
    email : obj2.email ,
    photo : obj2.photo ,
    age : obj2.age ,
    gender :obj2.gender ,
    height : obj1.height ,
    weight : obj1.weight ,
    goal : obj1.goal,
    workoutPlan : obj1.workoutPlan,
    dietPlan : obj1.dietPlan,
    workoutcompleted : obj3.completed,
    dietcompleted : obj4.completed
  });
  }

  console.log(clients) ;
  res.status(200).json(clients);
}
else {
  res.status(400) ; 
  throw new Error("coach Not Found") ;
}

});

/////////////////////// DELETE CLIENT///////////////////////
const deleteClient = asyncHandler(async (req , res) => {

  const clientId = req.params.clientid;
  console.log(clientId) ;
  const userId = req.user._id ;
  console.log(userId) ;
  const user = await User.findById(userId);
  const coach = await Coach.findById(user.coach);
  const client = await Client.findById(clientId) ; 
  console.log(client) ;

    if (!client) {
      return res.status(404).json({ message: 'client non trouvé.' });
    }
    if (coach) {

      await Coach.findByIdAndUpdate(
        coach._id,
        { $pull: { clients: clientId } },
        { new: true }
      ) ;    

    await Client.findByIdAndUpdate(
      clientId,
      { $unset: { coach: 1 } },
      { new: true }
    ) ;
    res.status(200).json({ message: 'client supprimé avec succès.' });
    }else {
      res.status(400) ; 
      throw new Error("client Not Found") ;
    }
});


/////////////////////// GET WORKOUT COMPLETED ///////////////////////
const workoutplanStatus = asyncHandler(async (req , res) => {

  const workoutplanid = req.params.workoutplanid ;
  
  const workoutplan = await WorkoutPlan.findById(workoutplanid) ; 

if (workoutplan) {   

  console.log(workoutplan) ;
  res.status(200).json({completed : workoutplan.completed});
}
else {
  res.status(400) ; 
  throw new Error("workoutplan Not Found") ;
}

}); 

/////////////////////// CALCULE MACROS ///////////////////////
const calculeMacros = asyncHandler(async (req , res) => {

  const { weight , height , age , gender, activity , goal } = req.body ; 

  
  let carbs , fat , protein ; 
  var BMR;
  var calories;

    if (gender === "Male") {
      BMR = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
      
    } else if (gender === "Female") {
      BMR = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }
    console.log("BMR :" + BMR);
  
    ///////////// calories //////////////
   
    if (activity === "Light") {
      calories = BMR * 1.375;
      
    } else if (activity === "Moderate") {
      calories = BMR * 1.55;
      
    } else if (activity === "Active") {
      calories = BMR * 1.725;
      
    } else if (activity === "Very Active") {
      calories = BMR * 1.9;
    }
    console.log("calories :" + calories);


    if  (goal === "Lean muscle gain") {
      carbs = calories * 0.5/4;
      protein = calories * 0.25/4;
      fat = calories * 0.25/9;

    } 
    else if (goal === "Weight loss") {
      carbs = calories*0.3/4;
      protein = calories*0.5/4;
      fat = calories*0.2/9;

    } 
    else if (goal === "Maintain weight") {
      carbs = calories * 0.4/ 4;
      protein = calories * 0.35/4;
      fat = calories * 0.25/9;
    } 
    else if (goal === "Get shredded") {
      carbs = (calories * 0.2) / 4;
      protein = (calories * 0.6) / 4;
      fat = (calories * 0.2) / 9;

    } 

    res.status(200).json({carbs , fat , protein});

});


/******************************************************** DIET PART ***********************************************************************/


/////////////////////// ADD MEAL TO THE DIET PLAN ///////////////////////
const addMeal = asyncHandler(async (req , res) => {

  const clientId = req.params.clientid ;
  const { name } = req.body; 


  const client = await Client.findById(clientId) ;
  /// verifier client exist 
  if (!client) {
      res.status(404) ; 
      throw new Error("Client Not Found") ;
    }

  const dietPlan = await DietPlan.findById(client.dietPlan) ; 
  if (!dietPlan) {
      res.status(404) ; 
      throw new Error("Diet Plan Not Found") ;      
  }

  const meal = await Meal.create({ name : name });
  if (meal) {
      res.status(201).json({
          meal , 
          message: 'Meal added to workout plan successfully'         
      }) ;
      dietPlan.meals.push(meal._id);
      await dietPlan.save();
      
  }

});

/////////////////////// ADD DOOD TO THE MEAL ///////////////////////
const addFood = asyncHandler(async (req , res) => {

  const mealId = req.params.mealid ;
  const { name, quantite, description, photo } = req.body; 

  const cdcFile = req.files && req.files.cdcFile ? req.files.cdcFile[0] : "";

  console.log(mealId) ;
  const meal = await Meal.findById(mealId) ;
  /// verifier client exist 
  if (!meal) {
      res.status(404) ; 
      throw new Error("meal Not Found") ;
    }

    const cdc = cdcFile ? await cloudinary.uploader.upload(cdcFile.path) : photo ;
    const cdcfile = cdc && cdc.secure_url && cdc.secure_url ;
    console.log(cdcfile) ; 


  const food = await Food.create({ name : name, quantite : quantite, description : description, photo : cdcfile  });
  if (food) {
      res.status(201).json({
          food , 
          message: 'Food added to workout successfully'         
      }) ;
      console.log(meal._id) ;
      meal.foods.push(food._id);
      await meal.save();
      
  }
  console.log(food) ;

});

/////////////////////// DELETE FOOD FROM DIET  ///////////////////////
const deleteFood = asyncHandler(async (req , res) => {

  const foodId = req.params.foodid;
  const mealId = req.params.mealid;
  const food = await Food.findById(foodId);
  const meal = await Meal.findById(mealId) ;

    if (!food) {
      return res.status(404).json({ message: 'food non trouvé.' });
    }
    if (food) {
      console.log(food) ;
    await Food.deleteOne({ _id : foodId });
    await Meal.findByIdAndUpdate(
      mealId,
      { $pull: { foods: foodId } },
      { new: true }
    )
    res.status(200).json({ message: 'Food supprimé avec succès.' });
    }
});

/////////////////////// DELETE WORKOUT FROM WORKOUT PLAN ///////////////////////
const deleteMeal = asyncHandler(async (req , res) => {

  const mealId = req.params.mealid;
  const dietPlanId = req.params.dietplanid;

  const dietPlan = await DietPlan.findById(dietPlanId);
  const meal = await Meal.findById(mealId) ;

    if (!meal) {
      return res.status(404).json({ message: 'meal non trouvé.' });
    }
    if (meal) {
    await Meal.deleteOne({ _id : mealId });
    await Food.deleteMany({_id : { $in: meal.foods } }) ;
    await DietPlan.findByIdAndUpdate(
      dietPlanId,
      { $pull: { meals: mealId } },
      { new: true }
    ) ;
    res.status(200).json({ message: 'meal supprimé avec succès.' });
    }
});

/////////////////////// MODIFIER MEAL ///////////////////////
const modifierMeal = asyncHandler(async (req , res) => {

  const {name} = req.body ;
  const id = req.params.mealid ; 
  console.log(id); 
  const meal = await Meal.findById( id ) ; 
  console.log(meal)
  if (meal) {
  meal.name = name ;
  const updatedMeal = await meal.save() ; 
  res.status(200).json({
    _id : updatedMeal._id ,
    name : updatedMeal.name , 
  }) 
  }else {
    res.status(404) ; 
    throw new Error("Meal Not Found") ;  
  }
  
  });

/////////////////////// MODIFIER FOOD ///////////////////////
const modifierFood = asyncHandler(async (req , res) => {

  const {name , quantite , description } = req.body ;
  const cdcFile = req.files && req.files.cdcFile ? req.files.cdcFile[0] : ""; 

  const id = req.params.foodid ; 
  console.log(id); 
  const food = await Food.findById( id ) ; 

  const cdc = cdcFile ? await cloudinary.uploader.upload(cdcFile.path) : food.photo ;
  const cdcfile = cdc && cdc.secure_url ? cdc.secure_url : "";
  console.log(cdcfile) ; 

  console.log(food) ; 
  if (food) {
    food.name = name || food.name ;
    food.quantite = quantite || food.quantite ;
    food.description = description || food.description ;
    food.photo = cdcfile || food.photo ;

  const updatedFood= await food.save() ; 
  res.status(200).json({
    _id : updatedFood._id ,
    name : updatedFood.name , 
    description: updatedFood.description ,
    quantite: updatedFood.quantite ,
    photo: updatedFood.photo , 
  }) 
  }else {
    res.status(404) ; 
    throw new Error("Food Not Found") ;  
  }
  
  });

/////////////////////// MAKE DIET PLAN COMPLETED ///////////////////////
const modifierdietplan = asyncHandler(async (req , res) => {

  const dietPlanId = req.params.dietplanid;
  const dietPlan = await DietPlan.findById(dietPlanId) ;
  const client = await Client.findOne({dietPlan : dietPlanId}) ; 
  console.log(client) ;
  const user = await User.findById(client.user) ; 
  console.log(user) ; 

if (dietPlan) {   
 
  dietPlan.completed = true ; 
  const updateddietplan = await dietPlan.save() ; 

  if (updateddietplan) {
const message = generateEmailDiet () ;
   

    // const message = `
    //   <h2> HELLO , ${user.firstName}</h2>
    //   <p> Your Diet plan is completed you can check it</p>
    //   <p>Regards...</p>
    //   <p>FitNation Team</p>
    //   ` ;
  
      const subject = "You diet plan is completed" ;
      const send_to = user.email ;
      const sent_from = process.env.EMAIL_USER ;
  
      await sendEmail(subject, message, send_to, sent_from) ;
     
    }

  

res.status(200).json({
  _id : updateddietplan._id ,
  completed : updateddietplan.completed , 
}) 
}
else {
  res.status(400) ; 
  throw new Error("diet plan Not Found") ;
}

}); 

/////////////////////// GET DIET COMPLETED ///////////////////////
const dietplanStatus = asyncHandler(async (req , res) => {

  const dietplanid = req.params.dietplanid ;
  
  const dietplan = await DietPlan.findById(dietplanid) ; 

if (dietplan) {   

  console.log(dietplan) ;
  res.status(200).json({completed : dietplan.completed});
}
else {
  res.status(400) ; 
  throw new Error("dietplan Not Found") ;
}

}); 

/////////////////////// GET FOODS ///////////////////////
const getFoods = asyncHandler(async (req , res) => {

  const mealId = req.params.mealid;
  const meal = await Meal.findById(mealId) ;

  const foods = [];  

if (meal) {   
  console.log(meal.foods);
for (let i = 0; i < meal.foods.length; i++) {
    foods[i] = await Food.findById(meal.foods[i]) ;
  }

  console.log(foods) ;
  res.status(200).json(foods);
}
else {
  res.status(400) ; 
  throw new Error("Meal Not Found") ;
}


}); 

/////////////////////// GET MEALS ///////////////////////
const getMeals = asyncHandler(async (req , res) => {

  const dietPlanId = req.params.dietplanid;
  const dietPlan = await DietPlan.findById(dietPlanId) ;

  const meals = [];  

if (dietPlan) {   
  console.log(dietPlan.meals);
for (let i = 0; i < dietPlan.meals.length; i++) {
  meals[i] = await Meal.findById(dietPlan.meals[i]) ;
  }

  console.log(meals) ;
  res.status(200).json(meals);
}
else {
  res.status(400) ; 
  throw new Error("Meal plan Not Found") ;
}

}); 


/////////////////////// GET PRICE ///////////////////////
const getPrice = asyncHandler(async (req , res) => {

const userid = req.user._id ; 
const user = await User.findById(userid);
console.log(user) ;

const coach = await Coach.findById(user.coach);

console.log(coach) ;

if (coach) {
  res.status(200).json({price:coach.price});
}else {
  res.status(400) ; 
  throw new Error("Coach not found") ;
}

}); 


/////////////////////// GET CLIENTS NUMBER ///////////////////////
const getClientsNumber = asyncHandler(async (req , res) => {

  const userid = req.user._id ; 
  const user = await User.findById(userid);
  console.log(user) ;
  const coach = await Coach.findById(user.coach);

  const clients = coach.clients ; 
  const clientsNumber = clients.length ;
  console.log(clientsNumber) ;
  
  if (coach) {
    res.status(200).json({clientsNumber: clientsNumber});
  }else {
    res.status(400) ; 
    throw new Error("Coach not found") ;
  }
  }); 

  /////////////////////// GET PLANS STATUS ///////////////////////
const getPlansStatus = asyncHandler(async (req , res) => {


  const user = await User.findById(req.user._id) ;
  const coach = await Coach.findById(user.coach) ;

  const clients = [];  
  let completed = 0 ; 
  let noCompleted = 0 ; 

if (coach) {   
  console.log(coach.clients);
for (let i = 0; i < coach.clients.length; i++) {
  const obj1 = await Client.findById(coach.clients[i]) ;
  const obj2 = await DietPlan.findById(obj1.dietPlan) ; 
  const obj3 = await WorkoutPlan.findById(obj1.workoutPlan) ; 

if (obj2.completed  && obj3.completed ) {
  completed++ ; 
}else if (!obj2.completed || !obj3.completed) {
 noCompleted++ ;  
}
}

  console.log(clients) ;
  res.status(200).json({completed : completed , noCompleted : noCompleted});
}
else {
  res.status(400) ; 
  throw new Error("coach Not Found") ;
}
  }); 


  /////////////////////// MODIFIER PRICE ///////////////////////
const modifierPrice = asyncHandler(async (req , res) => {

  const {price} = req.body ;
  const userid = req.user._id ; 
  const user = await User.findById(userid);
  console.log(user) ;
  
  const coach = await Coach.findById(user.coach);


  if (coach) {
    coach.price = price || coach.price ;
  const updatedCoach = await coach.save() ; 
  res.status(200).json({
    price : updatedCoach.price , 
  }) 
  }else {
    res.status(404) ; 
    throw new Error("Coach Not Found") ;  
  }
  
  });



    /////////////////////// MODIFIER BIO ///////////////////////
const modifierBio = asyncHandler(async (req , res) => {

  const {bio} = req.body ;
  const userid = req.user._id ; 
  const user = await User.findById(userid);
  console.log(user) ;
  
  const coach = await Coach.findById(user.coach);


  if (coach) {
   if (bio && bio !== coach.bio) {
    coach.bio = bio || coach.bio ;
    const updatedCoach = await coach.save() ; 
    res.status(200).json({
      bio : updatedCoach.bio , 
    })  
   }else {
    res.status(404) ; 
    throw new Error("You didn't write any text ") ;  
   }

  }else {
    res.status(404) ; 
    throw new Error("Coach Not Found") ;  
  }
  
  });


  /////////////////////// GET PRICE ///////////////////////
const getBio = asyncHandler(async (req , res) => {

  const userid = req.user._id ; 
  const user = await User.findById(userid);
  console.log(user) ;
  
  const coach = await Coach.findById(user.coach);
  
  console.log(coach) ;
  
  if (coach) {
    res.status(200).json({bio:coach.bio});
  }else {
    res.status(400) ; 
    throw new Error("Coach not found") ;
  }
  
  }); 

/////////////////////// GET TRANSFORMATIONS ///////////////////////
const getTransformations = asyncHandler(async (req , res) => {

  const user = await User.findById(req.user._id) ;
  const coach = await Coach.findById(user.coach) ;

  const transformations = [];  

if (coach) {   
if (coach.transformations) {
  for (let i = 0; i < coach.transformations.length; i++) {
    transformations[i] = coach.transformations[i] ;
    }
  /// console.log(clients) ;
    res.status(200).json(transformations);
}else {
  res.status(400) ; 
  throw new Error("No transformations exist");
}
}
else {
  res.status(400) ; 
  throw new Error("coach Not Found") ;
}

});


/////////////////////// ADD EXERCICE TO THE WORKOUT ///////////////////////
const addTransformation = asyncHandler(async (req , res) => {

  const user = await User.findById(req.user._id) ;
  const coach = await Coach.findById(user.coach) ; 
      
  const cdcFile = req.files && req.files.cdcFile ? req.files.cdcFile[0] : "";

  /// verifier client exist 

    const cdc = cdcFile ? await cloudinary.uploader.upload(cdcFile.path) : photo ;
    const cdcfile = cdc && cdc.secure_url ? cdc.secure_url : "";
    console.log(cdcfile) ; 

  if (coach) {
    coach.transformations.push(cdcfile);
    await coach.save();
      res.status(201).json({
          message: 'Transformation added successfully'         
      }) ;   
  }else {
    
      res.status(404) ; 
      throw new Error("coach Not Found") ;
    
  }


});


/////////////////////// DELETE TRANSFORMATION ///////////////////////
const deleteTransformation = asyncHandler(async (req , res) => {

  const Image = req.params.image;
  //console.log(indexImage) ;
  const userId = req.user._id ;
  console.log(userId) ;
  const user = await User.findById(userId);
  const coach = await Coach.findById(user.coach);


    if (!coach) {
      return res.status(404).json({ message: 'coach non trouvé.' });
    }
    if (coach) {

      await Coach.findByIdAndUpdate(
        coach._id,
        { $pull: { transformations : coach.transformations[Image] } },
        { new: true }
      ) ;    

    res.status(200).json({ message: 'photo has deleted.' });
    }else {
      res.status(400) ; 
      throw new Error("client Not Found") ;
    }
});



module.exports =  {
    addWorkout, 
    addExercice,
    deleteExercice,
    deleteWorkout,
    modifierworkout,
    modifierExercice ,
    getExercices,
    getWorkouts ,
    getClients ,
    deleteClient,
    modifierworkoutplan,
    workoutplanStatus,
    addMeal,
    addFood,
    deleteFood,
    deleteMeal,
    modifierMeal,
    modifierFood,
    modifierdietplan,
    dietplanStatus,
    getFoods,
    getMeals,
    getPrice, 
    getPlansStatus,
    getClientsNumber,
    modifierPrice,
    modifierBio,
    getBio,
    calculeMacros,
    getTransformations, 
    addTransformation,  
    deleteTransformation
}