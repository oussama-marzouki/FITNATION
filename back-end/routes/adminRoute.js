const express = require('express');
const protect = require('../middleWare/authMiddleware');
const { getCoaches, addAdmin , getClients , deleteContact, addContact, getContact ,deleteClient , deleteCoach } = require('../controllers/adminController');
const router = express.Router();

/////////////////////////////////// WORKOUT PLAN //////////////////////////////////////

router.get('/getCoaches' , getCoaches ) ;
router.get('/getclients' , getClients ) ;

router.delete('/deleteclient/:clientid' , deleteClient ) ;
router.delete('/deletecoach/:coachid' , deleteCoach ) ;
router.delete('/deletecontact/:contactid' , deleteContact ) ;


router.get('/getcontacts' , getContact ) ;
router.post('/addadmin' , addAdmin ) ;
router.post('/addcontact' , addContact ) ;




/////////////////////////////////// DIET PLAN //////////////////////////////////////





module.exports = router ;