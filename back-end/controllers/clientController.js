const asyncHandler = require('express-async-handler') ; 
const { Client , Coach , User , WorkoutPlan, DietPlan } = require('../models/clientModel') ;
const jwt = require('jsonwebtoken') ; 
const bcrypt = require('bcryptjs') ; 
const Token = require('../models/tokenModel');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const { cloudinary } = require('../utils/cloudinary');
const { generateEmailTemplate } = require('../utils/EmailTemplateResetPass');

const generateToken = (id , role) => {
     return jwt.sign({id , role}, process.env.JWT_SECRET , {expiresIn: "1d"}) ;

}; 


/////////////////////// REGITER CLIENT ///////////////////////

const registerUser = asyncHandler( async (req , res) => { 

    const {firstName , lastName , email , password , gender , age , role } = req.body  ;

    // if (role = "client") {
    
    //     const workoutPlan = await WorkoutPlan.create({
    //         name : "workout plan" , 
    //         description : "workout plan",     
    //     }) ; 
    
    //     const dietPlan = await DietPlan.create({
    //         name : "diet plan" , 
    //         description : "diet plan",     
    //     }) ;   
        
    // }
    // const workoutPlan = await WorkoutPlan.create({
    //     name : "workout plan" , 
    //     description : "workout plan",     
    // }) ; 

    // const dietPlan = await DietPlan.create({
    //     name : "diet plan" , 
    //     description : "diet plan",     
    // }) ; 

    // Validation 
    if (!firstName || !lastName || !email || !password || !gender || !age  || !role) { 
        res.status(400) ; 
        throw new Error("please fill in all required fields") ;
    }
    if (password.length < 6 ) { 
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
        firstName , 
        lastName , 
        email , 
        password , 
        gender , 
        age ,
        role
    })

    // Create equivalent model 

    if (role === 'client') {

        const workoutPlan = await WorkoutPlan.create({
            name : "workout plan" , 
            description : "workout plan",     
        }) ; 
    
        const dietPlan = await DietPlan.create({
            name : "diet plan" , 
            description : "diet plan",     
        }) ;  

        const client = await Client.create({
            user : user._id , 
            workoutPlan : workoutPlan._id ,
            dietPlan : dietPlan._id
        });
        user.client = client._id ;
        await user.save();
    }

    if (role === 'coach') {
    console.log("_______________________________________________")
    console.log("hahahahahaha") ; 
        //console.log(user._id);
        const coach = await Coach.create({
            user : user._id ,
        });
        console.log(coach);
        user.coach = coach._id ;
        await user.save();
    }

    // Genrate Token
    const token  = generateToken(user._id , user.role ) ; 

    // Send HTTP-only cookie 
    res.cookie("token" , token , {
        // path :  "/" , 
        httpOnly : true , 
        expires : new Date(Date.now() + 1000 * 86400) // 1 Day 
    }); 

    if(user){
        const {_id, firstName, lastName, email, password, gender, age, photo, role } = user ;
        res.status(201).json({
            _id ,
            firstName, 
            lastName, 
            email, 
            password, 
            gender, 
            age, 
            photo, 
            role,
            token           
        }) ;
    }else {
        res.status(400) ; 
        throw new Error("Invalid Client Data") ;
    }

}); 


/////////////////////// LOGIN CLIENT ///////////////////////


const loginUser = asyncHandler(async (req , res) => {
    const { email , password } = req.body ; 
    
    // Validation of Request
    if (!email || !password) {
        res.status(400) ; 
        throw new Error("Please add email and password") ; 
    }
    // Check if User exists 
    const user = await User.findOne({email}) ;
    if(!user) {
        res.status(400) ; 
        throw new Error("User not found, please sign up") ; 
    }

    // Client exists , check if password is correct 
    const passwordIsCorrect = await bcrypt.compare(password, user.password) ;
    
    // Genrate Token
    const token  = generateToken(user._id , user.role) ; 

    // Send HTTP-only cookie 
    res.cookie('token' , token, {
        // path :  "/" , 
        httpOnly : true , 
        expires : new Date(Date.now() + 1000 * 86400) // 1 Day 
    }); 

    if (user && passwordIsCorrect) {
        const {_id, firstName, lastName, email, password, gender, age, photo, role } = user ;
        res.status(200).json({
            _id ,
            firstName, 
            lastName, 
            email, 
            password, 
            gender, 
            age, 
            photo, 
            role,  
            token
        });
    } else {
        res.status(400) ; 
        throw new Error("Invalid email or password") ; 
    }


});

/////////////////////// LOGOUT CLIENT ///////////////////////

const logoutUser = asyncHandler(async(req , res) => {
    
    res.cookie("token" , "", {
        path :  "/" , 
        httpOnly : true , 
        expires : new Date(0)
    }); 

    return res.status(200).json({ message: "Succesfuly Logged Out" }) ;

});


/////////////////////// GET CLIENT DATA ///////////////////////

const getClient = asyncHandler(async(req , res) => {

    const client = await Client.findById(req.user.client) ; 

    if(client){
        const { _id, height, weight, goal, other, dietPlan, workoutPlan } = client ;

        res.status(200).json({
            _id ,
            height, 
            weight, 
            goal, 
            other, 
            dietPlan, 
            workoutPlan          
        });
    }else {
        res.status(400) ; 
        throw new Error("Client Not Found") ;
    }
}) ;


/////////////////////// LOGIN STATUS ///////////////////////
const loginStatus = asyncHandler(async(req , res) => {
    const token = req.cookies.token  ;
    if (!token) {
        return res.json(false) ;
    }
    // Verify Token 
    const verified = jwt.verify(token, process.env.JWT_SECRET) ;
    if (verified) {
        res.json(true) ; 
    }
    return res.json(false) ; 
}); 


/////////////////////// UPDATE CLIENT ///////////////////////

const updateUser = asyncHandler(async (req , res) => {
    
    const user = await User.findById(req.user._id) ;
    
    const cdcFile = req.files && req.files.cdcFile ? req.files.cdcFile[0] : "";


    if (user) {

        const {_id, firstName, lastName, email, password, gender, age, photo, role, height, weight, goal, other, dietPlan, workoutPlan } = user ;

        const cdc = cdcFile ? await cloudinary.uploader.upload(cdcFile.path) : photo ;
        const cdcfile = cdc && cdc.secure_url ? cdc.secure_url : "";
        console.log(cdcfile) ; 
        console.log(req.body)   ; 
  
        user.email = email ; 
        user.lastName = req.body.lastName || lastName ;
        user.firstName = req.body.firstName || firstName ;
        user.age = req.body.age || age ;
        user.gender = req.body.gender || gender ;
        user.photo = cdcfile || photo ;

        const updatedUser = await user.save() ; 
        res.status(200).json({
            _id : updatedUser._id ,
            firstName : updatedUser.firstName , 
            lastName: updatedUser.lastName , 
            email: updatedUser.email , 
            gender: updatedUser.gender , 
            age: updatedUser.age  , 
            photo: updatedUser.photo , 
            role : user.role,
        })


    }else {
        res.status(404) ; 
        throw new Error("Client Not Found") ;  
    }
    

});

/////////////////////// CHANGE PASSWORD ///////////////////////

const changePassword = asyncHandler( async (req , res) => {
    const user = await User.findById(req.user._id) ; 
    const { oldPassword, password } = req.body ; 
    if (!user) {
        res.status(400) ; 
        throw new Error("User not found");    
    }
    // Validation 
    if (!oldPassword || !password) {
        res.status(400) ; 
        throw new Error("Please add old and new password");  
    }

    //check if old password is correct 
    const passwordIsCorrect = await bcrypt.compare(oldPassword , user.password) ;

    //save the new password 
    if (user && passwordIsCorrect) {
        user.password = password ; 
        await user.save() ; 
        res.status(200).send("password changed successful") ; 
    }else{ 
        res.status(400) ; 
        throw new Error("Old Password is incorrect");  
    }



});

/////////////////////// FORGOT PASSWORD ///////////////////////

const forgotPassword =asyncHandler( async (req , res) => {
    const {email} = req.body 
    const user = await User.findOne({email}) ; 

    if (!user) {
        res.status(404) ;
        throw new Error('User dont exist');
    }
    
    // Delete token if it exist 
    let token = await Token.findOne({userId : user._id}) ;
    if (token) {
        await token.deleteOne() ; 
    }

    // Create reset token 
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id ;
    console.log(resetToken) ;
    
    // Hash token before saving to DB 
    const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex") ;

    // Save Token to DB
    await new Token({
        userId : user._id , 
        token : hashedToken , 
        createdAt : Date.now() ,
        expiresAt : Date.now() + 40 * (60 * 1000) // 30 min  
    }).save() 

    // Construct Reset URL 
    const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`
    
    // Reset Email 

    const message = generateEmailTemplate(user.firstName , resetUrl );

    // const message = `
    // <h2> HELLO , ${user.firstName}</h2>
    // <p> Please use the url below to reset your password </p>
    // <p>This link is valid for only 30 minutes</p>
    // <a href=${resetUrl} clicktracking=off > ${resetUrl} </a>

    // <p>Regards...</p>
    // <p>FitNation Team</p>
    // ` ;

    const subject = "password Reset Request" ;
    const send_to = user.email ;
    const sent_from = process.env.EMAIL_USER ;

    try {
        await sendEmail(subject, message, send_to, sent_from) ;
        res.status(200).json({success: true , message: "Reset Email Sent"})
    } catch (error) {
        res.status(500) ;
        throw new Error("Email not sent , please try again") ;
    }
});

/////////////////////// RESET PASSWORD ///////////////////////
const resetPassword = asyncHandler(async(req , res) => {
    const {password} = req.body; 
    const {resetToken} = req.params ; 

    // Hash token , Compare to Token in DB 
    const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex") ;

    // Find Token in DB 
    const userToken = await Token.findOne({
        token: hashedToken,
        expiresAt: {$gt : Date.now()}
    })

    if (!userToken) {
        res.status(404) ;
        throw new Error("Invalid Token !") ;
    }

    //Find User 
    const user = await User.findOne({ _id : userToken.userId }) ; 
    user.password = password ; 
    await user.save() ; 
    res.status(200).json({
        message : "password reset successful , Please Login "
    });

});





module.exports =  { 
    registerUser, 
    loginUser, 
    logoutUser,
    getClient,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword
}