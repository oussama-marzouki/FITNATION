const asyncHandler = require('express-async-handler') ; 
const { User } = require('../models/clientModel') ;
const jwt = require('jsonwebtoken') ; 

const protect = asyncHandler(async (req, res, next) => {
     try {
       const token = req.cookies.token ;
       if (!token) {
        res.status(401) ;
        throw new Error("Not authorized , Please Login !") ;
       }
       // Verify Token 
       const verified = jwt.verify(token, process.env.JWT_SECRET) ;
       // Get Client Id From Token
       const user = await User.findById(verified.id).select("-password") ;



       if (!user) {
        res.status(401) ; 
        throw new Error("Client Not Found") ;
       }
       req.user = user ; 
       next(); 

     } catch (error) {
        res.status(401) ;
        throw new Error("Not authorized , Please Login !") ;
     }
  });


module.exports = protect ; 