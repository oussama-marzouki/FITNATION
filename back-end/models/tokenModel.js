const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({

userId: {
    type: mongoose.Schema.Types.ObjectId,
    required:true , 
    ref: "client" 
},
token: {
    type: String ,
    required: true, 
},
createdAt: {
    type: String ,
    required: true, 
}, 
expiresAt: {
    type: String ,
    required: true, 
}


});

const token = mongoose.model("token" , tokenSchema) ;
module.exports = token ;