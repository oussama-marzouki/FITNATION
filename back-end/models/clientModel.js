const mongoose = require('mongoose');
const bcrypt = require('bcryptjs') ; 



////////////////////////     CONTACT     //////////////////////////////

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true , 
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , " Please enter a valid email" ]
  },
text: {
  type: String,
  required: true,
},

});



////////////////////////     EXERCICE SCHEMA     //////////////////////////////

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: { 
    required: true,
    type:String,
    default: "https://www.datanaos.com/static/Datanaos/img/exercice-droit.png"
}, 
});

////////////////////////     WORKOUT SCHEMA     //////////////////////////////

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday' , 'Friday' , 'Saturday' , 'Sunday'],
  },
  exercises: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercice'
}],
});

////////////////////////     WORKOUTPLAN SCHEMA     //////////////////////////////

const workoutPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  workouts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
}],
completed: {
  type: Boolean,
  required: true,
  default: false,

},

  // workouts: [workoutSchema],
});


////////////////////////     FOOD SCHEMA     //////////////////////////////

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantite: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    //required: true,
  },
  photo: { 
    required: true,
    type:String,
    default: "https://www.datanaos.com/static/Datanaos/img/exercice-droit.png"
}, 
});


////////////////////////     MEAL SCHEMA     //////////////////////////////

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  foods: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food'
}],
});


////////////////////////     DIETPLAN SCHEMA     //////////////////////////////

const dietPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  meals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meal'
}],
completed: {
  type: Boolean,
  required: true,
  default: false,

},

});

////////////////////////     USER SHEMA        /////////////////////////////

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true , "add your first name"],
  },
  lastName: {
    type: String,
    required: [true , "add your last name"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true , 
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , " Please enter a valid email" ]
  },
  password: {
    type: String,
    required: true,
    minLength: [6 , " password must be up to 6 characters"] ,
  },
  photo: { 
      required: true,
      type:String,
      default: "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=170667a&w=0&k=20&c=m-F9Doa2ecNYEEjeplkFCmZBlc5tm1pl1F7cBCh9ZzM="
  }, 
  age: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  role: {
    type: String,
    enum: ['coach', 'client' , 'admin'],
    required: true ,
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coach',
    default: null
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    default: null
  },

});

////////////////////////     CLIENT SCHEMA     //////////////////////////////

const clientSchema = new mongoose.Schema({
  height: {
    type: Number,
    required: true,
    default: 0 ,
  },
  weight: {
    type: Number,
    required: true,
    default: 0 ,
  },
  goal: {
    type: String,
    enum: ['lean muscle gain', 'weight loss','maintain weight' , 'bulking' , 'get shredded' ],
  },
  other: { 
    type: String,
    maxLength: 250 ,
    default: "i have nothing to say",
  },
  dietPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DietPlan',
  },
  workoutPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WorkoutPlan',
  },
  // workoutPlan: workoutPlanSchema,
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coach',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  
});

////////////////////////     COACH SCHEMA     //////////////////////////////

const coachSchema = new mongoose.Schema({

  bio: { 
    type: String,
    maxLength: 250 ,
    default: "i am a coach at FitNation",
  },        
  transformations: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Transformation'
  }],
  clients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
      unique: true
  }],

  ////////  waiiiiiiiiiiiiiiiiiiiiiiiiiiiiiit /////////////////
  
  transformations: [{   
    type:String,
}],
  price: {
    type: Number,
    //required: true,
    default: 100
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  ratings:[
    {
        star : { type : Number , max : 5 } , 
        postedby: { type: mongoose.Schema.Types.ObjectId , ref: 'Client'},       
    },
  ],

  totalrating: {
    type : Number , 
    default : 0 , 
    max : 5 ,
  }

});

/// Encrypte Password before saving to DB :
userSchema.pre("save", async function(next){

if(!this.isModified("password")){
  return next() ; 
}

// Hash password 
const salt = await bcrypt.genSalt(10) ;
const hashedPassword = await bcrypt.hash(this.password, salt) ;
this.password = hashedPassword ; 
next();
})


const Client = mongoose.model('Client', clientSchema);
const Coach = mongoose.model('Coach', coachSchema);
const User = mongoose.model('User', userSchema);
const Exercice = mongoose.model('Exercice', exerciseSchema);
const Workout  = mongoose.model('Workout', workoutSchema);
const WorkoutPlan  = mongoose.model('WorkoutPlan', workoutPlanSchema);
const DietPlan = mongoose.model('DietPlan', dietPlanSchema);
const Meal = mongoose.model('Meal', mealSchema);
const Food = mongoose.model('Food', foodSchema);
const Contact = mongoose.model('Contact', contactSchema);



module.exports = { Client, Coach, User, Exercice , Workout, WorkoutPlan, DietPlan, Meal , Food , Contact };

