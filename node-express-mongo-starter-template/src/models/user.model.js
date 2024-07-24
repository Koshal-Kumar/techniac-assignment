const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Firstname : {
        type : String,
        required : true
    },
    Lastname : {
        type :String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    profilePicture : {
        type: String, 
        required: false
    },
    BirthDate : {
        type : Date,
        required : true
    },
    Mobile : {
        type : Number,
        required : true
    },
    Password : {
        type : String,
        required : true
    }

})

const User = mongoose.model('users' , userSchema);
module.exports = User;