const express = require('express');
// const { registerUser , loginUser, logoutUser, getClient, loginStatus, updateUser, changePassword, forgotPassword, resetPassword } = require('../controllers/clientController');
const protect = require('../middleWare/authMiddleware');
const { addWorkout , addExercice, deleteExercice,addTransformation, getTransformations, deleteTransformation, deleteWorkout, modifierworkout, modifierBio, getBio, modifierExercice , getExercices , getWorkouts , getClients, deleteClient, modifierPrice, getClientsNumber, getPlansStatus, modifierworkoutplan ,workoutplanStatus, addMeal, addFood, deleteFood, deleteMeal, modifierMeal, modifierFood, modifierdietplan, dietplanStatus, getFoods, getMeals, getPrice, calculeMacros} = require('../controllers/coachController');
const router = express.Router();
const { parser } = require('../utils/cloudinary');

/////////////////////////////////// WORKOUT PLAN //////////////////////////////////////

router.post('/addworkout/:clientid', addWorkout) ;
router.post('/addexercice/:workoutid', parser.fields([{ name: "cdcFile", maxCount: 1, optional: true }]) , addExercice) ;
router.delete('/deleteexercice/exercice/:exerciceid/workout/:workoutid' , deleteExercice ) ;
router.delete('/deleteworkout/workout/:workoutid/workoutplan/:workoutplanid' , deleteWorkout ) ;
router.patch('/updateworkout/:workoutid' , modifierworkout ) ;
router.patch('/updateexercice/:exerciceid' , parser.fields([{ name: "cdcFile", maxCount: 1, optional: true }]), modifierExercice ) ;
router.patch('/setplandone/:workoutplanid' , modifierworkoutplan ) ;
router.get('/getplandone/:workoutplanid' , workoutplanStatus ) ;
router.get('/getexercices/:workoutid' , getExercices ) ;
router.get('/getworkouts/:workoutplanid' , getWorkouts ) ;
router.get('/getclients' ,protect , getClients ) ;
router.patch('/deleteclient/:clientid' ,protect , deleteClient ) ;
router.patch('/deletetransformation/:image' ,protect , deleteTransformation ) ;
router.get('/getprice' ,protect , getPrice) ;
router.get('/getclientsnumber' ,protect , getClientsNumber) ;
router.get('/getplansstatus' ,protect , getPlansStatus) ;
router.patch('/updateprice' ,protect, modifierPrice ) ;
router.patch('/updatebio' ,protect, modifierBio ) ;
router.get('/getbio' ,protect , getBio) ;
router.get('/gettransfomrations' ,protect , getTransformations ) ;
router.post('/addtransformation', protect , parser.fields([{ name: "cdcFile", maxCount: 1, optional: true }]) , addTransformation) ;




router.get('/calculemacros' , calculeMacros ) ;

/////////////////////////////////// DIET PLAN //////////////////////////////////////

router.post('/addmeal/:clientid', addMeal) ;
router.post('/addfood/:mealid',parser.fields([{ name: "cdcFile", maxCount: 1, optional: true }]), addFood) ;
router.delete('/deletefood/food/:foodid/meal/:mealid' , deleteFood ) ;
router.delete('/deletemeal/meal/:mealid/dietplan/:dietplanid' , deleteMeal ) ;
router.patch('/updatemeal/:mealid' , modifierMeal ) ;
router.patch('/updatefood/:foodid', parser.fields([{ name: "cdcFile", maxCount: 1, optional: true }]) , modifierFood ) ;
router.patch('/setdplandone/:dietplanid' , modifierdietplan ) ;
router.get('/getdplandone/:dietplanid' , dietplanStatus ) ;
router.get('/getfoods/:mealid' , getFoods ) ;
router.get('/getmeals/:dietplanid' , getMeals ) ;



module.exports = router ;