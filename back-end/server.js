const express = require('express') ;
const dotenv = require('dotenv').config() ;
const mongoose = require('mongoose') ;
const bodyParser = require('body-parser') ; 
const cors = require('cors') ; 
const clientRoute = require('./routes/clientRoute') ;
const coachRoute = require('./routes/coachRoute') ;
const athleteRoute = require('./routes/athleteRoutes') ;
const adminRoute = require('./routes/adminRoute') ;
const errorHandler = require('./middleWare/errorMiddleware') ;
const cookieParser = require('cookie-parser') ; 


const app = express() ; 

// Middlewares
app.use(express.json()) ;
app.use(cookieParser()) ;
app.use(express.urlencoded({extended : false})) ;
app.use(bodyParser.json()) ;
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
      })
      );

const PORT = process.env.PORT || 5000 ; 

//Route Middleware
app.use('/api', clientRoute);
app.use('/coaching', coachRoute);
app.use('/athlete', athleteRoute);
app.use('/admin', adminRoute);


// Routes

app.get('/' , (req ,res ) => {
    res.send("home page") ; 
}); 

// Error MiddleWare 
app.use(errorHandler) ;

// Connect to DB and start Server
mongoose.connect(process.env.MONGO_URI)
.then(() => { 
app.listen(PORT, () => {console.log(`Server Running on Port ${PORT}`)})
})
.catch((err) => {console.log(err)})