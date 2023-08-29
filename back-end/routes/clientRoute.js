const express = require('express');
const { registerUser , loginUser, logoutUser, getClient, loginStatus, updateUser, changePassword, forgotPassword, resetPassword } = require('../controllers/clientController');
const protect = require('../middleWare/authMiddleware');
const { parser } = require('../utils/cloudinary');
const router = express.Router();

router.post('/register', registerUser) ;
router.post('/login', loginUser) ;
router.get('/logout', logoutUser) ;
router.get('/getclient', protect , getClient ) ;

router.get('/loggedin', loginStatus) ; 
router.patch('/updateclient', protect, parser.fields([{ name: "cdcFile", maxCount: 1, optional: true }]) , updateUser) ;
router.patch('/changepassword', protect, changePassword) ;
router.post('/forgotpassword', forgotPassword) ;
router.put('/resetpassword/:resetToken', resetPassword) ;


module.exports = router ;