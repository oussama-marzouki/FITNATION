const express = require('express');
// const { registerUser , loginUser, logoutUser, getClient, loginStatus, updateUser, changePassword, forgotPassword, resetPassword } = require('../controllers/clientController');
const protect = require('../middleWare/authMiddleware');
const { getWorkouts, getCoach, getCoaches, getMeals ,getRate, setRate ,getCoachexist, getCoachTransformations, inscription , Add, Verifier } = require('../controllers/athleteController');
const router = express.Router();

/////////////////////////////////// WORKOUT PLAN //////////////////////////////////////

router.get('/getworkouts' , protect , getWorkouts ) ;
router.get('/getmeals' , protect , getMeals ) ;
router.get('/getcoach' , protect , getCoach ) ;
router.get('/getcoaches' , protect , getCoaches ) ;
router.get('/getcoachexist' , protect , getCoachexist ) ;
router.patch('/inscription/:coachid' , protect , inscription ) ;
router.post('/payement' , Add );
router.post('/payement/:id' , Verifier );
router.post('/setrate/:coachid', protect , setRate );
router.get('/getrate/:coachid', protect , getRate );
router.get('/gettransformation/:coachid' , getCoachTransformations ) ;


/////////////////////////////////// DIET PLAN //////////////////////////////////////





module.exports = router ;