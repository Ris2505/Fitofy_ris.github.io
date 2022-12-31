const mongoose= require('mongoose');

const users= new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    mail:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    calories:{
        type:Number,
        required:true,
    },

})

const Register =new mongoose.model("Registration",users);
module.exports=Register;
