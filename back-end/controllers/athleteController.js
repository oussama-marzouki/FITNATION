const asyncHandler = require('express-async-handler') ; 
const { Client , Coach , User , Workout , WorkoutPlan , Exercice, DietPlan, Meal, Food } = require('../models/clientModel') ;
const jwt = require('jsonwebtoken') ; 
const bcrypt = require('bcryptjs') ; 
const Token = require('../models/tokenModel');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const mongoose = require('mongoose');
const cloudinary = require('../utils/cloudinary');
const axios = require("axios") ; 

const generateToken = (id , role) => {
     return jwt.sign({id , role}, process.env.JWT_SECRET , {expiresIn: "1d"}) ;

}; 

/////////////////////// GET WORKOUTS ///////////////////////
const getWorkouts = asyncHandler(async (req , res) => {

      
    const client = await Client.findById(req.user.client) ; 
    console.log(client); 
    const workoutPlan = await WorkoutPlan.findById(client.workoutPlan) ;
  
    const workouts = [];  
  
  if (workoutPlan && workoutPlan.completed) {   
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

  /////////////////////// GET MEALS ///////////////////////
const getMeals = asyncHandler(async (req , res) => {

      
  const client = await Client.findById(req.user.client) ; 
  console.log(client); 
  const dietPlan = await DietPlan.findById(client.dietPlan) ;

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
  throw new Error("Diet plan Not Found") ;
}

});
  
  
/////////////////////// GET COACH INFOS //////////////////////////////
const getCoach = asyncHandler(async (req , res) => {

  const client = await Client.findById(req.user.client) ; 
  const coach = await Coach.findById(client.coach) ; 
  console.log(coach.price) ;
  const user = await User.findById(coach.user) ;

  if (coach) {
    res.status(200).json({ id : coach._id, firstName: user.firstName, lastName: user.lastName, bio: coach.bio , photo: user.photo , price: coach.price , rating : coach.totalrating , ratesnumber : coach.ratings.length });
  }else {
    res.status(400) ; 
    throw new Error("Coaches not found") ;
  }
      

});

/////////////////////// GET COACHS //////////////////////////////
const getCoaches = asyncHandler(async (req , res) => {


  var coachesless = []; 
  var coaches = []; 
  var users = []; 

  coachesless = await Coach.find() ; 
  users = await User.find({role:'coach'}) ;
  console.log(users) ;

  if (coachesless ) {
    for (let i = 0; i < coachesless.length; i++) {
      coaches[i] = { 
        coach: coachesless[i], 
        user: users[i] , 
        ratesnumber : coachesless[i].ratings.length  };
      }
    res.status(200).json(coaches);
    console.log(coaches) ;
  }else {
    res.status(400) ; 
    throw new Error("Coaches not found") ;
  }
 
});

/////////////////////// COACH EXIST //////////////////////////////
const getCoachexist = asyncHandler(async (req , res) => {

  const userid = req.user._id ;
  console.log(userid) ;

  const user = await User.findOne(userid) ;

  const client = await Client.findById(user.client) ; 

if (client.coach) {
  res.status(200).json({exist : true});
}else {
  res.status(200).json({exist : false});
}
 
});

///////////////////////  CLIENT INCRIT ///////////////////////

const inscription = asyncHandler(async (req , res) => {

  const coachId = req.params.coachid ; 
  console.log(coachId) ;
  const {height , weight , goal } = req.body ; 
  const user = await User.findById(req.user._id) ;
  const client = await Client.findById(user.client) ; 
  const coach = await Coach.findById(coachId) ; 

console.log("___________________________________________") ;

  if(client.coach) {
   const coach1 = await Coach.findById(client.coach) ; 
 //console.log(client.coach) ;
 
 const update = await Coach.findByIdAndUpdate(
        coach1._id,
        { $pull: { clients : client._id} },{ new: true }
      );

      //console.log(update) ;
}
  if (coach) {
//console.log(coach) ;
     client.coach =  coach._id ; 
     client.weight = weight ; 
     client.height = height ; 
     client.goal = goal ; 

    //console.log("aaaaaaaaaaaaaaa");
      coach.clients.push(client._id) ;
      const updatedClient = await client.save() ; 

      //console.log("hhhhhhhhhhhhhh");
      //console.log(updatedClient) ;
      const updatedCoach = await coach.save() ; 

      const workoutplan = await WorkoutPlan.findById(client.workoutPlan) ; 
     // console.log(workoutplan) ;
      let workouts = [] ;
      workouts = workoutplan.workouts ;
      console.log(workouts) ;
      // const exercices = [] ; 

      for (let i = 0; i < workouts.length; i++) {

        const workout = await Workout.findById(workouts[i]) ;

        for (let j = 0; j < workout.exercises.length; j++){


          await Exercice.findByIdAndDelete(workout.exercises[j] ) ;
          await Workout.findByIdAndUpdate(
            workouts[i]._id,
            { $pull: { exercises: workout.exercises[j]} },
            { new: true }

          ) ;

        }
        await Workout.findByIdAndDelete(workouts[i]._id) ;
        await WorkoutPlan.findByIdAndUpdate(
          workoutplan._id,
          { $pull: { workouts: workouts[i]} },
          { new: true }
        ) ;

      }
      workoutplan.completed = false ; 
      workoutplan.save() ; 

      ///////////////////////////// diet ///////////////////////


    const dietPlan = await DietPlan.findById(client.dietPlan) ; 
      console.log(dietPlan) ;
      let meals = [] ;
      meals = dietPlan.meals ;
      console.log(meals) ;
      // const exercices = [] ; 

      for (let i = 0; i < meals.length; i++) {

        const meal = await Meal.findById(meals[i]) ;

        for (let j = 0; j < meal.foods.length; j++){


          await Food.findByIdAndDelete(meal.foods[j] ) ;
          await Meal.findByIdAndUpdate(
            meals[i]._id,
            { $pull: { foods: meal.foods[j]} },
            { new: true }

          ) ;

        }
        await Meal.findByIdAndDelete(meals[i]._id) ;
        await DietPlan.findByIdAndUpdate(
          dietPlan._id,
          { $pull: { meals: meals[i]} },
          { new: true }
        ) ;

      }
      dietPlan.completed = false ; 
      dietPlan.save() ; 

 
      res.status(200).json({ message : 'Inscription terminer'  })
  } else {
    res.status(404) ; 
    throw new Error("Coach Not Found") ; 
  }

});


/////////////////////// PAYEMENT //////////////////////////////
const Add = asyncHandler(async (req , res) => {

const url = 'https://developers.flouci.com/api/generate_payment'
const payload = {
  "app_token": "fe947fb1-4c5c-4c6e-9468-4550ba11b4ad", 
  "app_secret": process.env.FLOUCI_SECRET ,
  "amount": req.body.amount,
  "accept_card": "true",
  "session_timeout_secs": 1200,
  "success_link": `http://localhost:3000/inscription/${req.body.id}`,
  "fail_link": "http://localhost:3000/failedpayement",
  "developer_tracking_id": "2490cb2a-4d37-412e-8fd7-e1a9df6c865f"
}

await axios.post(url , payload)
.then(result => res.send(result.data))
.catch(err => console.error(err));

});

/////////////////////// VERIFIER PAYEMENT //////////////////////////////
const Verifier = asyncHandler(async (req , res) => {

  const id_payement = req.params.id ;
  const url = `https://developers.flouci.com/api/verify_payment/${id_payement}`
  
  await axios.get(url , { headers: {
    'Content-Type': 'application/json',
    'apppublic': 'fe947fb1-4c5c-4c6e-9468-4550ba11b4ad',
    'appsecret': process.env.FLOUCI_SECRET
  }})
  .then(result => res.send(result.data))
  .catch(err => console.error(err));

  });

/////////////////////// GET TRANSFORMATIONS ///////////////////////
const getCoachTransformations = asyncHandler(async (req , res) => {

 // const user = await User.findById(req.params.coachid) ;
 console.log(req.params.coachid) ;
  const coach = await Coach.findById(req.params.coachid) ;

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

// }); 

/////////////////////// SET COACH RATE //////////////////////////////
const setRate = asyncHandler(async (req , res) => {

const userid = req.user._id ; 
const coachid = req.params.coachid ;
const { star } = req.body ; 

const user = await User.findById(userid) ;  

const client = await Client.findById(user.client) ; 
//console.log(client._id) ;


const coach = await Coach.findById(coachid) ; 
if (coach) {

  const foundObject = coach.ratings.find(obj => obj.postedby.toString() === client._id.toString());


    if (foundObject) {

      for (let i = 0; i < coach.ratings.length; i++) {
        if (coach.ratings[i].postedby.equals(client._id)) {
          coach.ratings[i].star = star ; 
        }        
      }      
    }
   
    else{
      //   await Coach.findByIdAndUpdate(
      //   coachid,
      //   { $push: { ratings: { 
      //     star : star , 
      //     postedby : client._id 
      //   }}
      //  },
      //   { new: true }
      // ) ;    
      console.log("hahahahaha") ;
      coach.ratings.push({
        star : star , 
        postedby : client._id 
      }) ; 
  
    }
    await coach.save() ;

    var total = 0 ;

    for (let i = 0; i < coach.ratings.length; i++) {
     total += coach.ratings[i].star ;   
    }

    console.log(total) ;
    coach.totalrating = Math.round(total / coach.ratings.length) ; 
    await coach.save() ;

    res.status(200).json(" all updates maked");
  
}else {
  res.status(400) ; 
  throw new Error("Coach not found") ;
}

});


/////////////////////// SET COACH RATE //////////////////////////////
const getRate = asyncHandler(async (req , res) => {

  const userid = req.user._id ; 
  const coachid = req.params.coachid ;
  
  const user = await User.findById(userid) ;  
  
  const client = await Client.findById(user.client) ; 
  //console.log(client._id) ;
  
  
  const coach = await Coach.findById(coachid) ; 
  if (coach) {
  
    const foundObject = coach.ratings.find(obj => obj.postedby.toString() === client._id.toString());
    let rate ; 
  
      if (foundObject) {
  
        for (let i = 0; i < coach.ratings.length; i++) {
          if (coach.ratings[i].postedby.equals(client._id)) {
            console.log("hahah") ; 
            rate = coach.ratings[i].star ;  
          }
                  
        }
             
      } else {
    rate = 0 ; 
  }

  res.status(200).json({rate : rate });

  
} else {
  res.status(400) ; 
  throw new Error("Coach not found") ;
}
  });
  


module.exports =  {
    getWorkouts,
    getCoach,
    getCoaches,
    getMeals,
    getCoachexist,
    inscription,
    Add,
    getCoachTransformations,
    Verifier , 
    setRate , 
    getRate ,
     
    
}