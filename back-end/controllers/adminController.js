const asyncHandler = require('express-async-handler') ; 
const { Client , Coach , User , Workout , WorkoutPlan , Exercice, DietPlan, Meal, Food, Contact } = require('../models/clientModel') ;
const jwt = require('jsonwebtoken') ; 
const bcrypt = require('bcryptjs') ; 
const Token = require('../models/tokenModel');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const mongoose = require('mongoose');
const cloudinary = require('../utils/cloudinary');
const axios = require("axios") ; 
const { adminEmail } = require('../utils/adminEmail');

const generateToken = (id , role) => {
     return jwt.sign({id , role}, process.env.JWT_SECRET , {expiresIn: "1d"}) ;

}; 

/////////////////////// GET COACHS //////////////////////////////
const getCoaches = asyncHandler(async (req , res) => {

    // var coachesless = []; 
    // var coaches = []; 
    var coaches = []; 
  
    //coachesless = await Coach.find() ; 
    coaches = await User.find({role:'coach'}) ;
    console.log(coaches) ;
  
    if (coaches) {
      res.status(200).json(coaches);
      console.log(coaches) ;
    }else {
      res.status(400) ; 
      throw new Error("Coaches not found") ;
    }
   
  });

  /////////////////////// GET CLIENT //////////////////////////////
const getClients = asyncHandler(async (req , res) => {

    // var coachesless = []; 
    // var coaches = []; 
    var clients = []; 
  
    //coachesless = await Coach.find() ; 
    clients = await User.find({role:'client'}) ;
    //console.log(clients) ;
  
    if (clients) {
      res.status(200).json(clients);
      //console.log(clients) ;
    }else {
      res.status(400) ; 
      throw new Error("Clients not found") ;
    }
      
  });


  /////////////////////// ADD ADMIN //////////////////////////////
  const addAdmin = asyncHandler( async (req , res) => { 

    const {firstName , lastName , email , password1 , gender , age } = req.body  ;
    const role = "admin" ; 



    // Validation 
    if (!firstName || !lastName || !email || !password1 || !gender || !age  || !role) { 
        res.status(400) ; 
        throw new Error("please fill in all required fields") ;
    }
    if (password1.length < 6 ) { 
        res.status(400) ; 
        throw new Error("password must be up to 6 characters") ;
    }

    // Check if client email already exists 
    const userExists = await User.findOne({email}) ;
    if(userExists) {
        res.status(400) ; 
        throw new Error("Client has already been registred") ;
    }

    // Create new User 
    const user = await User.create({
        firstName: firstName , 
        lastName : lastName , 
        email : email , 
        password : password1 , 
        gender: gender , 
        age : age ,
        role : role
    })


    await user.save();


    // Genrate Token
    const token  = generateToken(user._id , user.role ) ; 

    // Send HTTP-only cookie 
    res.cookie("token" , token , {
        // path :  "/" , 
        httpOnly : true , 
        expires : new Date(Date.now() + 1000 * 86400) // 1 Day 
    }); 

    if(user){
        // const {_id, firstName, lastName, email, password, gender, age, photo, role } = user ;
        // res.status(201).json({
        //     _id ,
        //     firstName, 
        //     lastName, 
        //     email, 
        //     password, 
        //     gender, 
        //     age, 
        //     photo, 
        //     role,
        //     token           
        // }) ;

           // Password Email 
const message = adminEmail(user.firstName , password1);

    // const message = `
    // <h2> HELLO , ${user.firstName}</h2>
    // <h2> An Admin from our administrative team adds you to the team </h2>
    // <h2>Here you find your password : </h2>
    // <h1> ${password1} </h1>

    // <p>Regards...</p>
    // <p>FitNation Team</p>
    // ` ;

    const subject = "YOU ARE KNOW ONE OF THE FITNATION'S TEAM" ;
    const send_to = user.email ;
    const sent_from = process.env.EMAIL_USER ;

    try {
        await sendEmail(subject, message, send_to, sent_from) ;
        res.status(200).json({success: true , message: "Password sent successfuly!"})
    } catch (error) {
        res.status(500) ;
        throw new Error("Email not sent , please try again") ;
    }
    
    
    }else {
        res.status(400) ; 
        throw new Error("Invalid Admin Data") ;
    }

}); 


  /////////////////////// ADD CONTACT //////////////////////////////
  const addContact = asyncHandler(async (req , res) => {

    const {name , email , text} = req.body ; 
        // Validation 
        if (!name || !email || !text ) { 
            res.status(400) ; 
            throw new Error("please fill in all required fields") ;
        }

            // Create new Contact 
    const contact = await Contact.create({
        name: name , 
        email : email , 
        text : text
    })


    await contact.save();

    if(contact){
        const {_id , name, email , text } = contact ;
        res.status(201).json({
            _id ,
            name,  
            email, 
            text   
        }) ; } else {
            res.status(400) ; 
            throw new Error("Invalid Contact Data") ;
        }


  });

/////////////////////// GET CONTACTS //////////////////////////////
const getContact = asyncHandler(async (req , res) => {

    // var coachesless = []; 
    // var coaches = []; 
    var contacts = []; 
  
    //coachesless = await Coach.find() ; 
    contacts = await Contact.find() ;
    console.log(contacts) ;
  
    if (contacts) {
      res.status(200).json(contacts);
      console.log(contacts) ;
    }else {
      res.status(400) ; 
      throw new Error(" No Message Found") ;
    }
   
  });

/////////////////////// DELETE CLIENT///////////////////////
const deleteClient = asyncHandler(async (req , res) => {

    const clientId = req.params.clientid;
    //console.log(clientId) ;


    const user = await User.findById(clientId) ; 
    //console.log('hahahahahaah') ;
    //console.log(user.client);
    const idclient = user.client ; 
    const client = await Client.findById(idclient) ; 
  
    //console.log(client) ; 
  
      if (!client) {
        return res.status(404).json({ message: 'client non trouvé.' });
      }
      if (client) {

        if (client.coach) {
            const coach = await Coach.findById(client.coach);
            console.log(clientId) ;
            const update = await Coach.findByIdAndUpdate(
                coach._id,
                { $pull: { clients: client._id } },
                { new: true }
            ) ;  

            if (update) {
              console.log("______________________________________________") ;
              console.log("all is good") ;
              console.log(coach) ;
              
            }
        }  

      await Client.findByIdAndDelete(client._id) ;
      await User.findByIdAndDelete(clientId) ;
      res.status(200).json({ message: 'client supprimé avec succès.' });
      }else {
        res.status(400) ; 
        throw new Error("client Not Found") ;
      }


  });

/////////////////////// DELETE COACH ///////////////////////
const deleteCoach = asyncHandler(async (req , res) => {

    const coachId = req.params.coachid;
    console.log(coachId) ;
    
    const user = await User.findById(coachId) ; 
    const coach = await Coach.findById(user.coach);
    // const client = await Client.findById(clientId) ; 
    // console.log(client) ;
  
      if (!coach) {
        return res.status(404).json({ message: 'coach non trouvé.' });
      }
      if (coach) {

        for (let i = 0; i < coach.clients.length; i++) {
            await Client.findByIdAndUpdate(
                coach.clients[i],
                { $unset: { coach: 1 } },
                { new: true }
              ) ;
        }
  
        await Coach.findByIdAndDelete( coach._id ) ;    
        await User.findByIdAndDelete( user._id ) ;    
  

      res.status(200).json({ message: 'coach supprimé avec succès.' });
      }else {
        res.status(400) ; 
        throw new Error("coach Not Found") ;
      }
  });



/////////////////////// DELETE COACH ///////////////////////
const deleteContact = asyncHandler(async (req , res) => {

  const contactId = req.params.contactid;
  
  const contact = await Contact.findById(contactId) ; 

    if (!contact) {
      return res.status(404).json({ message: 'Message not found.' });
    }
    if (contact) {

      await Contact.findByIdAndDelete( contact._id ) ;    
      res.status(200).json({ message: 'Message deleted successfuly.' });
    }else {
      res.status(400) ; 
      throw new Error("Message Not Found") ;
    }
});


// }); 

module.exports =  {
    getCoaches,
    getClients,
    addAdmin,
    addContact,
    getContact,
    deleteClient,
    deleteContact,
    deleteCoach
}